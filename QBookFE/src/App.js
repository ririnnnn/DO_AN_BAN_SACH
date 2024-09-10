import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment, useEffect, useState } from "react";
import { isJsonString } from "./utils/utils";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slides/userSlice";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storage);
    const res = await UserService.getUserDetail(id);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refresh_token: refresh_token,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { storageData, decoded };
  };

  // Add a request interceptor
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      const storage = localStorage.getItem("refresh_token");
      const refresh_token = JSON.parse(storage);
      if (refresh_token !== null) {
        const decodedRefreshToken = jwt_decode(refresh_token);
        if (decoded?.exp < currentTime.getTime() / 1000) {
          if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
            const data = await UserService.refreshToken(refresh_token);
            config.headers["token"] = `Bearer ${data?.access_token}`;
          } else {
            dispatch(resetUser());
          }
        }
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  const clientID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  return (
    <div>
      <GoogleOAuthProvider clientId="261928487436-bf2opv4npjjaddoj25upjq5oqhg7aipq.apps.googleusercontent.com">
        <LoadingComponent isLoading={isLoading}>
          <Router>
            <Routes>
              {routes.map((route, index) => {
                const Page = route.page;
                const isCheckAuth = !route.isPrivate || user?.isAdmin;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                return (
                  <Route
                    path={isCheckAuth ? route.path : null}
                    element={
                      <>
                        <DefaultComponent
                          isShowHeader={route.isShowHeader}
                          isShowFooter={route.isShowFooter}
                        >
                          <Page />
                        </DefaultComponent>
                      </>
                    }
                    key={index}
                  ></Route>
                );
              })}
            </Routes>
          </Router>
        </LoadingComponent>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;

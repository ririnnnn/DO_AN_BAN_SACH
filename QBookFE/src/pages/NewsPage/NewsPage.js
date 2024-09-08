import { CalendarOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as NewService from "../../services/NewService";
import { convertDate } from "../../utils/utils";

function NewsPage() {
  const [dataNew, setDataNew] = useState([]);
  const [pageValue, setPageValue] = useState(1);
  const [totalNew, setTotalNew] = useState(1);
  const [isLoadingNew, setIsLoadingNew] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataNew = async () => {
      setIsLoadingNew(true);
      const res = await NewService.getNew(pageValue, 5);
      setDataNew(res?.data);
      setTotalNew(res?.totalNew);
      setIsLoadingNew(false);
    };

    fetchDataNew();
  }, [pageValue]);

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <div className="w-full h-calc-100-minus-80">
      <div className="w-[1285px] h-[100%] mx-auto my-0">
        <div className="text-base py-4">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          <span> / Tin tức</span>
        </div>
        <LoadingComponent isLoading={isLoadingNew}>
          <div className="flex flex-col gap-5 w-[50%] pb-5">
            {dataNew.map((item, index) => (
              <div className="rounded-2xl p-6 border-2 border-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/blog_posts/9976/65fa652ce3a64.jpg"
                      alt=""
                      className="rounded-[50%] w-[30px] h-[30px] object-cover"
                    />
                    <span>Admin</span>
                  </div>
                  <div className="cursor-pointer">
                    <EllipsisOutlined className="text-[20px]" />
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mt-5 cursor-pointer"
                  onClick={() => navigate(`/new-detail/${item._id}`)}
                >
                  <div className="pr-3">
                    <h2 className="pb-2 font-semibold">{item.title}</h2>
                    <div className="text-base flex items-center gap-2">
                      <CalendarOutlined />
                      <span>{convertDate(item.createdAt)}</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={item.image}
                      alt=""
                      className="w-[200px] max-h-[120px] rounded-2xl block object-cover overflow-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </LoadingComponent>
        <div className="mb-5">
          <Pagination
            defaultCurrent={pageValue}
            total={totalNew}
            pageSize={5}
            onChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsPage;

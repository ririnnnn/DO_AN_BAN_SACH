import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = (props) => {
  const { children, isShowHeader, isShowFooter } = props;
  return (
    <>
      {isShowHeader ? <HeaderComponent /> : null}
      {children}
      {isShowFooter ? <FooterComponent /> : null}
    </>
  );
};

export default DefaultComponent;

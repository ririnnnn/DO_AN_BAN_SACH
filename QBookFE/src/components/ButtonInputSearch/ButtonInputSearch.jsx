import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    inputText,
    buttonText,
    backGroundInput = "#fff",
    backGroundButton = "#0d5bb5",
    ...rests
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        placeholder={inputText}
        size={size}
        style={{ backgroundColor: backGroundInput, borderRadius: "inherit" }}
        { ...rests }
      />
      <ButtonComponent
        icon={<SearchOutlined />}
        size={size}
        styleButton={{
          backgroundColor: backGroundButton,
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
        }}
        buttonText={buttonText}
      />
    </div>
  );
};

export default ButtonInputSearch;

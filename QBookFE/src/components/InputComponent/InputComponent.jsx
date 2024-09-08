import { Input } from "antd";

const InputComponent = ({ placeholder, type, size, style, ...rests }) => {
  return (
    <Input
      placeholder={placeholder}
      size={size}
      style={style}
      type={type}
      {...rests}
    />
  );
};

export default InputComponent;

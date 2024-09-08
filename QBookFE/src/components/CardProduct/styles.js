import { Card } from "antd";
import { styled } from "styled-components";

export const WrapperCardStyle = styled(Card)`
  width: 200px;

  & img {
    width: 200px;
    height: 200px;
    position: relative;
  }
  background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
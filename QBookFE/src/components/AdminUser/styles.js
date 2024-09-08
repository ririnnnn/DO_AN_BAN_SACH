import { Button, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  margin: 0;
  font-size: 18px;
`;

export const WrapperButton = styled(Button)`
  margin-top: 15px;
  width: 100px;
  height: 100px;
`;

export const WrapperUpload = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }

  & .btn-upload {
    position: relative;
    top: -38px;
  }
`;

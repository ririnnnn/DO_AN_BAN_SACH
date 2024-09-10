import Search from "antd/es/input/Search";
import { styled } from "styled-components";

export const WrapperContentPopover = styled.p`
  cursor: pointer;
  padding: 12px;
  margin: 0;
  &:hover {
    background-color: #189eff;
    color: #fff;
  }
`;

export const WrapperSearch = styled(Search)`
  & .ant-input-wrapper .ant-input-affix-wrapper {
    width: 300px;
  }
  & .ant-input-wrapper .ant-input-group-addon .ant-btn {
  }
`;

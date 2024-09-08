import styled from "styled-components";

export const WrapperContactNavigate = styled.div`
  font-size: 1.6rem;
  padding: 14px 0;
`;

export const WrapperContactNavigateHome = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

export const WrapperContactItemsTitle = styled.div`
  font-weight: bold;
`;

export const WrapperContactForm = styled.div`
  & form {
    .ant-form-item {
      .ant-row.ant-form-item-row {
        .ant-col.ant-form-item-label {
          width: 84px;
          text-align: left;
        }
      }
    }
  }
`;

import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`;

export const WrapperMyOrderPage = styled.div`
  width: 1285px;
  height: auto;
  margin: 0 auto;
`;

export const WrapperStyleTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
`;

export const WrapperListContact = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  gap: 20px;
`;

export const WrapperItemContact = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 12px 12px #ccc;
`;

export const WrapperStatus = styled.div`
  display: flex;
  align-item: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  flex-direction: column;
`;

export const WrapperStatusTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  padding: 5px 0;
`;

export const WrapperStatusContent = styled.div`
  font-size: 1.6rem;
  padding: 5px 0;

  span:last-child {
    color: rgb(255, 66, 78);
  }
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items: flex-end;
  padding-top: 10px;
`;

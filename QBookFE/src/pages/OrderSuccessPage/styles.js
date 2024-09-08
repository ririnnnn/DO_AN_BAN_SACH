import styled from "styled-components";

export const WrapperOrderPage = styled.div`
  width: 1285px;
  height: 1000px;
  margin: 0 auto;
`;

export const WrapperTitle = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: 640;
  padding: 10px 0;
`;

export const WrapperLeft = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  margin: 0 30px 0 0;
`;

export const WrapperLeftProduct = styled.div`
  width: 100%;
  padding: 10px 10px 20px;
  background-color: #fff;
  margin: 0 30px 0 0;
`;

export const WrapperRight = styled.div`
  width: 330px;
  padding: 10px;
  background-color: #fff;
`;

export const WrapperAllProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
  height: 100%;
  padding-top: 10px;
  margin: 30px 0;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: fit-content;
`;

export const WrapperProductName = styled.span`
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WrapperCaculator = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export const WrapperTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;

export const WrapperTotal = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #fe3834;
`;

export const WrapperProductLeftButton = styled.button`
  border: none;
  border-right: 1px solid #ccc;
  height: 34px;
  background-color: transparent;
  cursor: pointer;
`;

export const WrapperProductRightButton = styled.button`
  border: none;
  border-left: 1px solid #ccc;
  height: 34px;
  background-color: transparent;
  cursor: pointer;
`;

export const WrapperMethodDelivery = styled.div`
  width: fit-content;
  padding: 14px;
  margin-top: 10px;
  background-color: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  border-radius: 8px;
`;

export const WrapperRadioContent = styled.div`
  display: flex;
  height: 100%;
`;

export const WrapperRadioText = styled.span`
  color: rgb(234, 133, 0);
  font-weight: bold;
  padding-right: 8px;
`;

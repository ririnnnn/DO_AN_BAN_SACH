import styled from "styled-components";

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperOrderDetailPage = styled.div`
  width: 1285px;
  height: 100vh;
  margin: 0 auto;
`;

export const WrapperStyleTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
`;

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 1.5rem;
    padding: 0 0 5px;
    span:last-child {
      color: rgb(255, 66, 78);
    }
  }

  .order-inf {
    font-size: 1.5rem;
    padding: 5px 0;
    span:last-child {
      color: rgb(255, 66, 78);
    }
  }

  .address,
  .delivery-fee {
    font-size: 1.5rem;
    margin-top: 8px;
  }

  .name-delivery {
    color: rgb(234, 133, 0);
    font-weight: bold;
    text-transform: uppercase;
  }

  .status-payment {
    font-size: 1.5rem;
    margin-top: 8px;
    color: rgb(234, 133, 0);
  }
`;

export const WrapperLabel = styled.div`
  font-size: 1.5rem;
  color: rgb(36, 36, 36);
  text-transform: uppercase;
  margin-bottom: 15px;
`;
export const WrapperContentInfo = styled.div`
  width: 320px;
  height: 118px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`;

export const WrapperStyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const WrapperProduct = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  font-size: 1.5rem;
`;

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: flex-start;
  width: 670px;
`;

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  color: red;
`;
export const WrapperItemLabel = styled.div`
  width: 200px;
  // &:last-child {
  //   font-weight: bold;
  // }
`;

export const WrapperAllPrice = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const WrapperShippingPrice = styled.span`
  color: rgb(255, 66, 78);
  font-weight: 500;
`;

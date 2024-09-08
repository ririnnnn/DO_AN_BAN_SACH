import { styled } from "styled-components";

export const WrapperProductAuthor = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(239, 239, 239);
`;

export const WrapperNavigation = styled.div`
  font-size: 1.6rem;
  padding: 14px 0;
`;

export const WrapperNavigationHome = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

export const WrapperFilter = styled.div`
  display: flex;
  gap: 10px;
`;

export const WrapperItemFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  line-height: 32px;
  height: 32px;
  margin-bottom: 10px;
  background-color: rgb(240, 248, 255);
  padding: 0px 12px;
  border: 1px solid rgb(26, 148, 255);
  border-radius: 100px;
  color: rgb(11, 116, 229);
`;

export const WrapperNavbar = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-right: 10px;
`;

export const WrapperTitleText = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: #27272a;
  margin: 0;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
`;

export const WrapperItemCategory = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 14px;
  padding: 5px 0;
  color: #38383d;
`;

export const WrapperPriceText = styled.div`
  font-size: 1.4rem;
  border-radius: 10px;
  background-color: rgb(238, 238, 238);
  width: fit-content;
  padding: 6px;
`;

export const WrapperPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & ul {
    margin-top: 0 !important;
  }
`;

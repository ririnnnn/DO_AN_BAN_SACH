import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(204, 204, 204);
  height: 100vh;
`;

export const WrapperForm = styled.div`
  width: 800px;
  height: 442px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  border-radius: 6px;
  display: flex;
`;

export const WrapperContainerLeft = styled.div`
  padding: 40px;
  width: 500px;
`;

export const WrapperTextLight = styled.span`
  color: rgb(13, 92, 182);
  font-size: 1.5rem;
  cursor: pointer;
`;

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

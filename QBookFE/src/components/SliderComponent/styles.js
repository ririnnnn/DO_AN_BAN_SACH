import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSlider = styled(Slider)`
  & .slick-arrow.slick-prev {
    left: 12px;
    z-index: 10;
    &::before {
      font-size: 40px;
      color: #fff;
    }
  }
  & .slick-arrow.slick-next {
    right: 30px;
    z-index: 10;
    &::before {
      font-size: 40px;
      color: #fff;
    }
  }
  & .slick-dots {
    z-index: 10;
    bottom: 10px;
    li {
      button {
        &::before {
          font-size: 10px;
          color: rgb(255, 255, 0.5);
        }
      }
    }
  }
`;

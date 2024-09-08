import { WrapperSlider } from "./styles";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 8000,
    autoplay: true,
  };
  return (
    <WrapperSlider {...settings} className="hidden lg:block">
      {arrImages.map((image, index) => (
        <div key={index} className="h-[500px]">
          <img
            src={image}
            alt={`slider-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </WrapperSlider>
  );
};

export default SliderComponent;

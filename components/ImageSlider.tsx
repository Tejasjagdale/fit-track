import { border, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({slides}: any) => {
  return (
    <Carousel infiniteLoop>
      {slides.map((slide:string,index:number) => {
        return <Image key={index} alt="image" src={slide} />;
      })}
    </Carousel>
  );
};

export default ImageSlider;

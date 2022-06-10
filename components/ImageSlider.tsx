import { border, Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({hprop,slides}: any) => {
  return (
    <Carousel infiniteLoop showThumbs={false}>
      {slides.map((slide:string,index:number) => {
        return <Image key={index} alt="image" maxH={hprop} src={slide} />;
      })}
    </Carousel>
  );
};

export default ImageSlider;

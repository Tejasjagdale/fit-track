import { Image, Wrap } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({hprop,slides}: any) => {
  return (
    <Carousel infiniteLoop showThumbs={false}>
      {slides.length !== 0 ? slides.map((slide:string,index:number) => {
        return <Image key={index} alt="image" maxH={hprop} src={slide} />;
      }):<Image alt="image" maxH={hprop} src="https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg" /> }
    </Carousel>
  );
};

export default ImageSlider;

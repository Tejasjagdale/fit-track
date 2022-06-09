import React from "react";
import NavBar from "../components/NavBar";
import Questions from "../components/Slider";

const food = () => {
  return (
    <NavBar
      // eslint-disable-next-line react/no-children-prop
      children={
        <>
          <Questions />
        </>
      }
    />
  );
};

export default food;

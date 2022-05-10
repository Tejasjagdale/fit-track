import React from "react";
import Link from "next/link";

const index = () => {
  return (
    <>
      <Link href="/">
        <a>index</a>
      </Link>
      <Link href="/bmiGraph">
        <a>bmi</a>
      </Link>
      <div>home page</div>
    </>
  );
};

export default index;

import React from "react";
import Link from "next/link";

const errorpage = () => {
  return (
    <section className="page_404">
    <title>404 error</title>
      <link
        href="http://fonts.cdnfonts.com/css/signature-of-the-ancient"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">{"Look's like you're lost"}</h3>

                <p>the page you are looking for not avaible!</p>

                <Link href="/">
                  <a className="link_404">Go to Home</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default errorpage;

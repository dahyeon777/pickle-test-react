import React from "react";
import pic1 from "../../../img/test_ready_img/f_job.png";
import pic2 from "../../../img/test_ready_img/dessert.png";
import pic4 from "../../../img/test_ready_img/gemstone.png";
import pic5 from "../../../img/test_ready_img/pre_life.png";
import hero from "../../../img/hero_text_img.png";
import "./index.css";

function FirstPageMain() {
  return (
    <>
      <div className="image_center">
        <img src={hero} alt="히어로 이미지" />
      </div>
      <section className="section"></section>

      <main>
        <div className="grid-container">
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지1" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 2" />
          </div>
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지 3" />
          </div>
          <div className="grid-item">
            <img src={pic4} alt="테스트 이미지 4" />
          </div>
          <div className="grid-item">
            <img src={pic5} alt="테스트 이미지 5" />
          </div>
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지1" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 2" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 3" />
          </div>
          <div className="grid-item">
            <img src={pic4} alt="테스트 이미지 4" />
          </div>
          <div className="grid-item">
            <img src={pic5} alt="테스트 이미지 5" />
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstPageMain;

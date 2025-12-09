import React from "react";
import pic1 from "../../../img/test_img/test_img1.png";
import pic2 from "../../../img/test_img/test_img2.png";
import pic3 from "../../../img/test_img/test_img3.png";
import hero from "../../../img/test_img/hero_text_img.png";
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
            <img src={pic3} alt="테스트 이미지 3" />
          </div>
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지 4" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 5" />
          </div>
          <div className="grid-item">
            <img src={pic3} alt="테스트 이미지 6" />
          </div>
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지 4" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 5" />
          </div>
          <div className="grid-item">
            <img src={pic3} alt="테스트 이미지 6" />
          </div>
          <div className="grid-item">
            <img src={pic1} alt="테스트 이미지 4" />
          </div>
          <div className="grid-item">
            <img src={pic2} alt="테스트 이미지 5" />
          </div>
          <div className="grid-item">
            <img src={pic3} alt="테스트 이미지 6" />
          </div>
        </div>
      </main>
    </>
  );
}

export default FirstPageMain;

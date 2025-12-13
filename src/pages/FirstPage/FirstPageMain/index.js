import React from "react";
import pic1 from "../../../img/test_ready_img/f_job.png";
import pic2 from "../../../img/test_ready_img/dessert.png";
import pic4 from "../../../img/test_ready_img/gemstone.png";
import pic5 from "../../../img/test_ready_img/pre_life.png";
import hero from "../../../img/hero_text_img.png";
import "./index.css";
import { Link } from "react-router-dom";

const list = [pic1, pic2, pic4, pic5, pic1, pic2, pic4];

function FirstPageMain() {
  const imageList = list.map((imagePath, index) => (
    <div className="grid-item" key={index}>
      <Link to="/2">
        <img src={imagePath} alt="테스트이미지" />
      </Link>
    </div>
  ));

  return (
    <>
      <div className="image_center">
        <img src={hero} alt="히어로 이미지" />
      </div>
      <section className="section"></section>

      <main>
        <div className="grid-container">{imageList}</div>
      </main>
    </>
  );
}

export default FirstPageMain;

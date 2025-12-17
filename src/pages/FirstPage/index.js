import { testDataList } from "../../TestData";
import hero from "../../img/hero_text_img.png";
import "./index.css";
import { Link } from "react-router-dom";

//메인페이지
function FirstPage() {
  //테스트 이미지 목록 설정
  const imageList = testDataList.map(({ path, id }, index) => (
    <div className="grid-item" key={index}>
      <Link to={`/test_ready/${id}`}>
        <img src={path} alt="테스트이미지" />
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
      <section className="section"></section>
    </>
  );
}

export default FirstPage;

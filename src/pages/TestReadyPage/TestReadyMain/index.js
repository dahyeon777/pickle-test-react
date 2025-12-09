import testImg from "./test_img_test.png";
import "./index.css";

function TestReadyMain() {
  return (
    <div>
      <img id="img_test_main" src={testImg} alt="메인테스트이미지" />
    </div>
  );
}

export default TestReadyMain;

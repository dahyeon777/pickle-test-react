import "./index.css";
import { useParams } from "react-router-dom";
import { testDataList } from "../../../TestData";

function TestReadyMain() {
  //주소 뒷부분 id로 테스트 페이지 찾음

  // 꼬리표 (ID)를 읽어옴
  const { testId } = useParams(); // testId는 '1' 또는 '2' 등의 문자열
  const idToFind = Number(testId); // 숫자로 변환합니다.

  // 꼬리표 번호와 일치하는 주소록을 뒤져서 데이터를 찾음
  const selectedTestData = testDataList.find((item) => item.id === idToFind);

  // 찾은 데이터의 이미지 경로와 타이틀 화면에 표시함
  const { path: mainImagePath, title: testTitle } = selectedTestData;

  return (
    <div>
      <h1>{testTitle}</h1>
      <img id="img_test_main" src={mainImagePath} alt="선택된 테스트 이미지" />
    </div>
  );
}

export default TestReadyMain;

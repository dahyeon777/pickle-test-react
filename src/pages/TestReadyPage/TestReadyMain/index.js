import "./index.css";
import { useParams } from "react-router-dom";
import { testDataList } from "../../../TestData";

function TestReadyMain() {
  // 꼬리표 (ID)를 읽어옵니다.
  const { testId } = useParams(); // testId는 '1' 또는 '2' 등의 문자열이 됩니다.
  const idToFind = Number(testId); // 숫자로 변환합니다.

  // 꼬리표 번호와 일치하는 주소록을 뒤져서 데이터를 찾습니다.
  const selectedTestData = testDataList.find((item) => item.id === idToFind);

  // 찾은 데이터의 이미지 경로를 화면에 표시합니다.
  const mainImagePath = selectedTestData.path;

  return (
    <div>
      {/* 찾은 이미지를 여기에 넣습니다. */}
      <img id="img_test_main" src={mainImagePath} alt="선택된 테스트 이미지" />
      {/* ... 나머지 테스트 화면 */}
    </div>
  );
}

export default TestReadyMain;

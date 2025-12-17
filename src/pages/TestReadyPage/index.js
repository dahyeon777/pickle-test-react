import "./index.css";
import { Link, useParams } from "react-router-dom";
import { testDataList } from "../../TestData";
import LargeButton from "../../components/Button/LargeButton";

function TestReadyPage() {
  //주소 뒷부분 id로 테스트 페이지 찾음

  // 주소에서 id를 읽어옴
  const { testId } = useParams(); //문자열 반환
  const idToFind = Number(testId);

  // id로 테스트 찾음
  const selectedTestData = testDataList.find((item) => item.id === idToFind);

  // 메인이미지와 타이틀 표시
  const { path: mainImagePath, title: testTitle } = selectedTestData;

  return (
    <div>
      <h1>{testTitle}</h1>
      <img id="img_test_main" src={mainImagePath} alt="선택된 테스트 이미지" />
      <Link to={`/test_start/${idToFind}`}>
        <LargeButton></LargeButton>
      </Link>
    </div>
  );
}

export default TestReadyPage;

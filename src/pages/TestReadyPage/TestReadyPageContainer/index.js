import "./index.css";
import LargeButton from "../../../components/Button/LargeButton";
import TestReadyMain from "../TestReadyMain";
import { Link, useParams } from "react-router-dom";
import { testDataList } from "../../../TestData";

function TestReadyPageContainer() {
  const { testId } = useParams(); // testId는 '1' 또는 '2' 등의 문자열이 됩니다.

  const testStartId = Number(testId); // 숫자로 변환합니다.

  return (
    <div>
      <TestReadyMain></TestReadyMain>
      <Link to={`/test_start/${testStartId}`}>
        <LargeButton></LargeButton>
      </Link>
    </div>
  );
}

export default TestReadyPageContainer;

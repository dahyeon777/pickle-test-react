import { useParams } from "react-router-dom";

function TestStartAnswer() {
  const { testStartId } = useParams(); // testId는 '1' 또는 '2' 등의 문자열이 됩니다.

  const id = Number(testStartId); // 숫자로 변환합니다.
  return <div>{id}</div>;
}

export default TestStartAnswer;

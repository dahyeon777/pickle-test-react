import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

import { AllTestQuestionsData } from "../../../TestData";

function TestResultMain() {
  const location = useLocation();

  const { testStartId, finalResult: resultFromParams } = useParams();
  const testId = Number(testStartId);

  // 1. 이전 페이지에서 state로 전달받은 상세 점수 데이터 추출
  const { finalResult } = location.state || {};

  // URL 파라미터가 가장 확실하므로, URL의 Result 코드를 최종 사용 코드로 결정
  const userResult = resultFromParams || finalResult;

  // 2. 현재 진행한 테스트 데이터 전체를 AllTestQuestionsData에서 찾습니다.
  const currentTest = useMemo(() => {
    // 임포트한 AllTestQuestionsData 배열에서 현재 ID와 일치하는 테스트를 찾습니다.
    return AllTestQuestionsData.find((test) => test.id === testId);
  }, [testId]);

  // 3. 최종 결과 유형 데이터 매칭
  const resultData = useMemo(() => {
    // 현재 테스트가 존재하고, 결과 코드가 있으며, results 객체가 있는지 확인
    if (!currentTest || !userResult || !currentTest.results) return null;

    // 해당 테스트의 results 객체에서 Result 코드를 키로 사용하여 결과 정보를 찾습니다.
    return currentTest.results[userResult];
  }, [currentTest, userResult]); // currentTest 또는 userMbti가 변경될 때 재계산

  // 4. 데이터 로딩 실패 또는 접근 오류 처리
  if (!currentTest || !userResult || !resultData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>
          테스트 결과를 찾을 수 없습니다. (ID: {testId}, Result:{" "}
          {userResult || "N/A"}) 😭
        </h2>
        <p>테스트를 처음부터 다시 진행해 주세요.</p>
      </div>
    );
  }

  // 5. 화면에 결과 띄우기
  return (
    <div className="result_container">
      <h1>✨ {currentTest.title} 결과 ✨</h1>

      <div className="result_title_section">
        <h2>
          당신은 "<strong style={{ color: "#333" }}>{resultData.title}</strong>"
          입니다!
        </h2>
        {resultData.result && (
          <img
            id="result_image"
            src={resultData.result}
            alt={currentTest.title}
          />
        )}

        <p id="description">{resultData.description}</p>
      </div>
    </div>
  );
}

export default TestResultMain;

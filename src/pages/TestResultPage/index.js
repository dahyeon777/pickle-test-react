import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

import { AllTestQuestionsData } from "../../TestData";

function TestResultPage() {
  const location = useLocation();
  const { testStartId, finalResult: resultFromParams } = useParams();
  const testId = Number(testStartId);

  // state로 전달받은 결과 데이터
  const { finalResult } = location.state || {};

  // URL 파라미터 우선 사용
  const userResult = resultFromParams || finalResult;

  // 현재 테스트 데이터 찾음
  const currentTest = useMemo(() => {
    return AllTestQuestionsData.find((test) => test.id === testId);
  }, [testId]);

  // 최종 결과 유형 데이터 매칭
  const resultData = useMemo(() => {
    if (!currentTest || !userResult || !currentTest.results) return null;

    return currentTest.results[userResult];
  }, [currentTest, userResult]);

  // 데이터 없으면 에러 표시
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

  // 결과 화면 렌더링
  return (
    <div className="result_container">
      <h1>✨ {currentTest.title} 결과 ✨</h1>

      <div className="result_title_section">
        <h2 className="result_title">
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

export default TestResultPage;

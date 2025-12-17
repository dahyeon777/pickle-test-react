import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";

import { AllTestQuestionsData } from "../../TestData";

function TestResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { testStartId, finalResult: resultFromParams } = useParams();
  const testId = Number(testStartId);

  const handleShare = () => {
    // 현재 브라우저의 전체 주소를 가져옵니다.
    const currentUrl = window.location.href;

    // 클립보드에 복사
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("결과 링크가 복사되었습니다! 친구에게 공유해보세요. ✨");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };

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
      <div
        className="share_section"
        style={{ marginTop: "30px", textAlign: "center" }}
      >
        <button onClick={handleShare} style={shareButtonStyle}>
          🔗 결과 공유하기 (링크 복사)
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            ...shareButtonStyle,
            backgroundColor: "#666",
            marginTop: "10px",
          }}
        >
          🏠 다시 테스트하기
        </button>
      </div>
    </div>
  );
}

export default TestResultPage;

// 간단한 버튼 스타일
const shareButtonStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  maxWidth: "300px",
};

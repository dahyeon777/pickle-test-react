import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";

// 🚨 경로를 프로젝트 구조에 맞게 수정하세요.
// 모든 테스트 데이터가 모여있는 파일을 불러옵니다.
import { AllTestQuestionsData } from "../../../TestData"; // AllTestQuestionsData가 있는 파일 경로

function TestResultMain() {
  const location = useLocation();

  const { testStartId, finalMbti: mbtiFromParams } = useParams();
  const testId = Number(testStartId);

  // 1. 이전 페이지에서 state로 전달받은 상세 점수 데이터 추출
  const { finalMbti, scores } = location.state || {};

  // URL 파라미터가 가장 확실하므로, URL의 MBTI 코드를 최종 사용 코드로 결정
  const userMbti = mbtiFromParams || finalMbti;

  // 2. 현재 진행한 테스트 데이터 전체를 AllTestQuestionsData에서 찾습니다.
  const currentTest = useMemo(() => {
    // 임포트한 AllTestQuestionsData 배열에서 현재 ID와 일치하는 테스트를 찾습니다.
    return AllTestQuestionsData.find((test) => test.id === testId);
  }, [testId]);

  // 3. 최종 결과 유형 데이터 매칭
  const resultData = useMemo(() => {
    // 현재 테스트가 존재하고, 결과 코드가 있으며, results 객체가 있는지 확인
    if (!currentTest || !userMbti || !currentTest.results) return null;

    // 해당 테스트의 results 객체에서 MBTI 코드를 키로 사용하여 결과 정보를 찾습니다.
    return currentTest.results[userMbti];
  }, [currentTest, userMbti]); // currentTest 또는 userMbti가 변경될 때 재계산

  // 4. 데이터 로딩 실패 또는 접근 오류 처리
  if (!currentTest || !userMbti || !resultData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>
          테스트 결과를 찾을 수 없습니다. (ID: {testId}, MBTI:{" "}
          {userMbti || "N/A"}) 😭
        </h2>
        <p>테스트를 처음부터 다시 진행해 주세요.</p>
      </div>
    );
  }

  // 5. 화면에 결과 띄우기
  return (
    <div
      className="result_container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>✨ {currentTest.title} 결과 ✨</h1>

      {/* 최종 MBTI와 디저트 제목 */}
      <div
        className="result_title_section"
        style={{
          border: "2px solid #ffcc00",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          backgroundColor: "#fff7e6",
        }}
      >
        <h2>
          당신은 <strong style={{ color: "#333" }}>{resultData.title}</strong>
          입니다!
        </h2>

        {/* {currentTest.path && (
          <img
            src={currentTest.path}
            alt={currentTest.title}
            style={{ width: "150px", marginTop: "10px" }}
          />
        )} */}
      </div>

      {/* 디저트 설명 */}
      <div
        className="result_description"
        style={{ textAlign: "left", lineHeight: "1.6", marginBottom: "30px" }}
      >
        <p id="description">{resultData.description}</p>
      </div>

      {/* 점수 상세 정보 (Scores) */}
      <div
        className="score_details"
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
          textAlign: "left",
        }}
      >
        <h4>📊 MBTI 선호도 상세 점수</h4>
        {scores ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              **에너지 방향 (E vs I):** E ({scores.E_score}) vs I (
              {scores.I_score})
            </li>
            <li>
              **인식 방식 (S vs N):** S ({scores.S_score}) vs N (
              {scores.N_score})
            </li>
            <li>
              **판단 기준 (T vs F):** T ({scores.T_score}) vs F (
              {scores.F_score})
            </li>
            <li>
              **생활 양식 (J vs P):** J ({scores.J_score}) vs P (
              {scores.P_score})
            </li>
          </ul>
        ) : (
          <p>점수 데이터가 없습니다. (State로 전달받지 못함)</p>
        )}
      </div>
    </div>
  );
}

export default TestResultMain;

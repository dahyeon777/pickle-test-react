import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 useNavigate 추가
import RadioOption from "../../../components/RadioOption";
import { AllTestQuestionsData } from "../../../TestData";
import "./index.css";

// 모든 질문이 끝났을 때 최종 MBTI를 계산하는 함수 (이 함수는 컴포넌트 외부에 정의하는 것이 좋음)
function calculateMbti(scores) {
  // 1. 각 축의 승자 결정
  const E_I = scores.E_score >= scores.I_score ? "E" : "I";
  const S_N = scores.S_score >= scores.N_score ? "S" : "N";
  const T_F = scores.T_score >= scores.F_score ? "T" : "F";
  const J_P = scores.J_score >= scores.P_score ? "J" : "P";

  // 2. 최종 MBTI 문자열 조합
  return E_I + S_N + T_F + J_P;
}

function TestStartAnswer() {
  const navigate = useNavigate(); // 👈 useNavigate 초기화
  const { testStartId } = useParams();
  const link_id = Number(testStartId);

  const currentTest = AllTestQuestionsData.find((test) => test.id === link_id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // 👈 MBTI 점수 State 추가: 모든 스코어를 0으로 초기화
  const [mbtiScores, setMbtiScores] = useState({
    E_score: 0,
    I_score: 0,
    S_score: 0,
    N_score: 0,
    T_score: 0,
    F_score: 0,
    J_score: 0,
    P_score: 0,
  });

  const currentQuestion = currentTest
    ? currentTest.questions[currentQuestionIndex]
    : null;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // 👇 수정된 nextquestion 함수
  function nextquestion() {
    if (!selectedOption || !currentQuestion) {
      return;
    }

    // 1. 선택된 옵션의 점수를 찾기
    const selected = currentQuestion.options.find(
      (opt) => opt.optionId === selectedOption
    );

    if (!selected || !selected.score) {
      console.error("선택된 옵션에 점수 데이터가 없습니다.");
      return;
    }

    // 2. MBTI 점수 누적 로직
    setMbtiScores((prevScores) => {
      const newScores = { ...prevScores };

      // 선택된 옵션의 모든 점수(score 객체)를 순회하며 기존 점수에 더함
      for (const axis in selected.score) {
        newScores[axis] += selected.score[axis];
      }
      return newScores;
    });

    // 3. 다음 인덱스 계산
    const nextIndex = currentQuestionIndex + 1;

    if (currentTest && nextIndex < currentTest.questions.length) {
      // 4. 다음 질문으로 이동
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      // 5. 모든 질문이 끝났을 경우: 결과 계산 및 페이지 이동
      const finalMbti = calculateMbti(mbtiScores); // 현재까지 누적된 점수 + 마지막 질문의 점수 반영

      navigate(`/result/${link_id}/${finalMbti}`, {
        state: { finalMbti, scores: mbtiScores },
      });

      // 테스트 ID와 계산된 MBTI를 URL 파라미터로 넘기는 것이 일반적입니다.
    }
  }
  // 👆 수정된 nextquestion 함수 끝

  if (!currentTest) {
    return <div>테스트를 찾을 수 없습니다.</div>;
  }

  // 로딩 후 마지막 질문까지 완료되었을 때 currentQuestion이 null이 될 수 있음.
  // 이 경우, 이미 navigate 함수가 실행되었을 것이므로 여기서는 간단한 반환 처리
  if (!currentQuestion) {
    return <div>결과를 계산 중입니다...</div>;
  }

  // ... (이하 JSX 코드 동일)
  return (
    <div>
      <div className="radio_background">
        <h2>{currentTest.title}</h2>
        <h3>
          Q{currentQuestion.questionId}. {currentQuestion.text}
        </h3>

        <div className="answer_option">
          {currentQuestion.options.map((option) => (
            <RadioOption
              key={option.optionId}
              optionId={option.optionId}
              text={option.text}
              name={`question-${currentQuestion.questionId}`}
              onChange={handleOptionChange}
              checked={selectedOption === option.optionId}
            />
          ))}
        </div>
      </div>
      <div>
        <button disabled={!selectedOption} onClick={nextquestion}>
          {/* 마지막 질문일 경우 버튼 텍스트 변경 */}
          {currentQuestionIndex === currentTest.questions.length - 1
            ? "결과 확인하기"
            : "다음 질문"}
        </button>
      </div>
    </div>
  );
}

export default TestStartAnswer;

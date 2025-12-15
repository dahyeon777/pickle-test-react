import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RadioOption from "../../../components/RadioOption";
// 💡 ProgressBar 컴포넌트를 common 폴더에서 임포트합니다.
import ProgressBar from "../../../components/ProgressBar";
import { AllTestQuestionsData } from "../../../TestData";
import "./index.css";

// MBTI 최종 결과 계산
function calculateMbti(scores) {
  const E_I = scores.E_score >= scores.I_score ? "E" : "I";
  const S_N = scores.S_score >= scores.N_score ? "S" : "N";
  const T_F = scores.T_score >= scores.F_score ? "T" : "F";
  const J_P = scores.J_score >= scores.P_score ? "J" : "P";

  return E_I + S_N + T_F + J_P;
}

function TestStartAnswer() {
  const navigate = useNavigate();
  const { testStartId } = useParams();
  const link_id = Number(testStartId); // 현재 테스트 데이터 찾음

  const currentTest = AllTestQuestionsData.find((test) => test.id === link_id); // 현재 질문 인덱스

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 선택된 옵션
  const [selectedOption, setSelectedOption] = useState(null); // MBTI 점수 누적

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
    : null; // 라디오 버튼 선택

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }; // 다음 질문 또는 결과 페이지로 이동

  function nextquestion() {
    if (!selectedOption || !currentQuestion) {
      return;
    } // 선택한 옵션의 점수 가져옴

    const selected = currentQuestion.options.find(
      (opt) => opt.optionId === selectedOption
    );

    if (!selected || !selected.score) {
      console.error("선택된 옵션에 점수 데이터가 없습니다.");
      return;
    } // 점수 누적

    setMbtiScores((prevScores) => {
      const newScores = { ...prevScores };

      for (const axis in selected.score) {
        newScores[axis] += selected.score[axis];
      }
      return newScores;
    });

    const nextIndex = currentQuestionIndex + 1; // 다음 질문 있으면 이동

    if (currentTest && nextIndex < currentTest.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      const finalMbti = calculateMbti(mbtiScores);

      navigate(`/result/${link_id}/${finalMbti}`, {
        state: { finalMbti, scores: mbtiScores },
      });
    }
  }

  if (!currentTest) {
    return <div>테스트를 찾을 수 없습니다.</div>;
  }

  if (!currentQuestion) {
    return <div>결과를 계산 중입니다...</div>;
  }

  // 💡 프로그레스 바에 전달할 현재 진행 상태와 전체 단계 수를 계산합니다.
  const totalQuestions = currentTest.questions.length;
  const currentProgress = currentQuestionIndex + 1;

  return (
    <div>
      <ProgressBar current={currentProgress} total={totalQuestions} />

      <div className="radio_frame">
        <h2 className="answer_title">{currentTest.title}</h2>
        <h3>
          Q{currentQuestion.questionId}. {currentQuestion.text}
        </h3>

        <div>
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
          {currentQuestionIndex === currentTest.questions.length - 1
            ? "결과 확인하기"
            : "다음 질문"}
        </button>
      </div>
    </div>
  );
}

export default TestStartAnswer;

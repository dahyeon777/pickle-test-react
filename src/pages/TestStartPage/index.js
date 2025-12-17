import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RadioOption from "../../components/RadioOption";
import ProgressBar from "../../components/ProgressBar";
import { AllTestQuestionsData } from "../../TestData";
import "./index.css";

//결과 반환
function calculateMbti(scores) {
  const E_I = scores.E_score >= scores.I_score ? "E" : "I";
  const S_N = scores.S_score >= scores.N_score ? "S" : "N";
  const T_F = scores.T_score >= scores.F_score ? "T" : "F";
  const J_P = scores.J_score >= scores.P_score ? "J" : "P";

  return E_I + S_N + T_F + J_P;
}

function TestStartPage() {
  //현재 테스트 찾음
  const navigate = useNavigate();
  const { testStartId } = useParams();
  const isToFind = Number(testStartId);
  const nowTest = AllTestQuestionsData.find((test) => test.id === isToFind);

  const [questionIndex, setQuestionIndex] = useState(0); // 선택된 옵션
  const [selectedOption, setSelectedOption] = useState(null); // MBTI 점수 누적

  const [score, setScore] = useState({
    E_score: 0,
    I_score: 0,
    S_score: 0,
    N_score: 0,
    T_score: 0,
    F_score: 0,
    J_score: 0,
    P_score: 0,
  });

  const nowQuestion = nowTest ? nowTest.questions[questionIndex] : null; // 라디오 버튼 선택

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }; // 다음 질문 또는 결과 페이지로 이동

  function nextquestion() {
    if (!selectedOption || !nowQuestion) {
      return;
    } // 선택한 옵션의 점수 가져옴

    const selected = nowQuestion.options.find(
      (opt) => opt.optionId === selectedOption
    );

    if (!selected || !selected.score) {
      console.error("선택된 옵션에 점수 데이터가 없습니다.");
      return;
    } // 점수 누적

    setScore((prevScores) => {
      const newScores = { ...prevScores };

      for (const axis in selected.score) {
        newScores[axis] += selected.score[axis];
      }
      return newScores;
    });

    const nextIndex = questionIndex + 1; // 다음 질문 있으면 이동

    if (nowTest && nextIndex < nowTest.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      const finalMbti = calculateMbti(score);

      navigate(`/result/${isToFind}/${finalMbti}`, {
        state: { finalMbti, scores: score },
      });
    }
  }

  if (!nowTest) {
    return <div>테스트를 찾을 수 없습니다.</div>;
  }

  if (!nowQuestion) {
    return <div>결과를 계산 중입니다...</div>;
  }

  // 💡 프로그레스 바에 전달할 현재 진행 상태와 전체 단계 수를 계산합니다.
  const totalQuestions = nowTest.questions.length;
  const currentProgress = questionIndex + 1;

  return (
    <div>
      <ProgressBar current={currentProgress} total={totalQuestions} />

      <div className="radio_frame">
        <h2 className="answer_title">{nowTest.title}</h2>
        <h3>
          Q{nowQuestion.questionId}. {nowQuestion.text}
        </h3>

        <div>
          {nowQuestion.options.map((option) => (
            <RadioOption
              key={option.optionId}
              optionId={option.optionId}
              text={option.text}
              name={`question-${nowQuestion.questionId}`}
              onChange={handleOptionChange}
              checked={selectedOption === option.optionId}
            />
          ))}
        </div>
      </div>
      <div>
        <button
          style={buttonStyle}
          disabled={!selectedOption}
          onClick={nextquestion}
        >
          {questionIndex === nowTest.questions.length - 1
            ? "결과 확인하기"
            : "다음 질문"}
        </button>
      </div>
    </div>
  );
}

export default TestStartPage;

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  width: "300px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

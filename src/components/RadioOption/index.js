import React from 'react';


function RadioOption({ optionId, text, name, onChange, checked }) {
  // name: 같은 질문 그룹임을 나타내는 이름 (라디오 버튼은 name이 같아야 하나만 선택됨)
  // optionId: 선택지의 고유 값 (A, B, C, D 등)
  // text: 사용자에게 보여줄 답변 내용
  
  const uniqueId = `option-${name}-${optionId}`; // HTML id는 고유해야 합니다.

  return (
    <div>
      <input
        type="radio"
        id={uniqueId}
        name={name} // 이 name이 같아야 한 그룹으로 묶입니다.
        value={optionId}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={uniqueId}>
        {text}
      </label>
    </div>
  );
}

export default RadioOption;
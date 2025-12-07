import React from "react";
import "./index.css";
import icon from "./icon_1.png";

function FirstPageHeader() {
  return (
    <header>
      <div className="header_top_bar">
        <p>당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!</p>
      </div>
      <nav className="main_nav">
        <ul>
          <li>
            <img src={icon} width="30px" height="30px" alt="아이콘" />
          </li>
          <li>
            <a href="#">홈</a>
          </li>
          <li>
            <a href="#">테스트 목록</a>
          </li>
          <li>
            <a href="#">로그인</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default FirstPageHeader;

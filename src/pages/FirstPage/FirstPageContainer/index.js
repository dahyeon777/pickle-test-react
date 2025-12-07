import React from "react";
// 분리한 Header와 Main 컴포넌트를 불러옵니다.
import FirstPageHeader from "../FirstPageHeader";
import FirstPageMain from "../FirstPageMain";
import './index.css';

// Footer 컴포넌트도 필요하다면 여기서 import 합니다.
// import Footer from './Footer';

const BODY_STYLE_CLASS = "app-background";

function FirstPageContainer() {
  return (
    // 💡 최상위 React Fragment (<>) 대신, className을 가진 <div>로 감쌉니다.
    <div className={BODY_STYLE_CLASS}>
      <FirstPageHeader />
      <FirstPageMain />
      {/* <Footer /> */}
    </div>
  );
}
export default FirstPageContainer;

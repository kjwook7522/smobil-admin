import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./AccessError.css";

function AccessError({ replace }) {
  const goMain = () => {
    replace("/");
  };

  return (
    <section id="access-error">
      <div className="warning-box">
        <IoMdCloseCircleOutline />
        <p>관리자가 아닙니다. 접근하시려면 관리자로 로그인 하시거나 관리자에게 문의해주십시오.</p>
        <button onClick={goMain}>돌아가기</button>
      </div>
    </section>
  );
}

export default AccessError;

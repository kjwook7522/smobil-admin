import React from "react";
import "./GoogleId.css";

function GoogleId({ history }) {
  const userName = localStorage.getItem("fullname");
  const userId = localStorage.getItem("userId");

  const goMain = () => {
    history.replace("/");
  };
  return (
    <section id="google-id">
      <div className="warning-box">
        {/* <IoMdCloseCircleOutline /> */}
        <h1>안녕하세요 {userName}님.</h1>
        <p>SS-mobility 기사로 등록되지 않아 접근할 수 없습니다. 관리자에게 다음 고유번호를 전달해주세요.</p>
        <h2>{userId}</h2>
        <button onClick={goMain}>돌아가기</button>
      </div>
    </section>
  );
}

export default GoogleId;

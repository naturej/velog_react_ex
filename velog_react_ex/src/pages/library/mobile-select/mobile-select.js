import { useEffect, useRef, useState } from "react";
import MobileSelect from "mobile-select";
import styled from "styled-components";

const MobileSelectPage = () => {
  const triggerRef = useRef(null);
  const [selectedVal, setSelectedVal] = useState([]);
  let msInstance = null;
  const today = new Date();

  // 년, 월, 일 data 배열
  const yearArr = Array(5)
    .fill()
    .map((_, index) => today.getFullYear() + index);
  const monthArr = Array.from({ length: 12 }, (_, index) =>
    String(index + 1).padStart(2, "0")
  );
  const dayArr = Array.from({ length: 31 }, (_, index) =>
    String(index + 1).padStart(2, "0")
  );

  useEffect(() => {
    if (!msInstance) {
      msInstance = new MobileSelect({
        trigger: triggerRef.current,
        title: "날짜를 선택해주세요.",
        connector: ".",
        ensureBtnText: "확인",
        cancelBtnText: "취소",
        wheels: [{ data: yearArr }, { data: monthArr }, { data: dayArr }],
        onChange: (data) => {
          setSelectedVal(data);
        },
      });
    }
    return () => {
      msInstance?.destroy(); // Destroying instance
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 실패 시
    if (!validateData()) return alert("유효하지 않은 날짜입니다.");

    alert(
      `선택하신 날짜는 ${selectedVal[0]}년 ${selectedVal[1]}월 ${selectedVal[2]}일입니다.`
    );
  };

  // 유효성 검사 함수
  const validateData = () => {
    const date = selectedVal.join(".");
    console.log(date);

    const selectDateStr = dateToStr(new Date(date));
    console.log(selectDateStr, date);
    return date === selectDateStr;
  };

  const dateToStr = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  };

  return (
    <S.Wrapper>
      <h3>🗓️ 날짜를 선택해주세요.</h3>
      <form onSubmit={onSubmit}>
        <div>
          <div className="mobile-select-box" ref={triggerRef}></div>
        </div>
        <button type="submit" className="button" id="btn-submit">
          확인
        </button>
      </form>
    </S.Wrapper>
  );
};

export default MobileSelectPage;

const S = {};

S.Wrapper = styled.div`
  margin: 0;
  padding: 3em 1em;

  .mobile-select-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border: 1px solid #ddd;
    height: 20px;
    line-height: 20px;
    border-radius: 6px;
  }

  .button {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 20px;
    color: #fff;
    line-height: 20px;
    border: 1px solid #333;
    background-color: #333;
    border-radius: 6px;
  }
`;

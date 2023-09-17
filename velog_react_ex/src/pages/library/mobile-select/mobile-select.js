import { useEffect, useRef, useState } from "react";
import MobileSelect from "mobile-select";
import styled from "styled-components";

const MobileSelectPage = () => {
  const tirggerRef = useRef(null);
  const inputRef = useRef(null);
  // const [selectedVal, setSelectedVal] = useState("");
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
        trigger: tirggerRef.current,
        title: "날짜를 선택해주세요.",
        connector: ".",
        ensureBtnText: "확인",
        cancelBtnText: "취소",
        wheels: [{ data: yearArr }, { data: monthArr }, { data: dayArr }],
        onChange: (data) => {
          inputRef.current.value = data.join(".");
        },
      });
    }
    return () => {
      msInstance?.destroy(); // Destroying instance
    };
  }, []);

  return (
    <S.Wrapper>
      <h3>🗓️ 날짜를 선택해주세요.</h3>
      <form>
        <input type="hidden" id="date" name="date" value="" ref={inputRef} />
        <div>
          <div className="mobile-select-box" ref={tirggerRef}></div>
        </div>
        <button type="button" className="button" id="btn-submit">
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

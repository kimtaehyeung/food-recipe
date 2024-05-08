import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import DataContext from "../context/DataContext";

export default function SlideImg_Random_Bottom({text}) {

  const data = useContext(DataContext);

  const fitData = text !== '' ? data.find((item) => item.RCP_PARTS_DTLS.includes(text)) : data;
  const [currentIndex, setCurrentIndex] = useState();

  const imgSrcList = useMemo(() =>
    data ? data
        .filter(item => item.RCP_PAT2.includes(text))
        .map(item => item.ATT_FILE_NO_MK)
      : [], [data, text]);

  const navigate = useNavigate();
  useEffect(() => {
    if (data.length) {
      setCurrentIndex(Math.floor(Math.random() * imgSrcList.length));
    }
  }, [data.length, imgSrcList.length]); // 의존성 배열 업데이트
  useEffect(() => {
    if (!imgSrcList.length) return; // imgSrcList가 비어있으면 인터벌 설정을 건너뜀
    const interval = setInterval(() => {
      nextButton();
    }, 3000); // 3초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [imgSrcList.length]); // data를 의존성 배열에 추가

  if (!data || !data.length) {
    return <div>Loading...</div>;
  }
  if (!data || !data.length) {
    return <div>Loading...</div>;
  }
  const nextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSrcList.length);
  };

  const prevButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imgSrcList.length) % imgSrcList.length);
  };

  const onClick = () => {
    navigate("/recipe", { state: { recipeData: data[currentIndex] } });
    console.log(data[currentIndex]);
  };


  return (
    <div className = {`relative w-full rounded-3xl mb-0 mr-1 ml-1`} onClick = {onClick}>
      {/* 화살표 버튼만을 위한 컨테이너 */}
      <div className = "absolute inset-0 z-10 flex justify-between items-center w-full h-full">
        <button onClick = {(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          prevButton();
        }} className = "text-[200%] text-blue-400 absolute left-0 top-1/2 transform -translate-y-1/2 ml-4">
          &lt;
        </button>

        <button onClick = {(e) => {
          e.stopPropagation(); // 이벤트 전파 중지
          nextButton();
        }} className = "text-[200%] text-blue-400 absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
          &gt;
        </button>
      </div>

      {/* 기존 이미지 슬라이더 컨테이너 (사이즈 유지) */}
      <div className = "max-w-md mx-auto relative h-[400px]"> {/* or 원하는 높이 값 */}
        {/* 이미지 슬라이드 */}
        <div className = "flex overflow-hidden h-full p-0.5 rounded-3xl">
          {imgSrcList.map((el, index) => (
            <img
              key = {index}
              src = {el}
              className = {`object-cover px-[1%] w-full h-full ${index !== currentIndex ? 'hidden' : ''}`} // 'h-full'로 부모의 높이에 맞춤
              alt = "슬라이드 이미지" // 접근성 향상을 위한 alt 속성 추가
            />
          ))}
        </div>
      </div>
    </div>


  );
}
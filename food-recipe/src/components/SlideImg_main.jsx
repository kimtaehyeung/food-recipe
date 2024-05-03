import {useContext, useEffect, useMemo, useState} from "react";
import DataContext from "../context/DataContext";


export default function SlideImg_main({text, onClick, type}) {

  const data = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState();

  const imgSrcList = useMemo(() => data ? data.map(item => item.ATT_FILE_NO_MK) : []); // 여기를 수정함

  useEffect(() => {
    if (data.length) {
      setCurrentIndex(Math.floor(Math.random() * imgSrcList.length));
    }
  }, [data.length, imgSrcList.length]); // 의존성 배열에 data.length와 imgSrcList.length 추가


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

  // 다음 이미지로 넘어가는 함수
  const nextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSrcList.length);
  };

  // 이전 이미지로 돌아가는 함수
  const prevButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imgSrcList.length) % imgSrcList.length);
  };

  return (
    <div className = {`relative w-full bg-blue-200 rounded-3xl mb-0 mr-1 ml-1 ${type === 'main' ? 'mt-16' : 'mt-0'}`}
         onClick = {onClick}>
      {/* 화살표 버튼만을 위한 컨테이너 */}
      {type === "main" ?
        <div className = "absolute inset-0 z-10 flex justify-between items-center w-full">

          <button onClick = {prevButton} className = "text-[200%] text-blue-400 ml-4">
            &lt;
          </button>

          {text ? <div className = "text-black bg-violet-50 bg-opacity-50 rounded-b text-3xl">{text}</div> : ''}

          <button onClick = {nextButton} className = "text-[200%] text-blue-400 mr-4">
            &gt;
          </button>

        </div>
        : (text ?
          <div className = "absolute inset-0 z-10 flex justify-center items-center w-full h-full">
            <div className = "text-black bg-violet-50 bg-opacity-50 rounded-b text-3xl">
              {text}
            </div>
          </div>
          : '')
      }

      {/* 기존 이미지 슬라이더 컨테이너 (사이즈 유지) */
      }
      <div className = "max-w-md mx-auto relative">
        {/* 이미지 슬라이드 */}
        <div className = "flex overflow-hidden">
          {imgSrcList.map((el, index) => (
            <img
              key = {index}
              src = {el}
              className = {`aspect-square px-[1%] w-full ${index !== currentIndex ? 'hidden' : ''}`} // 현재 인덱스의 이미지만 보여줌
            />
          ))}
        </div>
      </div>
    </div>
  )
    ;
}
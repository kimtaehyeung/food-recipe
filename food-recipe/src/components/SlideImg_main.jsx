import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import DataContext from "../context/DataContext";
import IngredientContext from "../context/IngredientContext";


export default function SlideImg_main({type, text, onClick}) {

  const data = useContext(DataContext);

  const [currentIndex, setCurrentIndex] = useState();
  const imgSrcList = useMemo(() => data ? data.map(item => item.ATT_FILE_NO_MK) : []); // 여기를 수정함
  const navigate = useNavigate();
  const ingredient = useContext(IngredientContext);

  useEffect(() => {
    if (data.length) {
      setCurrentIndex(Math.floor(Math.random() * imgSrcList.length));
    }
  }, [imgSrcList.length]); // 의존성 배열에 data.length와 imgSrcList.length 추가


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
  const mainClick = () => {
    navigate("/recipe", {state: {recipeData: data[currentIndex]}});
  };
  console.log(ingredient);
  return (
    <div
      className = {`relative w-full mb-5 mb-0 ${
        type === 'main' ? 'mt-14 shadow-xl pb-3 rounded-3xl ' : 'mt-0 hover:skew-y-3'
      }`}
      onClick = {type === "main" ? mainClick : onClick}>
      {/* 화살표 버튼만을 위한 컨테이너 */}
      {type === "main" ?
        <div className = "absolute inset-0 z-10 flex justify-between items-center w-full">
          {/* 이전 버튼 */}
          <button
            className = "z-20 absolute left-4 top-1/2 -translate-y-1/2 text-[500%] text-blue-200"
            onClick = {(e) => {
              e.stopPropagation(); // 이벤트 전파 중지
              prevButton();
            }}
          >
            &lt;
          </button>

          {/* 텍스트가 있을 경우 표시 */}
          {text ? (
            <div className = "px-8 py-4 text-black bg-violet-500 bg-opacity-80 rounded-3xl text-3xl font-semibold shadow-lg hover:bg-violet-600 transition duration-300">
              {text}
            </div>
          ) : ''}

              {/* 다음 버튼 */}
              <button
                className = "text-4xl z-20 absolute right-4 top-1/2 -translate-y-1/2 text-[500%] text-blue-200"
                onClick = {(e) => {
                  e.stopPropagation(); // 이벤트 전파 중지
                  nextButton();
                }}
              >
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
      <div
        className = "max-w-md mx-auto relative h-[400px] bg-white rounded-3xl transition-transform duration-300 ">
        {/* 이미지 슬라이드 */}
        <div className = "flex overflow-hidden h-full p-0 rounded-3xl shadow-lg ">
          {imgSrcList.map((el, index) => (
            <img
              key = {index}
              src = {el}
              className = {`transition-opacity duration-1000 ease-linear object-cover w-full h-full rounded-3xl border-2 border-white absolute ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              alt = "슬라이드 이미지"
            />

          ))}
        </div>
      </div>
    </div>
  )
    ;
}
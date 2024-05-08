import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import DataContext from "../context/DataContext";

export default function SlideImg_Random_Top({text}) {
  const data = useContext(DataContext);
  const fitData = data.find((item) => item.RCP_PARTS_DTLS.includes(text));
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

  if (!data || !data.length) {
    return <div>Loading...</div>;
  }

  const nextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSrcList.length);
  };

  const prevButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imgSrcList.length) % imgSrcList.length);
  };

  const mainClick = () => {
    navigate("/recipe", {state: {recipeData: data[currentIndex]}});
  };

  return (
    <>
      <div className = {`relative w-full bg-white rounded-3xl mb-0 mr-1 ml-1`}>
        <div className = "max-w-md mx-auto relative h-[400px] p-2"> {/* padding 추가하여 이미지가 상자보다 조금 작게 보이도록 함 */}
          {/* 이미지 슬라이드 */}
          <div className = "flex overflow-hidden h-full rounded-3xl">

            {imgSrcList.map((el, index) => (
              <img
                key = {index}
                src = {el}
                className = {`object-cover px-[1%] w-full h-auto ${index !== currentIndex ? 'hidden' : ''}`} // 'object-contain'과 'h-auto' 사용
              />
            ))}
            <div className = "absolute inset-0 z-10 flex justify-center items-center">
              <div className = "text-black bg-violet-50 bg-opacity-50 rounded-xl text-3xl">{text}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
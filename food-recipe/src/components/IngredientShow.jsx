import {useContext, useEffect, useState} from 'react';
import DataContext from '../context/DataContext';
import {useNavigate} from "react-router-dom";

export default function IngredientShow({ingredients}) {
  const data = useContext(DataContext);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const filteredIngredients = data.filter(item =>
      ingredients.every(ingredient => item.RCP_PARTS_DTLS.includes(ingredient))
    );
    setSelectedIngredient(filteredIngredients);
  }, [ingredients, data]);

  // 이 부분을 수정합니다: onClick 함수가 이제 index를 인자로 받아 처리합니다.
  const onClick = (index) => {
    setCurrentIndex(index); // 현재 인덱스 설정
    navigate("/recipe", {state: {recipeData: selectedIngredient[index]}}); // navigate 함수를 이용해 선택된 레시피 데이터와 함께 "recipe" 경로로 이동
  };

  return (
    <>
      <div className = "grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4">
        {selectedIngredient.map((item, index) => (
          <div key = {index} className = "flex flex-col overflow-hidden bg-white rounded-3xl shadow-lg">
            {/* 이미지 컨테이너 */}
            <div className = "h-80 w-full flex justify-center items-center overflow-hidden hover:skew-y-3">
              {/* 이미지 클릭 시 onClick 함수를 호출하며 현재 인덱스를 전달 */}
              <img src = {item.ATT_FILE_NO_MK} alt = {item.RCP_NM} className = "w-full h-full object-cover"
                   onClick = {() => onClick(index)} />
            </div>
            {/* 텍스트 컨테이너 */}
            <div className = "p-2 flex justify-center items-center">
              <span className = "text-sm font-semibold text-gray-700">{item.RCP_NM}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
import {useEffect, useState} from "react";
import Header from "./Header";
import SlideImg_main from "./SlideImg_main";
import {useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext";


export default function Main() {
  const api_key = "bf1d888d9a624d488780";
  const url = `http://openapi.foodsafetykorea.go.kr/api/${api_key}/COOKRCP01/json/1/100/`
  // const url = `http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/1`;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
      return setData(data.COOKRCP01.row);
    }).catch(error => console.log("Fetching Error"));

  }, []);

  const mainClick = () => {

  };
  const toRandom = () => {
    navigate("/random");
  }
  const toIngredient = () => {
    navigate("/ingredient");
  }
  const toRank = () => {
    navigate("/rank");
  }

  return (<>
      <Header />
      <DataContext.Provider value = {data}>
        {data.length === 0 ? <div>Loading...</div> : <SlideImg_main type = {"main"} />}
      </DataContext.Provider>


      <div className = "flex justify-center mt-14">
        <DataContext.Provider value = {data}>
          <SlideImg_main text = {"메뉴 랜덤 추천"} onClick = {toRandom} />
          <SlideImg_main text = {"재료로 음식 선택"} onClick = {toIngredient} />
          <SlideImg_main text = {"좋아요 순위"} onClick = {toRank} />
        </DataContext.Provider>

      </div>

    </>
  );
}
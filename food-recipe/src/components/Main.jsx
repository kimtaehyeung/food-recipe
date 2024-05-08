import {useEffect, useState, useContext} from "react";
import Header from "./Header";
import SlideImg_main from "./SlideImg_main";
import {useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext";

export default function Main() {

  const navigate = useNavigate();

  const data = useContext(DataContext);
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
      <div className="bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-600">
      <DataContext.Provider value = {data}>
        {data.length === 0 ? <div>Loading...</div> : <SlideImg_main type = {"main"} />}
      </DataContext.Provider>


      <div className = "flex flex-col sm:flex-row justify-center items-center mt-5 space-y-4 mb-0 sm:space-y-0 sm:space-x-4">
        <DataContext.Provider value = {data}>
          <SlideImg_main text = {"메뉴 랜덤 추천"} onClick = {toRandom} />
          <SlideImg_main text = {"재료로 음식 선택"} onClick = {toIngredient} />
          <SlideImg_main text = {"좋아요 순위"} onClick = {toRank} />
        </DataContext.Provider>
      </div>
      </div>

    </>
  );
}
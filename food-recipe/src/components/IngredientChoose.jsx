import Header from "./Header";
import {useContext} from "react";
import DataContext from "../context/DataContext";

export default function IngredientChoose() {

  const data = useContext(DataContext);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-white">
        <div></div>
      </div>
    </>
  )
}
import Login_button from "./Login_button";
import {useNavigate} from "react-router-dom";
export default function Header() {

  let navigate = useNavigate();

  return (
    <header
      className = "bg-gradient-to-r from-blue-300 via-blue-400 to-white fixed inset-x-0 top-0 z-50 left-0 text-gray-700 body-font ">
      <div className = "container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <div
          className = "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          onClick={() =>{
            navigate("/");
          }}>
          <img src = {"/logo512.png"} className = "w-8 h-8 -mr-1" />
          <span className = "ml-3 text-xl text-indigo-500">로고</span>
        </div>
        <nav className = "md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Login_button />
        </nav>
      </div>
    </header>
  );
}
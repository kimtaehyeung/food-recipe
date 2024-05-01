import Login_button from "./Login_button";
import Random from "./Random";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

export default function Main() {
  const api_key = "bf1d888d9a624d488780";
  const url = `http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/1`;
  const [data, setData] = useState([]);
  let navigate = useNavigate();

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
  if (data.length === 0) {
    return <div className = "">Loading</div>;
  }

  console.log(data);

  return (<>
    <Header />

    <div className = "h-80 p-2 mt-20">

      {/*{() =>{*/}
      {/*  data[0].*/}
      {/*}}*/}
      <div
        className = "bg-top rounded-3xl bg-no-repeat bg-auto size-full border-2 bg-blue-100"
        style = {{
          backgroundImage: `url(${data[0].ATT_FILE_NO_MAIN})`,
        }}>
      </div>
    </div>

    <div className = "flex flex-row h-80 p-2 mt-20">
      <div className = " rounded-3xl basis-1/3 bg-violet-50 mr-3 bg-center bg-no-repeat" style = {{
        backgroundImage: `url(${data[1].ATT_FILE_NO_MAIN})`,
      }}
      onClick={() => {navigate("/random")}}
      > </div>

    </div>
  </>);
}
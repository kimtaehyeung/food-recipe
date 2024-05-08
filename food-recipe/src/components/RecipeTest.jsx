import {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import Header from "./Header"
export default function RecipeTest() {
  const [recipe, setRecipe] = useState({})
  const [isloading, setIsloading] = useState(true)
  let location = useLocation();
  let {recipeData} = location.state || {}

  const getRecipe = async () => {
    try {
      // const response = await (await fetch('http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5')).json()
      setRecipe(recipeData)
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }
  useEffect(() => {
    getRecipe()
  }, [recipeData])
  // console.log(`Data: ${recipe.ATT_FILE_NO_MAIN}`)
  const recipeStyle = {
    width: '70rem',
  }
  console.log(recipe.RCP_NM);
  return (
    <div className = "grid place-items-center bg-slate-100">
      <Header />
      {isloading ? (
        <> isloading... </>
      ) : (
        <div className = "grid place-items-center bg-white shadow" style = {recipeStyle}>
          <header>
            <FoodDisplay recipe = {recipe} />
            <FoodGradients recipe = {recipe} />

            {/*<FoodGradients recipe = {recipe} />*/}
          </header>
          <main className = "mt-16">
            <Step recipe = {recipe} />
            {/*<Step recipe = {recipe} />*/}
          </main>
          {/* <footer className="mt-16">
                            <FoodFinal recipe={recipe}/>
                        </footer> */}
        </div>
      )
      }
    </div>
  );
}

const FoodDisplay = ({recipe}) => {
  const imgSource = recipe.ATT_FILE_NO_MK
  const name = recipe.RCP_NM
  // console.log(recipe);
  // console.log(imgSource)
  return (
    <div className = "flex justify-center mb-16">
      <div className = "grid gap-y-3">
        <img src = {imgSource} alt = "음식 이미지" />
        <p className = "text-center">{name}</p>
      </div>
    </div>
  )
}


const FoodGradients = ({recipe}) => {
  // const recipe = props.recipe[1]
  // console.log(recipe);
  const gradients = recipe.RCP_PARTS_DTLS.split(",")
  const halfOfGradient = Math.ceil(gradients.length / 2)
  const gradientStyle = {
    width: '60rem',
  }
  return (
    <div className = "border border-solid rounded p-3" style = {gradientStyle}>
      <p>재료</p>
      <div className = "flex justify-center w-full">
        <div className = "flex justify-between w-full">
          <ul className = "w-1/2">
            {gradients.slice(0, halfOfGradient).map((gradient, index) => (
              <li key = {index} className = "flex justify-between p-3">
                <span>{index + 1} {gradient}</span>
                <span></span>
              </li>
            ))}
          </ul>
          <ul className = "w-1/2">
            {gradients.slice(halfOfGradient).map((gradient, index) => (
              <li key = {index + halfOfGradient} className = "flex justify-between p-3">
                <span>{index + halfOfGradient + 1}.{gradient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


const Step = ({recipe}) => {
  // const recipe = props.recipe[1]

  let steps = [];
  for (let i = 1; i <= 20; i++) { // 20은 예시로 든 최대 메뉴얼 수입니다. 실제 데이터에 따라 조절해야 합니다.
    const manualKey = `MANUAL${i.toString().padStart(2, '0')}`; // MANUAL01, MANUAL02, ... 형태로 키를 생성합니다.
    if (recipe.hasOwnProperty(manualKey) && recipe[manualKey]) { // 해당 키가 recipe 객체에 존재하고, 값이 비어있지 않은 경우
      steps.push(recipe[manualKey]); // 배열에 추가합니다.
    } else {
      break; // 메뉴얼이 더 이상 존재하지 않으면 반복문을 종료합니다.
    }
  }

  // const steps = [
  //   recipe.MANUAL01,
  //   recipe.MANUAL02,
  //   recipe.MANUAL03
  // ]
  const stepStyle = {
    width: '60rem',
  }
  return (
    <div style = {stepStyle}>
      <p className = "mb-3">조리순서</p>
      <ul className = "grid gap-y-3">
        {steps.map((step, index) => (
          <li key = {index} className = "border border-solid rounded p-3">
            {/* <span className="border border-solid rounded me-1 px-1">{index+1}</span> */}
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FoodFinal = ({recipe}) => {
  const imgSrc = recipe.ATT_FILE_NO_MAIN;
  // console.log(recipe.ATT_FILE_NO_MAIN);
  return (
    <div className = "flex justify-center">
      <div className = "grid gap-y-3">
        <img src = {imgSrc} alt = "음식 최종완성 이미지" />
        <p className = "text-center">최종완성모습</p>
      </div>
    </div>
  )
}
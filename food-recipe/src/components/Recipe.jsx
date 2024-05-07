import { useEffect, useState } from "react"
import axios from "axios"

export default function Recipe(){
    const [recipe,setRecipe] = useState("")
    const [isloading,setIsloading] = useState(true)
    const getRecipe = async() => {
        try {
            const response = await (await fetch('http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5')).json()
            setRecipe(response.COOKRCP01.row)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }
    
    useEffect(()=>{ 
        getRecipe()
    },[])

    
    const recipeStyle = {
        width:'70rem',
        padding:'4rem 0 4rem 0',
    }

    const recipeMainStyle = {
        width:'60rem',
    }

    return (
        <div className="grid place-items-center bg-slate-100">
            {isloading ? ( 
                <> isloading... </>
            ) : (
                    <div className="grid place-items-center bg-white shadow" style={recipeStyle}>
                        <header>
                            <FoodDisplay recipe={recipe}/>
                            <FoodGradients recipe={recipe}/>
                        </header>
                        <main className="mt-16" style={recipeMainStyle}>
                            <Step recipe={recipe}/>
                            <Like likedRecipe={recipe}/>
                        </main>
                        {/* <footer className="mt-16">
                            <FoodFinal recipe={recipe}/>
                        </footer> */}
                    </div>
                )
            }
        </div>
    )
}

const FoodDisplay = (props) => {
    const recipe = props.recipe[1]
    const imgSource = recipe.ATT_FILE_NO_MAIN
    const name = recipe.RCP_NM
    console.log(imgSource)
    return  (
        <div className="flex justify-center mb-16">
            <div className="grid gap-y-3">
                <img src={imgSource} alt="음식 이미지"/>
                <p className="text-center">{name}</p>
            </div>
        </div>
    )
}

const FoodGradients = (props) => {
    const recipe = props.recipe[1]
    const gradients = recipe.RCP_PARTS_DTLS.split(",")
    const halfOfGradient = Math.ceil(gradients.length/2)
    const gradientStyle = {
        width: '60rem',
    }
    return (
        <div className="border border-solid rounded p-3" style={gradientStyle}>   
            <p>재료</p>
            <div className="flex justify-center w-full">
                <div className="flex justify-between w-full">
                    <ul className="w-1/2">
                        {gradients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between p-3">
                                <span>{gradient}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2">
                        {gradients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between p-3">
                                <span>{gradient}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


const Step = (props) => {
    const recipe = props.recipe[1]
    const steps = [
        recipe.MANUAL01,
        recipe.MANUAL02,
        recipe.MANUAL03
    ]
    const stepStyle = {
        width:'60rem',
    }
    return (
        <div style={stepStyle}>
            <p className="mb-3">조리순서</p>
            <ul className="grid gap-y-3">
                {steps.map((step,index)=>(
                    <li key={index} className="border border-solid rounded p-3">
                        {/* <span className="border border-solid rounded me-1 px-1">{index+1}</span> */}
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Like = () => {
    return (
        <div className="w-full flex justify-end mt-2">
            <button className="border rounded px-2 py-1 hover:bg-slate-100 ac" onClick={likeSave}>좋아요</button>
        </div>
    )
}

const likeSave = async (props) => {
    const likedRecipe = props.recipe
    try {
        const response = await axios.post('https://bd3f2ab8-bb65-43b7-b977-a9942d562a74.mock.pstmn.io/users/1', likeSave);
        console.log("Update successful");
    } catch (error) {
        console.error('Error sending updated recipe:', error);
    }
};


const FoodFinal = (props) => {
    const imgSrc = props.recipe[1].ATT_FILE_NO_MAIN
    return (
        <div className="flex justify-center">
            <div className="grid gap-y-3">
                <img src={imgSrc} alt="음식 최종완성 이미지"/>
                <p className="text-center">최종완성모습</p>
            </div>
        </div>
    )
}
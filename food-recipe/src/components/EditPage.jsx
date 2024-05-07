import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function EditRecipe(){
    const [recipe,setRecipe] = useState("")
    const [isloading,setIsloading] = useState(true)
    const [ingredients, setIngredients] = useState("")
    const [steps, setSteps] = useState("")
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
    console.log(ingredients)
    console.log(steps)
    return (
        <div className="grid place-items-center bg-slate-100">
            {isloading ? ( 
                <> isloading... </>
            ) : (
                    <div className="grid place-items-center bg-white shadow" style={recipeStyle}>
                        <header>
                            <FoodDisplay recipe={recipe}/>
                            <FoodGradients recipe={recipe} setIngredients={setIngredients}/>
                        </header>
                        <main className="mt-16" style={recipeMainStyle}>
                            <Step recipe={recipe} setSteps={setSteps}/>
                            <EditBtn recipe={recipe} ingredients={ingredients} steps={steps}/>
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

const EditBtn = (props) => {
    const recipe = props.recipe
    const ingredients = props.ingredients
    const steps = props.steps
    const endpoint = 'https://bd3f2ab8-bb65-43b7-b977-a9942d562a74.mock.pstmn.io/users/1';
    const payload = {
        recipeId: recipe.RCP_SEQ,
        ingredients: ingredients,
        steps: steps
    };
    const sendRecipe = () => {
        try {
            const response = axios.post(endpoint,payload)
            if (response.ok) {
                console.log('Recipe updated successfully');
            } else {
                throw new Error('Failed to update recipe');
            }
        } 
        catch (error) {
            console.error('Error updating recipe:', error);
        }
    }

    return (
        <div className="w-full flex justify-end mt-2">
            <Link to='../user_recipe' onClick={()=>{console.log("edited")}} className="border rounded px-2 py-1 hover:bg-slate-100 me-1">수정완료</Link>
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
    const ingredients = recipe.RCP_PARTS_DTLS.split(",")
    const halfOfGradient = Math.ceil(ingredients.length/2)
    const ingredientStyle = {
        width: '60rem',
    }

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        props.setIngredients(newIngredients);
    };

    return (
        <div className="border border-solid rounded p-3" style={ingredientStyle}>   
            <p>재료</p>
            <div className="flex justify-center w-full">
                <div className="flex justify-between w-full">
                    <ul className="w-1/2">
                        {ingredients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between px-1 py-2">
                                <input 
                                    className="w-full rounded px-1 py-2 hover:bg-slate-100" 
                                    defaultValue={gradient} 
                                    onChange={(event) => handleIngredientChange(index, event)}></input>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2">
                        {ingredients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between px-1 py-2">
                                <input 
                                    className="w-full rounded px-1 py-2 hover:bg-slate-100" 
                                    defaultValue={gradient}
                                    onChange={(event) => handleIngredientChange(index + halfOfGradient, event)}>
                                </input>
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

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        props.setSteps(newSteps);
    };

    return (
        <div style={stepStyle}>
            <p className="mb-3">조리순서</p>
            <ul className="grid gap-y-3">
                {steps.map((step,index)=>(
                    <li key={index} className="">
                        <input 
                            className="w-full border rounded p-3 hover:bg-slate-100"
                            defaultValue={step}
                            onChange={(event)=>handleStepChange(index,event)}>
                        </input>
                    </li>
                ))}
            </ul>
        </div>
    )
}

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
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import { openDB } from 'idb';
import Header from "./Header"
import axios from "axios"

export default function Recipe(){
    const [recipe,setRecipe] = useState({})
    const [isloading,setIsloading] = useState(true)
    let location = useLocation();
    let {recipeData} = location.state || {}

    const getRecipe = async() => {
        try {
            setRecipe(recipeData)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }
    
    useEffect(()=>{ 
        getRecipe()
    },[recipeData])

    const recipeStyle = {
        width:'70rem',
        padding:'4rem 0 4rem 0',
    }

    const recipeMainStyle = {
        width:'60rem',
    }

    return (
        <div className="grid place-items-center bg-slate-100">
            <Header/>
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
                    </div>
                )
            }
        </div>
    )
}

const FoodDisplay = (props) => {
    const recipe = props.recipe
    const imgSource = recipe.ATT_FILE_NO_MAIN
    const name = recipe.RCP_NM
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
    const recipe = props.recipe
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
    const recipe = props.recipe
    let steps = [];
    for (let i = 1; i <= 20; i++) { 
        const manualKey = `MANUAL${i.toString().padStart(2, '0')}`; 
        if (recipe.hasOwnProperty(manualKey) && recipe[manualKey]) { 
            steps.push(recipe[manualKey]); 
        } else {
            break; 
        }
    }   
    const stepStyle = {
        width:'60rem',
    }

    return (
        <div style={stepStyle}>
            <p className="mb-3">조리순서</p>
            <ul className="grid gap-y-3">
                {steps.map((step,index)=>(
                    <li key={index} className="border border-solid rounded p-3">
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

const likeSave = async () => {
    const dbName = 'myDatabase';
    const currentVersion = 2;

    const db = await openDB(dbName, currentVersion, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains('liked')) {
                db.createObjectStore('liked', { keyPath: 'id' });
            }
        },
    });

    const jsonData = [
        { id: 1, name: 'John Do', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];
    
    const tx = db.transaction('liked', 'readwrite');
    const store = tx.objectStore('liked');
    for (const item of jsonData) {
        await store.put(item); 
    }
    await tx.done;

    const allLiked = await db.getAll('liked');
    console.log(allLiked);
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
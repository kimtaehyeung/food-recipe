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

    const recipeMainStyle = {
        width:'60rem',
    }

    return (
        <div className="grid place-items-center bg-slate-100">
            <Header/>
            {isloading ? ( 
                <> isloading... </>
            ) : (
                    <div className="grid place-items-center bg-white shadow w-[70rem] py-[4rem]">
                        <header>
                            <FoodDisplay recipe={recipe}/>
                            <FoodGradients recipe={recipe}/>
                        </header>
                        <main className="mt-16" style={recipeMainStyle}>
                            <Step recipe={recipe}/>
                            <Like recipe={recipe}/>
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
                <img src={imgSource} alt="음식 이미지" className="w-[640px]"/>
                <p className="text-center font-semibold text-2xl">{name}</p>
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
            <p className="font-semibold text-2xl sm:text-lg">재료</p>
            <div className="flex justify-center w-full">
                <div className="flex flex-col sm:flex-row justify-between w-full">
                    <ul className="w-full sm:w-1/2">
                        {gradients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between p-3">
                                <span className="text-2xl sm:text-lg">{gradient}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-full sm:w-1/2">
                        {gradients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between p-3">
                                <span className="text-2xl sm:text-lg">{gradient}</span>
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
            <p className="font-semibold mb-3 text-2xl sm:text-lg">조리순서</p>
            <ul className="grid gap-y-3">
                {steps.map((step,index)=>(
                    <li key={index} className="border border-solid rounded p-3">
                        <span className="text-2xl sm:text-lg">{step}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Like = (props) => {
    const recipe= props.recipe
    return (
        <div className="w-full flex justify-end mt-2">
            <button className="border rounded px-2 py-1 hover:bg-slate-100 text-2xl sm:text-lg" onClick={()=>likeSave(recipe)}>좋아요</button>
        </div>
    )
}

const likeSave = async (data) => {
    const dbName = 'myDatabase';
    const currentVersion = 2;

    const db = await openDB(dbName, currentVersion, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains('liked')) {
                db.createObjectStore('liked', { keyPath: 'id' });
            }
        },
    });

    let steps = [];
    for (let i = 1; i <= 20; i++) { 
        const manualKey = `MANUAL${i.toString().padStart(2, '0')}`; 
        if (data.hasOwnProperty(manualKey) && data[manualKey]) { 
            steps.push(data[manualKey]); 
        } else {
            break; 
        }
    }

    const jsonData = [
        {
            id: data.RCP_SEQ,
            RCP_NM:data.RCP_NM,
            ATT_FILE_NO_MAIN: data.ATT_FILE_NO_MAIN,
            RCP_PARTS_DTLS: data.RCP_PARTS_DTLS.split(","),
            steps: steps
        },
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
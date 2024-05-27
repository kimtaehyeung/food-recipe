import { useEffect, useState } from "react"
import { openDB } from 'idb';
import { Link, useParams } from "react-router-dom"
import Header from "./Header";

export default function UserRecipe(){
    const [recipeDB,setRecipeDB] = useState({})
    const [isloading,setIsloading] = useState(true)
    const { recipeId } = useParams();

    const fetchLiked = async (id) => {
        try {
            const db = await initDB();
            const tx = db.transaction('liked', 'readonly');
            const store = tx.objectStore('liked');
            const likedRecipe = await store.get(id);
            await tx.done;
            setRecipeDB(likedRecipe)
            console.log(likedRecipe)
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setIsloading(false)
        }
    }

    async function initDB() {
        const dbName = 'myDatabase';  
        const version = 2;            
    
        const db = await openDB(dbName, version, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('liked')) {
                    db.createObjectStore('liked', { keyPath: 'id' });
                }
            },
        });
    
        return db;  
    }

    useEffect(()=>{ 
        fetchLiked(recipeId)
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
                        <Header/>
                        <header>
                            <FoodDisplay recipe={recipeDB}/>
                            <FoodGradients recipe={recipeDB}/>
                        </header>
                        <main className="mt-16" style={recipeMainStyle}>
                            <Step recipe={recipeDB}/>
                            <EditBtn recipeId={recipeDB.id}/>
                        </main>
                    </div>
                )
            }
        </div>
    )
}

const EditBtn = (props) => {
    const recipeId=props.recipeId
    return (
        <div className="w-full flex justify-end mt-2">
            <Link to='../edit_recipe' state={{ recipeId: recipeId }} className="border rounded px-2 py-1 hover:bg-slate-100 text-2xl sm:text-lg">수정하기</Link>
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
    const gradients = recipe.RCP_PARTS_DTLS
    const halfOfGradient = Math.ceil(gradients.length/2)
    const gradientStyle = {
        width: '60rem',
    }
    return (
        <div className="border border-solid rounded p-3" style={gradientStyle}>   
            <p className="font-semibold text-2xl sm:text-lg">재료</p>
            <div className="flex justify-center w-full">
                <div className="flex flex-col sm:flex-row justify-between w-full">
                    <ul className="w-1/2 sm:w-1/2">
                        {gradients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between px-1 py-2">
                                <span className="text-2xl sm:text-lg">{gradient}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2 sm:w-1/2">
                        {gradients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between px-1 py-2">
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
    const steps = recipe.steps
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
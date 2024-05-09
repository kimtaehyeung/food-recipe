import { useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import { openDB } from 'idb';

export default function EditRecipe(){
    const [recipeDB,setRecipeDB] = useState([])
    const [isloading,setIsloading] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const location = useLocation();
    const recipeId = location.state?.recipeId;
    
    const fetchLiked = async () => {
        try {
            const db = await initDB();
            const tx = db.transaction('liked', 'readonly');
            const store = tx.objectStore('liked');
            const allLikes = await store.getAll();
            const selectedRecipe = await store.get(recipeId);
            await tx.done;
            setRecipeDB(selectedRecipe);
            setIngredients(selectedRecipe.RCP_PARTS_DTLS || []); 
            setSteps(selectedRecipe.steps || []);
            return allLikes;
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
            upgrade(db, oldVersion, newVersion, transaction) {
                if (!db.objectStoreNames.contains('liked')) {
                    db.createObjectStore('liked', { keyPath: 'id' });
                }
            }
        });

        return db;  
    }
    
    useEffect(()=>{ 
        fetchLiked()
    },[])

    const recipeStyle = {
        width:'70rem',
        padding:'4rem 0 4rem 0',
    }
    const recipeMainStyle = {
        width:'60rem',
    }
    console.log(recipeDB)
    return (
        <div className="grid place-items-center bg-slate-100">
            {isloading ? ( 
                <> isloading... </>
            ) : (
                    <div className="grid place-items-center bg-white shadow" style={recipeStyle}>
                        <header>
                            <FoodDisplay recipe={recipeDB}/>
                            <FoodGradients recipe={recipeDB} ingredients={ingredients} setIngredients={setIngredients}/>
                        </header>
                        <main className="mt-16" style={recipeMainStyle}>
                            <Step recipe={recipeDB} steps={steps} setSteps={setSteps}/>
                            <UpdateBtn recipe={recipeDB} ingredients={ingredients} steps={steps}/>
                        </main>
                    </div>
                )
            }
        </div>
    )
}

const UpdateBtn = (props) => {
    const navigate = useNavigate();
    const recipeId = props.recipe.id
    const recipeImg = props.recipe.ATT_FILE_NO_MAIN
    const ingredients = props.ingredients
    const steps = props.steps
    
    const handleUpdate = async () => {
        const newData = {
            id: recipeId,
            ATT_FILE_NO_MAIN: recipeImg,
            RCP_PARTS_DTLS: ingredients,
            steps: steps
        };
        await EditedlikeSave(newData)
        navigate(`/user_recipe/${recipeId}`);
    }

    return (
        <div className="w-full flex justify-end mt-2">
            <button onClick={handleUpdate} className="border rounded px-2 py-1 hover:bg-slate-100 me-1">수정완료</button>
        </div>
    )
}

const EditedlikeSave = async (data) => {
    const db = await openDB('myDatabase', 2);
    const jsonData = {
        id: data.id,  
        ATT_FILE_NO_MAIN: data.ATT_FILE_NO_MAIN,
        RCP_PARTS_DTLS: data.RCP_PARTS_DTLS,
        steps: data.steps
    };

    const tx = db.transaction('liked', 'readwrite');
    const store = tx.objectStore('liked');
    await store.put(jsonData); 
    await tx.done;
};


const FoodDisplay = (props) => {
    const recipe = props.recipe
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
    const ingredients = props.ingredients
    const halfOfGradient = Math.ceil(ingredients.length/2)
    const ingredientStyle = {
        width: '60rem',
    }

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        props.setIngredients(newIngredients);
    };

    const addIngredient = () => {
        const newIngredients = [...ingredients, ''];
        props.setIngredients(newIngredients);
    };

    const removeIngredient = (index) => {
        props.setIngredients(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="border border-solid rounded p-3" style={ingredientStyle}>   
            <p> 재료
                <button onClick={addIngredient} className="px-2 py-1 border rounded hover:bg-slate-100">재료 추가</button>
            </p>
            <div className="flex justify-center w-full">
                <div className="flex justify-between w-full">
                    <ul className="w-1/2">
                        {ingredients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between px-1 py-2">
                                <input 
                                    className="w-full rounded px-1 py-2 hover:bg-slate-100" 
                                    defaultValue={gradient} 
                                    onChange={(event) => handleIngredientChange(index, event)}
                                />
                                <button onClick={() => removeIngredient(index)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2">
                        {ingredients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between px-1 py-2">
                                <input 
                                    className="w-full rounded px-1 py-2 hover:bg-slate-100" 
                                    defaultValue={gradient}
                                    onChange={(event) => handleIngredientChange(index + halfOfGradient, event)}
                                />
                                <button onClick={() => removeIngredient(index + halfOfGradient)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


const Step = (props) => {
    const steps = props.steps
    const stepStyle = {
        width:'60rem',
    }

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        props.setSteps(newSteps);
    };

    const addStep = () => {
        const newStep = [...steps, ''];
        props.setSteps(newStep);
    };

    const removeStep = (index) => {
        props.setSteps(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={stepStyle}>
            <p className="mb-3">
                조리순서
                <button onClick={addStep} className="px-2 py-1 border rounded hover:bg-slate-100">순서 추가</button>
            </p>
            <ul className="grid gap-y-3">
                {steps.map((step,index)=>(
                    <li key={index} className="">
                        <input 
                            className="w-full border rounded p-3 hover:bg-slate-100"
                            defaultValue={step}
                            onChange={(event)=>handleStepChange(index,event)}
                        />
                        <button onClick={() => removeStep(index)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
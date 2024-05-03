import { useEffect, useState } from "react"

export default function UserRecipe(){
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
                        <main className="mt-16">
                            <Step recipe={recipe}/>
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
    const initialGradients = props.recipe[1].RCP_PARTS_DTLS.split(",");
    const [gradients, setGradients] = useState(initialGradients);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(gradients[index]);
    };

    const handleSave = (index) => {
        const newGradients = [...gradients];
        newGradients[index] = editText;
        setGradients(newGradients);
        setEditIndex(-1);
        setEditText("");
    };

    const handleChange = (event) => {
        setEditText(event.target.value);
    };

    const halfOfGradient = Math.ceil(gradients.length / 2);

    return (
        <div className="border border-solid rounded p-3" style={{ width: '60rem' }}>   
            <p>재료</p>
            <div className="flex justify-center w-full">
                <div className="flex justify-between w-full">
                    <ul className="w-1/2">
                        {gradients.slice(0, halfOfGradient).map((gradient, index) => (
                            <li key={index} className="flex justify-between p-3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(index)}
                                        className="w-full"
                                    />
                                ) : (
                                    <span onClick={() => handleEdit(index)}>
                                        {index + 1}. {gradient}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2">
                        {gradients.slice(halfOfGradient).map((gradient, index) => (
                            <li key={index + halfOfGradient} className="flex justify-between p-3">
                                {editIndex === index + halfOfGradient ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(index + halfOfGradient)}
                                        className="w-full"
                                    />
                                ) : (
                                    <span onClick={() => handleEdit(index + halfOfGradient)}>
                                        {index + halfOfGradient + 1}. {gradient}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const Step = (props) => {
    const recipe = props.recipe[1];
    const [editIndex, setEditIndex] = useState(-1);    
    const [editText, setEditText] = useState('');
    
    const initialSteps = [
        recipe.MANUAL01,
        recipe.MANUAL02,
        recipe.MANUAL03
    ];
    const [steps, setSteps] = useState(initialSteps);  


    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(steps[index]);
    };

    const handleSave = (index) => {
        const newSteps = [...steps];
        newSteps[index] = editText;
        setSteps(newSteps);
        setEditIndex(-1);
        setEditText('');
    };

    const handleChange = (event) => {
        setEditText(event.target.value);
    };

    const stepStyle = {
        width: '60rem',
    };

    return (
        <div style={stepStyle}>
            <p className="mb-3">조리순서</p>
            <ul className="grid gap-y-3">
                {steps.map((step, index) => (
                    <li key={index} className="border border-solid rounded p-3">
                        {editIndex === index ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={handleChange}
                                onBlur={() => handleSave(index)}
                                className="w-full"
                            />
                        ) : (
                            <span onClick={() => handleEdit(index)}>
                                {index + 1}. {step || '내용을 입력하세요.'}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
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
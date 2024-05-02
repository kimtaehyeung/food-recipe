import { useEffect, useState } from "react"

export default function Recipe(){
    const [recipe,setRecipe] = useState("")
    const [isloading,setIsloading] = useState(true);
    const xmlParser = new DOMParser();
    const parsedRecipe = xmlParser.parseFromString(recipe,"text/xml")
    const recipe01 = parsedRecipe.querySelector('row[id="0"]')
    // const recipe01Img = '"'+recipe01.querySelector("MENUAL_IMG01")
    const getRecipe = async() => {
        const result = await fetch('http://openapi.foodsafetykorea.go.kr/api/f066be87d43a408e99bd/COOKRCP01/xml/1/5')
        const result_text = await result.text();
        setRecipe(result_text)
    }
    useEffect(()=>{
        getRecipe()
        setIsloading(false)
    },[])
    console.log(recipe)
    return (
        <div className="mx-52 bg-white">
            <header>
                <FoodDisplay/>
                <FoodGradients/>
            </header>
            <main className="mt-16">
                {step}
            </main>
            <footer className="mt-16">
                {foodFinal}
            </footer>
        </div>
    )
}

// component 내에서 api parsing 진행
const FoodDisplay = () => {
    return  (
        <div className="flex justify-center mb-16">
            <div className="grid gap-y-3">
                <img src="https://dummyimage.com/600x400/878787/000000" alt="음식 이미지"/>
                <p className="text-center">음식이름</p>
            </div>
        </div>
    )
}


const gradients = ["소금","소금","소금","소금","소금","소금","소금","소금","소금","소금","소금","소금"]

const FoodGradients = () => {
    return (
        <div className="container mx-auto border border-solid rounded p-3">   
        {/* list에서 가져오기 */}
        {/* 재료 요소가 영역 넘어가면 다음 칸으로 이동하기 */}
            <p>재료</p>
            <div className="flex justify-center w-full">
                <div className="flex w-3/4 justify-around">
                    <ul className="w-1/2">
                        {gradients.slice(0, Math.ceil(gradients.length/2)).map((gradient, index) => (
                            <li key={index} className="flex justify-between p-3">
                                <span>{index+1} {gradient}</span>
                                <span>용량 : 10g</span>
                            </li>
                        ))}
                    </ul>
                    <ul className="w-1/2">
                        {gradients.slice(Math.ceil(gradients.length/2)).map((gradient, index) => (
                            <li key={index + Math.ceil(gradients.length/2)} className="flex justify-between p-3">
                                <span>{index + Math.ceil(gradients.length/2)+1} {gradient}</span>
                                <span>용량 : 10g</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const steps = [
    'Lorem ipsum dolor sit amet consectetur. Egestas nisl id imperdiet donec mi risus',
    'Lorem ipsum dolor sit amet consectetur. Egestas nisl id imperdiet donec mi risus',
    'Lorem ipsum dolor sit amet consectetur. Egestas nisl id imperdiet donec mi risus',
    'Lorem ipsum dolor sit amet consectetur. Egestas nisl id imperdiet donec mi risus',
    'Lorem ipsum dolor sit amet consectetur. Egestas nisl id imperdiet donec mi risus'
]

const step = (
    <div className="container mx-auto">
        <p className="mb-3">조리순서</p>
        <ul className="grid gap-y-3">
            {steps.map((step,index)=>(
                <li key={index} className="border border-solid rounded p-3">
                    <span className="border border-solid rounded me-1 px-1">{index+1}</span>
                    <span>{step}</span>
                </li>
            ))}
        </ul>
    </div>
)

const foodFinal = (
    <div className="flex justify-center">
        <div className="grid gap-y-3">
            <img src="https://dummyimage.com/600x400/878787/000000" alt="음식 최종완성 이미지"/>
            <p className="text-center">최종완성모습</p>
        </div>
    </div>
)
export default function Like(){
    return (
        <>
         {likedFood}
        </>
    )
}

const likedFoodList = ["food1","food2","food3","food4","..."]

const likedFood = (
    <div className="container mx-auto">
        <ul>
            {likedFoodList.map((liked,index)=>(
                <div key={index}>
                    <li>{liked}</li>
                    <button>삭제</button>
                </div>
            ))}
        </ul>
    </div>
)
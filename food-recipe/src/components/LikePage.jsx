import { useEffect, useState } from "react"

export default function LikePage(){
    return (
        <>
            <LikedFood/>
        </>
    )
}


const LikedFood = () => {
    const [liked, setLiked] = useState([])
    const likedFoodList = ["food1","food2","food3","food4","..."]
    useEffect(()=>{
        setLiked(likedFoodList)
    },[])
    const likedListStyle = {
        width:'60rem',
    }
    const likedStyle = {
        width:'50rem',
    }

    const deleteLiked = (id) => {
        const remainLiked = liked.filter((like)=>like.id!=id)
        setLiked(remainLiked)
    }
    
    return (
        <div className="h-screen grid place-items-center bg-slate-100">
            <div className="h-screen grid place-items-center bg-white shadow" style={likedListStyle}>
                <ul>
                    {liked.map((l,index)=>(
                        <div key={index}>
                            <li className="flex justify-between border border-solid p-3" style={likedStyle}>
                                <span>{l}</span>
                                <button onClick={()=> deleteLiked({index})}>삭제</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

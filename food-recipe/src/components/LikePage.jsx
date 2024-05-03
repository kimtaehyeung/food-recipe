import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function LikePage(){
    return (
        <>
            <LikedFood/>
        </>
    )
}


const LikedFood = () => {
    const [liked, setLiked] = useState([])
    const likedFoodList = [
        { id: 1, name: "food1" },
        { id: 2, name: "food2" },
        { id: 3, name: "food3" },
        { id: 4, name: "food4" }
    ]
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
        const remainLiked = liked.filter((item)=>item.id!=id)
        setLiked(remainLiked)
    }
    
    return (
        <div className="h-screen grid place-items-center bg-slate-100">
            <div className="h-screen grid place-items-center bg-white shadow" style={likedListStyle}>
                <ul>
                    {liked.map((item,index)=>(
                        <div key={item.id}>
                            <li className="flex justify-between border border-solid p-3" style={likedStyle}>
                                <span>{item.name}</span>
                                <div>
                                    <Link to={`../user_recipe`} className="rounded hover:bg-slate-200 p-1 me-2">보기</Link>
                                    <button className="rounded hover:bg-slate-200 p-1" onClick={()=> deleteLiked(item.id)}>삭제</button>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

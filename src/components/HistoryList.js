import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import useHitBottom from "../hooks/useHitBottom";
import { getArticleById } from "../api";
import Card from "./Card";
import { useAppState } from "./state"

const HistoryList = ({})=>{
    const [state, reducer] = useAppState()
    const [articleList, setArticleList] = useState([]);
    useEffect(()=>{
        Promise.all([...state.history.map(article => getArticleById(article))]).then((value) =>{
            // console.log(value.map(item=>item.data.article));
            setArticleList(value.map(item=>item.data.article))
        })
    },[])
    return (
        <div className="flex flex-col overflow-hidden">
            {
                articleList.length === 0 ? (
                    <div className="w-screen max-w-screen-tablet">
                        <span className="text-opacity-40 text-5xl text-grey m-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">空空如也</span>
                    </div>
                ) : articleList.map((article,index) => {
                        return (
                            <Card
                                key = {article.article_id}
                                article={article}>
                            </Card>
                        )
                    }
                )
            }
        </div>
    )
}
export default HistoryList;
import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import useHitBottom from "../hooks/useHitBottom";
import { getArticles } from "../api";
import Card from "./Card";

const ContentList = ({condition})=>{
    const [articleList, setArticleList] = useState([]);
    useEffect(()=>{
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, 0, 10).then((value) =>{
            setArticleList([...value.data.articles]);
        })
    },[condition])
    // expand must!! useCallback
    const expand = useCallback(()=>{
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, articleList.length, 10).then((value) =>{
            setArticleList([...articleList,...value.data.articles]);
        })
    },[articleList])
    const infiniter = useHitBottom(expand);
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            {/* <div id="top-margin" style={{margin:`${topMargin}px 0 0 0`}}></div> */}
            {
            // useMemo(()=>{
                articleList.map((article,index) => {
                        // if(index === 0) console.log(articleList);
                        return (
                            <div 
                                id={index === articleList.length-1 ? "bottom" : "" } 
                                ref={index === articleList.length-1 ? infiniter : null}
                                key={index}>
                                <Card
                                    article={article}>
                                </Card>
                            </div>
                        )
                    }
                )
            // },[articleList, infiniter])
            }
        {/* <div id="bottom-margin" style={{margin:`0 0 ${bottomMargin}px 0`}}></div> */}
        </div>
    )
}
export default ContentList;
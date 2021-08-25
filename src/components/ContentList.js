import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import useHitBottom from "../hooks/useHitBottom";
import { getArticles } from "../api";
import Card from "./Card";

const ContentList = ({condition})=>{
    const [articleList, setArticleList] = useState([]);
    useEffect(()=>{
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, 0, 10, condition.filter)
            .then((value) =>{
                let dedup = {};
                const deduplicate = value.data.articles.reduce((cur,next)=>{
                    if(dedup[next.article_id]=== undefined) {
                        dedup[next.article_id] = true;
                        cur.push(next);
                    }
                    return cur;
                },[])
                setArticleList([...deduplicate]);
            })
    },[condition])
    // expand must!! useCallback
    const expand = useCallback(()=>{
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, articleList.length, 10, condition.filter).then((value) =>{
            let dedup = {};
            articleList.forEach(item=> dedup[item.article_id] = true)
            const deduplicate = value.data.articles.reduce((cur,next)=>{
                if(dedup[next.article_id]=== undefined) {
                    dedup[next.article_id] = true; 
                    cur.push(next);
                }
                return cur;
            },[])
            setArticleList([...articleList,...deduplicate]);
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
                                key={article.article_id}>
                                <Card
                                    article={article}
                                    keywords={condition.filter}>
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
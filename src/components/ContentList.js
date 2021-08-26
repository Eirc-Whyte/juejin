import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import useHitBottom from "../utils/useHitBottom";
import { getArticles } from "../api";
import Card from "./Card";

/*
    显示文章列表，使用useHitBottom监听是否触底
*/
const ContentList = ({condition})=>{
    const [articleList, setArticleList] = useState([]);
    useEffect(()=>{
        // 每当condition变动时初始化加载
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, 0, 10, condition.filter)
            .then((value) =>{
                let dedup = {};
                // 去重
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
    // onHandleHitBottom must!! useCallback
    const onHandleHitBottom = useCallback(()=>{
        // 新加载内容到内容列表中，注意使用useCallback
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, articleList.length, 10, condition.filter).then((value) =>{
            let dedup = {};
            articleList.forEach(item=> dedup[item.article_id] = true)
            // 去重
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
    // 自定义的useHitBottom hooks用于检测触底
    const infiniter = useHitBottom(onHandleHitBottom);
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            {
                articleList.map((article,index) => {
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
            }
        </div>
    )
}
export default ContentList;
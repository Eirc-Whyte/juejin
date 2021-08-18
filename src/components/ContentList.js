import { useCallback, useEffect, useRef, useState } from "react";
import useHitBottom from "../hooks/useHitBottom";
import { getArticles } from "../api";
import Card from "./Card";

const ContentList = ({condition})=>{
    const [articleList, setArticleList] = useState([]);
    const [articleIdSet, setArticleIdSet] = useState([]);
    
    useEffect(()=>{
        getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, 0, 10).then((value) =>{
            let array = []
            let arr = value.data.articles;
            let indexSet = []
            for (var i = 0; i < arr.length; i++) {
                if (indexSet.indexOf(arr[i].article_id) === -1) {
                    array.push(arr[i])
                    indexSet.push(arr[i].article_id)
                }
            }
            setArticleIdSet(indexSet);
            setArticleList(array);
            return array;
        })
    },[])
    const expand = ()=>{
        return getArticles(condition.tag === "all" ? condition.categoryId : condition.tag, condition.sortBy, articleList.length, 10).then((value) =>{
            let array = articleList;
            let arr = value.data.articles;
            let indexSet = articleIdSet;
            for (var i = 0; i < arr.length; i++) {
                if (indexSet.indexOf(arr[i].article_id) === -1) {
                    array.push(arr[i])
                    indexSet.push(arr[i].article_id)
                }
            }
            setArticleIdSet(indexSet);
            setArticleList(array);
        }).then(()=>{
            console.log(articleList);
        })
    }
    const infiniter = useHitBottom(expand);
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            {/* <div id="top-margin" style={{margin:`${topMargin}px 0 0 0`}}></div> */}
            {articleList
                .map((article,index) => {
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
        )}
        {/* <div id="bottom-margin" style={{margin:`0 0 ${bottomMargin}px 0`}}></div> */}
        </div>
    )
}
export default ContentList;
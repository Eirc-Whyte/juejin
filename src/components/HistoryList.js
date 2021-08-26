import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import useHitBottom from "../utils/useHitBottom";
import { getArticleById } from "../api";
import Card from "./Card";
import { useAppState } from "../utils/state"

const HistoryList = ({})=>{
    const [state, dispatch] = useAppState()
    const [articleList, setArticleList] = useState([]);
    const pre = useRef(0);
    const button = useRef(null);
    // 维护clear button显示状态
    useEffect(()=>{
        const onScroll = (e)=>{
            if(button && window.pageYOffset > 0 && window.pageYOffset >= pre.current){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
                button.current.className = button.current.className + ' translate-y-32';
            } else {
                button.current.className = button.current.className.replace(' translate-y-32','')
            }
            pre.current = window.pageYOffset;
        }
        window.addEventListener('scroll',onScroll);
        return ()=>{ window.removeEventListener('scroll',onScroll); }
    },[])
    // 根据历史记录获取每篇文章信息
    useEffect(()=>{
        Promise.all([...state.history.map(article => getArticleById(article))]).then((value) =>{
            // console.log(value.map(item=>item.data.article));
            setArticleList(value.map(item=>item.data.article))
        })
    },[state])
    return (
        <div className="flex flex-col overflow-hidden">
            {
                articleList.length === 0 ? (
                    <div className="w-screen max-w-screen-tablet">
                        <span className="text-opacity-40 text-4xl text-grey m-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">空空如也</span>
                    </div>
                ) : articleList.map((article,index) => {
                        return (
                            <Card
                                key = {article.article_id}
                                article={article}
                                keywords={[]}>
                            </Card>
                        )
                    }
                )
            }
            <button 
                className="clear fixed bottom-16 right-6 h-14 w-14 rounded-full bg-blue-500 border text-white shadow-lg transform transition-all"
                onClick={() => {
                    dispatch({
                        type: "CLEAR_HIS",
                    })
                }}
                ref={button}>
                Clear
            </button>
        </div>
    )
}
export default HistoryList;
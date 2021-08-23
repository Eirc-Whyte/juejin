import useHitBottom from "../hooks/useHitBottom";
import { useCallback, useEffect, useRef, useState,useMemo } from "react";
import {getCommentsByArticleId} from '../api'
import Comment from "./Comment";
const CommentList = ({articleId})=>{
    const [comments, setComments] = useState([]);
    const limit = 10;
    useEffect(()=>{
        getCommentsByArticleId(articleId, comments.length, limit).then((val)=>{
            setComments(val.data.comments);
        })
    },[])
    const onHandleHitBottom = useCallback(()=>{
        getCommentsByArticleId(articleId, comments.length, limit).then((val)=>{
            setComments([...comments, ...val.data.comments]);
        })
    },[comments]) 
    const infiniter = useHitBottom(onHandleHitBottom)
    return (
        <div className="w-screen mx-4 px-7 bg-white pt-4 mb-4 max-w-screen-tablet">
            <div className="flex flex-col items-center justify-center mt-6 mb-2 mx-4 px-10 bg-gray-50">
                <input className="my-4 focus:outline-blue rounded px-4 py-2 w-full" placeholder="输入评论..."></input>
                <div className="flex my-2 items-center justify-between w-full">
                    <div className="text-blue px-4">插入图片</div>
                    <button className="bg-blue-500 text-white rounded mx-4 px-4 py-1 hover:bg-blue-500">评论</button>
                </div>
            </div>
            {comments.map((comment,index) => 
            <div 
                id={index === comments.length-1 ? "bottom" : "" } 
                ref={index === comments.length-1 ? infiniter : null}
                key={comment.comment_id}>
            <Comment comment={comment}></Comment>
            </div>
            )}
        </div>
    )
}
export default CommentList;
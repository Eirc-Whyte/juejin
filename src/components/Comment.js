import { useEffect, useState } from 'react';
import {getCommentsByArticleId} from '../api';
import likeIcon from './asset/like.png'; 
import commentIcon from './asset/comment.png'
import lv1 from './asset/lv1.svg';
import lv2 from './asset/lv2.svg';
import lv3 from './asset/lv3.svg';
import lv4 from './asset/lv4.svg';
import lv5 from './asset/lv5.svg';
import lv6 from './asset/lv6.svg';
import lv7 from './asset/lv7.svg';
const Comment = (articleId)=>{
    const [comments, setComments] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const lvIcons = ["",lv1,lv2,lv3,lv4,lv5,lv6,lv7];
    useEffect(()=>{
        getCommentsByArticleId(articleId, offset, limit).then((val)=>{
            setComments(val.data.comments);
            console.log(val.data.comments)
        })
    },[])
    return (
        <div className="w-screen mx-4 px-7 bg-white pt-4 mb-4 max-w-screen-tablet">
            <div className="flex flex-col items-center justify-center mt-6 mb-2 mx-4 px-10 bg-gray-50">
                <input className="my-4 focus:outline-blue rounded px-4 py-2 w-full" placeholder="输入评论..."></input>
                <div className="flex my-2 items-center justify-between w-full">
                    <div className="text-blue px-4">插入图片</div>
                    <button className="bg-blue-500 text-white rounded mx-4 px-4 py-1 hover:bg-blue-500">评论</button>
                </div>
            </div>
            {comments.map((comment)=>(
                <div 
                key = {comment.comment_id}
                className="flex divide-x my-6 w-full">
                    <img className="mr-4 bg-cover rounded-full w-10 h-10 " 
                        alt="user_avatar"
                        src={comment.user_info.avatar_large}></img>
                    <div className="pl-4 flex flex-col justify-center flex-1">
                        <div className="flex justify-start mb-2">
                            <div className="mr-2 text-black font-bold">{comment.user_info.user_name}</div>
                            {comment.user_info.level === 0 ? "": <img className="mx-1 bg-cover " alt="user_level" src={lvIcons[comment.user_info.level]}/>}
                            <div className="mx-1 text-gray-400">{comment.user_info.job_title}</div> 
                        </div>
                        <div className="mb-2">{comment.comment_info.comment_content}</div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-gray-300">2019年09月18日</div>
                            <div className="flex items-center">
                                <div></div>
                                <img className="bg-cover w-4 h-4 mx-1" alt="like" src={likeIcon}/>
                                <div className="mr-6 text-gray-400">{comment.comment_info.digg_count}</div>
                                <img className="bg-cover w-4 h-4 " alt="comment" src={commentIcon}/>
                                <div className="mx-1 text-gray-400">{comment.reply_infos.length} 回复</div>
                            </div>
                        </div>
                        <div className="reply flex flex-col justify-between items-center bg-gray-50">
                            {comment.reply_infos.map(reply => {
                                return(
                                    <div 
                                        key = {reply.reply_id}
                                        className="px-7 flex my-3 w-full">
                                            <img className="mr-4 bg-cover rounded-full w-10 h-10 " 
                                                alt="user_avatar"
                                                src={reply.user_info.avatar_large}></img>
                                            <div className="pl-4 flex flex-col justify-center flex-1">
                                                <div className="flex justify-start mb-2">
                                                    <div className="mr-2 text-black font-bold">{reply.user_info.user_name}</div>
                                                    {reply.user_info.level === 0 ? "": <img className="mx-1 bg-cover " alt="user_level" src={lvIcons[reply.user_info.level]}/>}
                                                    <div className="mx-1 text-gray-400">{reply.user_info.job_title}</div> 
                                                </div>
                                                <div className="mb-2">{reply.reply_info.reply_content}</div>
                                            </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
export default Comment;
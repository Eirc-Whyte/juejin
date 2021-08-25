import likeIcon from './asset/like.png'; 
import commentIcon from './asset/comment.png'
import lv1 from './asset/lv1.svg';
import lv2 from './asset/lv2.svg';
import lv3 from './asset/lv3.svg';
import lv4 from './asset/lv4.svg';
import lv5 from './asset/lv5.svg';
import lv6 from './asset/lv6.svg';
import lv7 from './asset/lv7.svg';
import moment from 'moment';
const Comment = ({comment})=>{
    const lvIcons = ["",lv1,lv2,lv3,lv4,lv5,lv6,lv7];
    return (
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
                <div className="text-gray-300">{moment.unix(comment.comment_info.ctime).format('YYYY-MM-DD')}</div>
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
                                    alt="avater"
                                    src={reply.user_info.avatar_large}></img>
                                <div className="pl-4 flex flex-col justify-center flex-1">
                                    <div className="flex justify-start mb-2">
                                        <div className="mr-2 text-black font-bold line-clamp-1">{reply.user_info.user_name}</div>
                                        {reply.user_info.level === 0 ? "": <img className="mx-1 bg-cover " alt="user_level" src={lvIcons[reply.user_info.level]}/>}
                                        <div className="mx-1 text-gray-400 line-clamp-1">{reply.user_info.job_title}</div> 
                                    </div>
                                    <div className="mb-2">{reply.reply_info.reply_content}</div>
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
        
    </div>)
}
export default Comment;
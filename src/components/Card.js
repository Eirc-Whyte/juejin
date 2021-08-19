import view from './asset/view.png'; 
import favourite from './asset/like.png'; 
import comment from './asset/comment.png';
import { Link } from "react-router-dom";
import React from 'react'
const Card = ({article})=>{
    let {article_id, article_info, author_user_info} = article;
    return (
        <Link to={`/article/${article_id}`}>
        <div className="content-box hover:bg-gray-50 w-screen px-7 max-w-screen-tablet">
            <div className="meta-box inline-flex pt-4 align-middle justify-between">
                <div className="user-message pr-2">{author_user_info.user_name}</div>
                <div className="text-grey date px-2">{new Date().toLocaleDateString()}</div>
                <div className="text-grey tag-list flex divide-x ">
                    {/* <a className="px-2 cursor-pointer">前端</a>
                    <a className="px-2 cursor-pointer">javascript</a> */}
                </div>
            </div>
            <div className="content-wrapper flex flex-col my-3 pb-4 border-b items-start ">
                <div className="title text-xl mb-2 font-bold">
                    {article_info.title}
                </div>
                <div className="content-main flex flex-auto justify-between pb-4">
                    <div className="text-base text-grey mb-2">
                        <p className="brief">{article_info.brief_content}</p>
                    </div>
                    <img 
                    // height={40}
                    width={120}
                    className="ml-8"
                    alt={article_info.cover_image}
                    src={article_info.cover_image}/>
                </div>
                <div className="action-list inline-flex ">
                    <div className=" mr-5 text-center align-middle">
                        <img 
                        className="w-5 inline-block align-middle"
                        alt="view"
                        src={view}/>
                        <span className="inline-block align-middle">{article_info.view_count}</span>
                    </div>
                    <div className="mr-5 text-center">
                        <img 
                        className="w-5 inline"
                        alt="fav"
                        src={favourite}/>
                        <span className="inline-block align-middle">{article_info.collect_count}</span>
                    </div>                    
                    <div className="mr-5 text-center">
                        <img 
                        className="w-5 inline"
                        alt="comment"
                        src={comment}/>
                        <span className="inline-block align-middle">{article_info.comment_count}</span>
                    </div>                
                    </div>
            </div>
        </div>
        </Link>
    )
}
export default Card;
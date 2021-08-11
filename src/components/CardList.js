
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { getArticles } from '../api'
import view from './asset/view.png'; 
import favourite from './asset/favourite.png'; 
import comment from './asset/comment.png';
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
const CardList = ({condition}) =>{
    const [articleList, setArticleList] = useState();
    useEffect(() =>{
        getArticles(condition.categoryId, condition.sortBy, 0, 10).then((value) =>{
            let array = []
            let arr = value.data.articles;
            let indexSet = []
            for (var i = 0; i < arr.length; i++) {
                if (indexSet.indexOf(arr[i].article_id) === -1) {
                    array.push(arr[i])
                    indexSet.push(arr[i].article_id)
                }
            }
            return array;
        }).then((value)=>{
            setArticleList( value.map(article => {
                    return <Card key={article.article_id} article={article}></Card>
            }));
            console.log(value.data)
            console.log(articleList)
        })
    },[condition])
    return (
        <div className="flex flex-col bg-white overflow-hidden">{articleList}</div>
    )
}

export default CardList;
import Comment from './Comment'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from '../api';
const Article = () =>{
    let {id} = useParams();
    const [article, setArticle] = useState({});
    useEffect(() =>{
        getArticleById(id).then((res) =>{
            setArticle(res.data.article);
            console.log("article:",article)
        })
    },[id,article])
    return (
        article.author_user_info ? 
        (<div className="flex flex-col justify-center items-center max-w-min">
        <div className="w-screen mt-10 mx-4 article px-7 bg-white pt-4 mb-4 max-w-screen-tablet">
            <div className="author flex align-center justify-between align-center my-4">
                <div className="flex divide-x ">
                <img className="mr-4 bg-cover rounded-full w-10 h-10 " 
                    alt="user_avatar"
                    src={article.author_user_info.avatar_large}></img>
                <div className="pl-4 flex flex-col justify-center">
                    <div className="text-black font-bold">{article.author_user_info.user_name}</div>
                    <div className="text-gray-300">2019年09月18日</div>
                </div>
                </div>
                <button className="float-right bg-white border text-blue border-blue-300 rounded px-4">关注</button>
            </div>
            <div className="article-container my-8">
                <img className="my-8 w-screen" alt="img" src={article.article_info.cover_image}></img>
                <div className="my-8 article-title text-black font-bold text-2xl">
                    {article.article_info.title}
                </div>
                {/* <article >
                {article.article_content}
                </article> */}
                <div 
                className="prose article-content my-8 py-4 leading-loose"
                dangerouslySetInnerHTML={{ __html: article.article_content }} ></div>
            </div>
        </div>
        <Comment></Comment>
        </div>):(
            <div className="flex flex-col justify-center items-center">
                <div className="mt-10 mx-4 article px-7 bg-white pt-4 mb-4 max-w-screen-tablet">
                    <Comment></Comment>
                </div>
            </div>
        )
    )
}
export default Article;
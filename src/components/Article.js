import Comment from './Comment'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from '../api';
import CommentList from './CommentList';
import CommentL from './CommentBk';
const Article = () =>{
    let {id} = useParams();
    const [article, setArticle] = useState({});
    useEffect(() =>{
        getArticleById(id).then((res) =>{
            setArticle(res.data.article);
            // console.log("article:",article)
        })
    },[id,article])
    return (
        article.author_user_info ? 
        (
        <div className="flex flex-col justify-center items-center mobile:max-w-min">
            <div className="w-screen mt-8 mx-4 article mobile:px-7 px-16 bg-white pt-4 max-w-screen-tablet">
                <div className="author flex items-center justify-between my-4">
                    <div className="flex divide-x ">
                    <img className="mr-4 bg-cover rounded-full w-10 h-10 " 
                        alt="user_avatar"
                        src={article.author_user_info.avatar_large}></img>
                    <div className="pl-4 flex flex-col justify-center">
                        <div className="text-black font-bold">{article.author_user_info.user_name}</div>
                        <div className="text-gray-300">2019年09月18日</div>
                    </div>
                    </div>
                    <div>
                    <button className="float-right bg-white border text-blue border-blue-300 rounded px-4 py-1">关注</button>
                    </div>
                </div>
                <div className="article-container my-8">
                    <img className="my-8 w-screen" alt="img" src={article.article_info.cover_image}></img>
                    <div className="my-8 article-title text-black font-bold text-2xl">
                        {article.article_info.title}
                    </div>
                    {/* <article >
                    {article.article_content}
                    </article> */}
                    <div className="article-content my-8 py-4 leading-loose"
                    dangerouslySetInnerHTML={{ __html: article.article_content }} ></div>
                </div>
            </div>
            <div className="divider w-screen bg-white max-w-screen-tablet"><div className="m-auto border-t border-gray-200 w-3/4 h-0"></div></div>
            <div className="bg-white w-screen max-w-screen-tablet">
                <div><span className="inline-block mx-7 mt-7 text-lg">文章分类</span><span className="bg-gray-100 rounded-full px-4 py-1">{article.category_info.first_category_name}</span></div>
                <div><span className="inline-block mx-7 mt-4 mb-7 text-lg">文章标签</span><span className="bg-gray-100 rounded-full px-4 py-1">{article.category_info.second_category_name}</span></div>
            </div>
            <div className="divider w-screen bg-white max-w-screen-tablet"><div className="m-auto border-t border-gray-200 w-3/4 h-0"></div></div>
            <CommentList></CommentList>
        </div>):(
            <div className="flex flex-col justify-center items-center">
                <div className="mt-10 mx-4 article px-7 bg-white pt-4 mb-4 max-w-screen-tablet">
                    <CommentList></CommentList>
                </div>
            </div>
        )
    )
}
export default Article;
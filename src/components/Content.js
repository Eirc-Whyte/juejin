
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { getArticles } from '../api'

const Card = ({article})=>{
    let {article_id, article_info} = article;
    return (
        <Link to={`/article/${article_id}`}>
        <div className="content-box hover:bg-gray-50 px-7 max-w-screen-tablet">
            <div className="meta-box inline-flex pt-4 align-middle justify-between">
                <div className="user-message pr-2">Sam</div>
                <div className="text-grey date px-2">8小时前</div>
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
                <ul className="action-list inline-flex items-center">
                        <li className="item view mr-5">
                            <img 
                            className="w-5 inline"
                            alt="view"
                            src=""/>
                            <span>1221</span>
                        </li>
                        <li className="item like mr-5"><i href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png"></i><span>1221</span></li>
                        <li className="item comment mr-5"><i href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png"></i><span>1221</span></li>
                    </ul>
                
            </div>
        </div>
        </Link>
    )
}
const CardList = ({condition}) =>{
    const [articleList, setArticleList] = useState([]);
    useEffect(() =>{
        getArticles(condition.categoryId, condition.sortBy, 0, 10).then((value) =>{
            setArticleList(value.data.articles);
            console.log(value.data)
        })
    },[condition])
    return (
        <div className="flex flex-col bg-white">{
            articleList.map(article => {
                return <Card key={article.article_info.article_id} article={article}></Card>
        })}</div>
    )
}
const Sidebar = ()=>{
    return(
        <aside className="mobile:hidden flex flex-col mx-4">
            <div className="bg-white p-4 mb-6">sidebar1</div>
            <div className="bg-white p-4 mb-6">sidebar2</div>
            <div className="bg-white p-4 mb-6">sidebar3</div>
        </aside>
    )
}
const SecondNav = () =>{
    return(
        <div className="text-xl px-5 py-4 mx-4 border-b flex flex-start divide-x bg-white text-grey">
            <div className="px-5 hover:text-blue cursor-pointer">热门</div>
            <div className="px-5 hover:text-blue cursor-pointer">最新</div>
            <div className="px-5 hover:text-blue cursor-pointer">热榜</div>
        </div>
    )
}
const Content = ({condition})=>{
    const ref = useRef();
    useEffect(() =>{
        if(condition.categoryId === 0){
            ref.current.className = "mt-6 flex justify-center transition-all";
        }else{
            ref.current.className = "mt-20 flex justify-center transition-all";
        }
    },[condition])
    
    return (
        <main className="mt-20 flex justify-center" ref={ref}>
            <div>
            {/* <SecondNav/> */}
            <CardList condition={condition}/>
            </div>
            <Sidebar/>
        </main>
    )
}
export default Content;
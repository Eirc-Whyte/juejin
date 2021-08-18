
import React, { useState, useEffect, useRef } from 'react';
import CardList from './CardList';
import ContentList from './ContentList';
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
        <main className="mt-20 flex justify-center w-screen" ref={ref}>
            {/* <SecondNav/> */}
            <ContentList condition={condition}/>
            <Sidebar/>
        </main>
    )
}
export default Content;
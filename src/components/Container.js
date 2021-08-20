import ContentList from './ContentList';
import HistoryList from './HistoryList';
import Nav from './Nav';
import { useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
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
const Container = ({condition,onConditionChange}) =>{
    const ref = useRef();
    let { cate } = useParams();
    useEffect(() =>{
        if(condition.categoryId === 0){
            ref.current.className = "mt-6 flex justify-center transition-all";
        }else{
            ref.current.className = "mt-20 flex justify-center transition-all";
        }
    },[condition])
    return (
    <div className="">
        <Nav cid={condition.categoryId} condition={condition} onConditionChange={onConditionChange} />
        <main className="mt-20 flex justify-center w-screen items-start" ref={ref}>
            {cate === "his" ? <HistoryList/> : <ContentList condition={condition}/>}
            <Sidebar/>
        </main>
    </div>
    );
}
export default Container;
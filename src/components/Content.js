import ContentList from './ContentList';
import HistoryList from './HistoryList';
import Nav from './Nav';
import { useEffect, useRef } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import Sidebar  from './SideBar';
/*
    控制渲染文章列表/历史记录
*/
const Container = ({ condition, onConditionChange }) => {
    useEffect(()=>{
        // 切换tab则滚动到最顶
　　　　window.scrollTo(0,0)
　　},[condition]);

    const ref = useRef();
    let { cate } = useParams();
    useEffect(() => {
        // 控制二级菜单显示
        if (condition.categoryId === 0) {
            ref.current.className = "mt-6 flex justify-center transition-all";
        } else {
            ref.current.className = "mt-20 flex justify-center transition-all";
        }
    }, [condition])
    return (
        <div>
            <Nav cid={condition.categoryId} condition={condition} onConditionChange={onConditionChange} />
            <main className="mt-20 flex justify-center w-screen items-start" ref={ref}>
                {cate === "his" ? <HistoryList /> : <ContentList condition={condition} />}
                <Sidebar />
            </main>
        </div>
    );
}
export default Container;
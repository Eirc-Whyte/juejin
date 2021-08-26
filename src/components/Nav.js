import { getCategories } from '../api';
import React, { useState,useEffect, useRef } from 'react';
/*
    顶部二级菜单
*/
const Nav = ({cid,condition,onConditionChange}) => {
    const [categories, setCategories] = useState([]);
    const [onselection, setOnSelection] = useState([]);
    const ref = useRef();
    // 先获取所有分类
    useEffect(() =>{
        getCategories().then((value) => {
            setCategories(value.data.categories);
        });
    },[])
    // 展开nav，并将当前分类下二级分类更新到nav
    useEffect(() =>{
        if(cid === 0){
            ref.current.className = ref.current.className.replace('top-20','top-4');
        }else{
            ref.current.className = ref.current.className.replace('top-4','top-20');
            let newSelection = [];
            if(categories[cid]){
                categories[cid].children.forEach((category,index) =>{
                    newSelection.push("text-grey");
                })
                setOnSelection(newSelection);
            }
        }
    },[cid,categories]);
    // 处理选中事件
    const onHandleClick = (id) =>{
        if(parseInt(id) !== condition.tag){
            onConditionChange({...condition, tag: parseInt(id)})
            setOnSelection((pre)=>(pre.map((item,index) => {
                return item = index === parseInt(id) ? "text-blue":"text-grey"
            })))
        }
    }
    return (
    <nav className="bg-white px-4 fixed w-screen top-20 transition-all transform mobile:text-left text-center z-20" ref={ref}>
        <ul className="mx-auto h-14 inline-flex text-left justify-start items-center shadow-sm">
            {
            (categories[cid] !== undefined && cid !== 0 ) ? categories[cid].children.map((item,index) => 
                // <a href={`/categories/${item.category_id}`} key={item.category_id}>
                <li 
                onClick={()=>onHandleClick(item.category_id)}
                key={item.category_id} 
                className={`${onselection[index]} rounded-full bg-gray-100 mobile:mx-2 mx-4 text-lg hover:text-blue cursor-pointer px-4 z-50`}>
                    {item.category_name}
                </li>
                // </a>
            ) : "" }
        </ul>
    </nav>
    );
}
export default Nav;
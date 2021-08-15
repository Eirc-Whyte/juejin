import { getCategories } from '../api';
import React, { useState,useEffect, useRef } from 'react';
const Nav = ({cid,condition,onConditionChange}) => {
    const [categories, setCategories] = useState([]);
    const [onselection, setOnSelection] = useState([]);
    const ref = useRef();
    useEffect(() =>{
        getCategories().then((value) => {
            setCategories(value.data.categories);
        });
    },[])
    useEffect(() =>{
        if(cid === 0){
            ref.current.className = "bg-white px-4 fixed w-screen top-4 transition-all transform mobile:text-left text-center";
        }else{
            ref.current.className = "bg-white px-4 fixed w-screen top-20 transition-all transform mobile:text-left text-center";
            let newSelection = [];
            categories[cid].children.forEach((category,index) =>{
                newSelection.push("text-grey");
            })
            setOnSelection(newSelection);
        }
    },[cid]);
    const onHandleClick = (id) =>{
        if(parseInt(id) !== condition.tag){
            onConditionChange({...condition, tag: parseInt(id)})
            setOnSelection((pre)=>(pre.map((item,index) => {
                return item = index === parseInt(id) ? "text-blue":"text-grey"
            })))
            // console.log(categories)
        }
    }
    return (
    <nav ref={ref}>
        <ul className="mx-auto h-14 inline-flex text-left justify-start items-center shadow-sm">
            {
            (categories[cid] !== undefined && cid !== 0 ) ? categories[cid].children.map((item,index) => 
                // <a href={`/categories/${item.category_id}`} key={item.category_id}>
                <li 
                onClick={()=>onHandleClick(item.category_id)}
                key={item.category_id} 
                className={`${onselection[index]} rounded-full bg-gray-100 mobile:mx-2 mx-4 text-lg hover:text-blue cursor-pointer px-4`}>
                    {item.category_name}
                </li>
                // </a>
            ) : "" }
        </ul>
    </nav>
    );
}
export default Nav;
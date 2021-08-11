import { getCategories } from '../api';
import React, { useState,useEffect, useRef } from 'react';
const Nav = ({cid}) => {
    const [categories, setCategories] = useState([]);
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
        }
    },[cid])
    return (
    <nav ref={ref}>
        <ul className="mx-auto h-14 inline-flex text-left justify-start items-center shadow-sm">
            {(categories.length > 0 && cid !== 0 ) ? categories[cid].children.map(item => 
                <a href={`/categories/${item.category_id}`} key={item.category_id}>
                    <li className="rounded-full bg-gray-100 mobile:mx-2 mx-4 text-lg hover:text-blue cursor-pointer text-grey px-4">
                        {item.category_name}
                    </li>
                </a>
            ) : "" }
        </ul>
    </nav>
    );
}
export default Nav;
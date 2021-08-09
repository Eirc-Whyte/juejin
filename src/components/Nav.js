import { getCategories } from '../api';
import React, { useState,useEffect } from 'react';
const NavList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() =>{
        getCategories().then((value) => {
            setCategories(value.data.categories);
        });
    })
    
    return (
    <nav className="bg-white fixed w-screen top-20 mobile:top-24 transition-all transform text-center">
    <ul className="mx-auto h-14 inline-flex text-left items-center shadow-sm">{
        categories.map(item => 
            <a href={`/categories/${item.category_id}`} key={item.category_id}>
                <li className="text-lg hover:text-blue cursor-pointer text-grey px-4">
                    {item.category_name}
                </li>
            </a>
        )}
    </ul>
    </nav>
    );
}
export default NavList;
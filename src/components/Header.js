import { getCategories } from '../api';
import { useState,useEffect,useRef,useCallback } from 'react';

const Searchbar = ({condition, onConditionChange}) =>{
    const [input, setInput] = useState(null);
    const [searchHisList, setSearchList] = useState([]);
    const searchHistory = useRef(null);
    // const onSearch = useCallback((e) =>{
    //     console.log(e.key)
        
    // },[searchHisList, input])
    // useEffect(() =>{
    //     document.addEventListener('keydown',onSearch);
    //     return document.removeEventListener('keydown',onSearch);
    // })
    const showHisList = (e)=>{
        let className = [];
        searchHistory && (className = searchHistory.current.className.split(' '))
        className.shift()
        searchHistory && (searchHistory.current.className = className.join(''))
    }
    const hiddenHisList = (e)=>{
        searchHistory && (searchHistory.current.className = ['hidden', ...searchHistory.current.className.split(' ')].join(''))
    }
    return (
        <ul className="mobile:hidden flex flex-auto mx-8 overflow-hidden items-start">
            <li className="rounded flex flex-col relative mt-4">
                <div className="rounded flex m-px bg-gray-100 focus-within:outline-blue">
                    <input 
                        className="search-input bg-transparent w-48 py-3 pl-4 transition-all focus:outline-none" 
                        type="search" 
                        onChange={(e)=>{
                            setInput(e.target.value);
                        }}
                        value={input}
                        onFocus={showHisList}
                        onBlur={hiddenHisList}
                        onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                                onConditionChange({...condition, filter:input})
                                setSearchList([...new Set([...searchHisList, input])])
                                console.log(input)
                            }
                        }}
                        placeholder="探索掘金"></input>
                    <img 
                        className="px-2 cursor-pointer" 
                        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/8f68a2223e9650f14d6e6781cdcd717a.svg" 
                        alt="search"
                        onClick={(e)=>{
                            onConditionChange({...condition, filter:input});
                            console.log(input)
                            setSearchList([...new Set([...searchHisList, input])])
                        }}/>
                </div>
                <div className="hidden search-history flex-col z-20 w-full bg-white divide-y border border-gray-100" ref={searchHistory}>
                    <div className="flex justify-between px-4 py-2 bg-white">
                        <span className="text-grey">搜索历史</span>
                        <span className="cursor-pointer hover:text-blue" onClick={(e)=>{setSearchList([])}}>清空</span>
                    </div>
                    <div className="divider bg-white w-full"><div className="m-auto border-t border-gray-100 w-5/6 h-0"></div></div>
                    <ul className="flex flex-col bg-white cursor-pointer">{
                        searchHisList.map(item => {
                            return <li 
                                    className="px-4 py-2 hover:bg-gray-200 " 
                                    key={item}
                                    onClick={(e)=>{
                                        setInput(item)
                                        hiddenHisList(e)
                                    }}>{item}</li>
                    })}
                    </ul>
                </div>
            </li>
            <li className="flex flex-none flex-around px-4 items-center h-20">
                <button className="bg-blue-100 text-blue text-lg py-1 px-5 rounded mx-8 transition-all hover:text-sky-blue hover:bg-blue-500">创作者中心</button>
                <div className="relative bg-blue-500 text-white text-lg rounded flex cursor-pointer divide-x divide-white divide-opacity-40">
                    <button className="h-full text-lg py-1 px-4 transition-all hover:bg-blue-600 rounded">写文章</button>
                    <div className="px-4 flex transition-all hover:bg-blue-600 rounded"> 
                        <img className="w-4 " src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/fd92e44e46bf428b65aa0dc78366a82a.svg" alt="more"></img>
                    </div>
                    <ul className="hidden absolute top-full left-0 right-0 z-10">
                        <li className="mx-auto p-4 bg-white hover:bg-gray-50 text-blue border border-blue-200">发布沸点</li>
                    </ul>
                </div>
            </li>
        </ul>
    ) 
}
const UserInfo = ()=>{
    return(
        <ul className="mobile:hidden">
            <li className="flex flex-around items-center h-20">
                <a className="px-4" href="/alert">
                    <img alt="alert" src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/c7f91fad712592633383df6aa430c93c.svg"/>
                </a>
                <a className="pl-4 " href="/profile">
                    <img className="bg-cover rounded-full w-10 h-10 " alt="user_avatar" src="https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/e85c76d2bdac57930f1135a96c090c83~300x300.image"></img>
                </a>
            </li>
        </ul>
    )
}
const Events = ()=>{
    return (
        <div className="cursor-pointer" >
            <svg width="127" height="21" viewBox="0 0 127 21" fill="none" xmlns="http://www.w3.org/2000/svg"data-v-4c29ee1a="">
                <g className="fill-grey hover:fill-blue" clip-path="url(#clip0)" data-v-4c29ee1a="">
                    <path d="M97.2408 10.3547H84.0062V12.189H97.2408V10.3547Z" data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M83.0251 15.4666H86.4611L83.8356 20.4767H85.3231H86.1831H95.064H96.3354H97.4115L95.5236 16.1339H93.1761L94.2673 18.6424H87.145L88.8086 15.4666H98.2219V13.6323H83.0251V15.4666Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M86.7734 7.52802H94.4736L95.9996 9.72827H98.3457L95.5469 5.69653H95.0735H93.2008H88.0462H86.4665H85.7001L82.9012 9.72827H85.2474L86.7734 7.52802Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3668 8.10736H30.6661V6.21533H17.3751V8.10736H19.7061V11.9602H16.5V13.8522H19.7061V14.8278L18.0866 20.453H20.2221L21.8417 14.8278V13.8522H26.2312V20.4971H28.3668V13.8536H31.5784V11.9616H28.3668V8.10736ZM21.8417 11.9616V8.10874H26.2312V11.9616H21.8417Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M75.6812 5.80957H72.9581L71.8669 8.33319H65.9376V10.3546H70.9931L66.638 20.4298H69.3598L73.7163 10.3546H81.4949V8.33319H74.59L75.6812 5.80957Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M73.4232 11.1926L78.6893 20.3198H81.4124L76.1464 11.1926H73.4232Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.6125 6.22362H62.5375L62.3875 6.49882H57.9829V5.75439H55.8776V6.49882H51.0587V8.33306H55.8776V9.63202H49.9469V11.4663H52.5765L50.3267 15.5916H52.077V20.4297H52.7664H54.1823H61.4669H63.1994H63.5723V14.2087H63.5998V12.3744H54.1561L54.6515 11.4663H64.8616V9.63202H62.7549L64.6125 6.22362ZM54.1809 18.5954V17.3006H61.4656V18.5954H54.1809ZM61.4656 15.5916H54.1809V14.2087H61.4656V15.5916ZM57.9815 8.33306H61.3858L60.6785 9.63202H57.9815V8.33306Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.5926 13.0434V11.2091H38.5865L38.9608 10.1688H48.2572V8.33323H39.6199L40.5831 5.65137H38.4517L37.4884 8.33323H35.8056L36.4729 6.08757H34.658L33.4457 10.1675H34.358H35.2593H36.828L33.1774 20.3349H35.3088L37.6935 13.6956L40.8872 16.5247L36.8789 20.4298H40.4799L42.6967 18.1277L45.296 20.4298H48.2558L44.0603 16.7132L47.5912 13.0461L47.5926 13.0434ZM44.4607 13.0434L42.2976 15.1514L40.5817 13.6323H37.7155L37.9274 13.0434H44.4607Z"   data-v-4c29ee1a=""></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.0394 7.7264L46.2069 5.5H44.0768L44.9079 7.7264H47.0394Z"   data-v-4c29ee1a=""></path>
                </g>
                <g clip-path="url(#clip1)" data-v-4c29ee1a="">
                    <path d="M102.634 9.41109V8.40738L105.813 5.06039C106.08 4.7818 106.361 4.45777 106.382 4.02309C106.416 3.3533 105.914 2.806 105.199 2.806C104.452 2.806 103.972 3.37503 103.948 4.04483H102.5C102.522 2.36935 103.816 1.5 105.201 1.5C106.541 1.5 107.835 2.32588 107.835 3.98753C107.835 4.71265 107.489 5.30341 106.874 5.93961L104.887 8.00432H107.843L107.831 9.41109H102.634Z" fill="#1E80FF" data-v-4c29ee1a=""></path>
                    <path d="M109.228 5.51679C109.228 3.06285 110.443 1.5 112.407 1.5C114.392 1.5 115.598 3.07273 115.598 5.50494C115.598 7.93714 114.38 9.5 112.407 9.5C110.399 9.5 109.228 7.96085 109.228 5.51679ZM114.147 5.50494C114.147 3.96579 113.477 2.90479 112.407 2.90479C111.314 2.90479 110.678 3.98753 110.678 5.51482C110.678 7.11126 111.369 8.09323 112.407 8.09323C113.511 8.09323 114.147 7.02235 114.147 5.50494Z" fill="#1E80FF" data-v-4c29ee1a=""></path>
                    <path d="M117.115 9.41109V8.40738L120.294 5.06039C120.561 4.7818 120.841 4.45777 120.863 4.02309C120.897 3.3533 120.395 2.806 119.68 2.806C118.933 2.806 118.453 3.37503 118.429 4.04483H116.979C117.002 2.36935 118.296 1.5 119.682 1.5C121.021 1.5 122.315 2.32588 122.315 3.98753C122.315 4.71265 121.969 5.30341 121.355 5.93961L119.369 8.00432H122.325L122.313 9.41109H117.115Z" fill="#1E80FF" data-v-4c29ee1a=""></path>
                    <path d="M125.461 9.41115V2.98389H123.631V1.60083H126.911V9.41115H125.461Z" fill="#1E80FF" data-v-4c29ee1a=""></path>
                </g>
                <path d="M10 1L12.5 5L8.5 5.5L7 4L10 1Z" stroke="#6AA1FF" data-v-4c29ee1a=""></path>
                <path d="M8.5 20L1 10L3 8L7.5 11.5M8.5 20L12.5 18.5M8.5 20L7.5 11.5M7.5 11.5L12 11" stroke="#6AA1FF" data-v-4c29ee1a=""></path>
                <path d="M4.5 5.5L8 8.5L13 8" stroke="#6AA1FF" data-v-4c29ee1a=""></path><defs data-v-4c29ee1a="">
                    <clipPath id="clip0" data-v-4c29ee1a="">
                        <rect width="81.8457" height="15" fill="white" transform="translate(16.5 5.5)" data-v-4c29ee1a=""></rect>
                    </clipPath>
                    <clipPath id="clip1" data-v-4c29ee1a="">
                        <rect width="24.411" height="8" fill="white" transform="translate(102.5 1.5)" data-v-4c29ee1a=""></rect>
                    </clipPath></defs>
                </svg>
            </div>
    )
}
const Header = ({condition, onConditionChange}) => {
    const [categories, setCategories] = useState([]);
    const [onselection, setOnSelection] = useState([]);
    useEffect(() =>{
        getCategories().then((value) => {
            setCategories(value.data.categories);
            let newSelection = [];
            value.data.categories.forEach((category,index) =>{
                newSelection.push("text-grey");
            })
            newSelection[0] = "text-blue";
            setOnSelection(newSelection);
        });
    },[])
    const onHandleClick = (id) =>{
        if(parseInt(id) !== condition.categoryId || condition.tag !== "all"){
            onConditionChange({...condition, categoryId: parseInt(id), tag:"all"})
            setOnSelection((pre)=>(pre.map((item,index) => {
                return item = index === parseInt(id) ? "text-blue":"text-grey"
            })))
        }
    }
    return (
        <div className="h-20">
            <header className="px-8 mobile:pl-4 fixed inline-flex mx-auto justify-center mobile:justify-start items-start mobile:items-center top-0 border-b w-screen h-20 z-10 bg-white transition-all transform">
                {/* <div className=""> */}
                <img
                    className="mobile:hidden mx-4 h-20 mobile:h-14"
                    alt="logo"
                    width={82}
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/dcec27cc6ece0eb5bb217e62e6bec104.svg" />
                <img
                    className="hidden mobile:block mr-2 h-20 mobile:h-14"
                    alt="logo-small"
                    width={30}
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg"
                ></img>
                <ul className="flex justify-start items-center h-20 overflow-auto">{
                    categories.map((item,index) =>
                        <li 
                        key={item.category_id} 
                        onClick={()=> onHandleClick(item.category_id)} 
                        className={`flex-none hover:text-blue cursor-pointer text-center px-3 text-xl ${onselection[parseInt(item.category_id)]}`}>
                            {item.category_name}
                        </li>
                    )}
                </ul>
                <Searchbar condition={condition} onConditionChange={onConditionChange}></Searchbar>
                <UserInfo></UserInfo>
                {/* </div> */}
            </header>
        </div>
    )
}

export default Header;
import { useState, useEffect, useRef, useCallback } from 'react';

/*
    搜索组件，主要负责搜索功能
*/
const Searchbar = ({ condition, onConditionChange }) => {
    // 输入框内容存到input中
    const [input, setInput] = useState("");
    // 搜索历史列表
    const [searchHisList, setSearchList] = useState([]);
    // 两个ref控制dom行为
    const searchHistory = useRef(null);
    const bar = useRef(null);
    // doSearch开关控制搜索执行
    const [doSearch, setDoSearch] = useState(false);
    // 显示搜索历史
    const showHisList = (e) => {
        bar && (bar.current.className = bar.current.className + " w-full")
        bar && (bar.current.className = bar.current.className.replaceAll(' max-w-max',''))
        searchHistory && (searchHistory.current.className = searchHistory.current.className.replaceAll('hidden',''))
    }
    // 隐藏搜索历史
    const hiddenHisList = (e) => {
        bar && (bar.current.className = bar.current.className.replace(' w-full',''))
        bar && (bar.current.className = bar.current.className + " max-w-max")
        if(searchHistory && searchHistory.current.className.indexOf('hidden') === -1 ){
            searchHistory.current.className = searchHistory.current.className + " hidden";
        }
    }
    // 用doSearch开关控制搜索执行
    useEffect(() => {
        if(doSearch){
            onConditionChange({ ...condition, filter: input.trim().split(' ').filter((item) => item !== '') });
            setSearchList([...new Set([...searchHisList, input])])
            // 关闭搜索
            setDoSearch(false);
            hiddenHisList()
        }
    },[input, doSearch])
    return (
        <ul className="mobile:hidden flex mx-8 overflow-hidden items-start">
            <li className="transition-width transform rounded flex flex-col relative mt-4 flex-grow flex-shrink-0 max-w-max" ref={bar}>
                <div className="rounded flex justify-between m-px bg-gray-100 focus-within:outline-blue ">
                    <input
                        className="bg-transparent py-3 pl-4 focus:outline-none focus:w-full"
                        type="search"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        value={input}
                        onFocus={showHisList}
                        onBlur={hiddenHisList}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setDoSearch(true)
                            }
                        }}
                        placeholder="探索掘金"></input>
                    <img
                        className="transform transition-all px-2 cursor-pointer"
                        src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/8f68a2223e9650f14d6e6781cdcd717a.svg"
                        alt="search"
                        onMouseDown={(e) => {
                            setDoSearch(true)
                        }} />
                </div>
                <div className="search-history flex-col z-20 w-full bg-white border border-gray-100 shadow-lg hidden" ref={searchHistory}>
                    <div className="flex justify-between px-4 py-2 bg-white">
                        <span className="text-grey">搜索历史</span>
                        <span className="cursor-pointer hover:text-blue" onMouseDown ={(e) => { setSearchList([]) }}>清空</span>
                    </div>
                    <div className="divider bg-white w-full"><div className="m-auto border-t border-gray-100 w-5/6 h-0"></div></div>
                    <ul className="flex flex-col bg-white cursor-pointer">{
                        searchHisList.map(item => {
                            return <li
                                className="px-4 py-2 hover:bg-gray-200 "
                                key={item}
                                onMouseDown={(e) => {
                                    setInput(item)
                                    setDoSearch(true)
                                }}>{item}</li>
                        })}
                    </ul>
                </div>
            </li>
            <li className="flex flex-grow-0 flex-none px-4 items-center h-20">
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
export default Searchbar;
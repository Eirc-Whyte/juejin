// import {getArticles} from '../pages/api';
const Card = ()=>{
    return (
        <div className="content-box hover:bg-gray-50 px-7">
            <div className="meta-box inline-flex pt-4 align-middle justify-between">
                <div className="user-message pr-2">Sam</div>
                <div className="text-grey date px-2">8小时前</div>
                <div className="text-grey tag-list flex divide-x ">
                    <a className="px-2 cursor-pointer">前端</a>
                    <a className="px-2 cursor-pointer">javascript</a>
                </div>
            </div>
            <div className="content-wrapper flex my-3 pb-4 border-b">
                <div className="content-main flex flex-col flex-auto justify-around pb-4">
                    <a 
                    className="title text-xl mb-2 font-bold"
                    href="/post/xx">
                        ECMAScript 的原始值包装类型——Boolean讲解
                    </a>
                    <div className="abstract text-base text-grey mb-2">daladaladalada</div>
                    <ul className="action-list inline-flex items-center">
                        <li className="item view mr-5">
                            <img 
                            className="w-5 inline"
                            alt="view"
                            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png"/>
                            <span>1221</span>
                        </li>
                        <li className="item like mr-5"><i href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png"></i><span>1221</span></li>
                        <li className="item comment mr-5"><i href="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/view.1eda8fa.png"></i><span>1221</span></li>
                    </ul>
                </div>
                <img 
                    height={80}
                    width={120}
                    className="ml-8"
                    alt="看完还不懂JavaScript执行机制(EventLoop)，你来捶我"
                    src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94cf506962464918abdf7db02eb2a52d~tplv-k3u1fbpfcp-no-mark:270:270:270:180.awebp"/>
            </div>
        </div>
    )
}
const CardList = () =>{
    return (
    <div className="flex-auto bg-white mx-4 min-w-700">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>)
}
const Sidebar = ()=>{
    return(
        <aside className="flex flex-col mx-4 min-w-20r">
            <div className="bg-white p-4 mb-6">sidebar1</div>
            <div className="bg-white p-4 mb-6">sidebar2</div>
            <div className="bg-white p-4 mb-6">sidebar3</div>
        </aside>
    )
}
const SecondNav = () =>{

    return(
        <div className="text-xl px-5 py-4 mx-4 min-w-700 max-w-screen-lg border-b flex flex-start divide-x bg-white text-grey">
            <div className="px-5 hover:text-blue cursor-pointer">热门</div>
            <div className="px-5 hover:text-blue cursor-pointer">最新</div>
            <div className="px-5 hover:text-blue cursor-pointer">热榜</div>
        </div>
    )
}
const Content = ()=>{
    return (
        <main className="max-w-screen-lg mx-auto mt-20 flex justify-between">
            <div>
            <SecondNav/>
            <CardList/>
            </div>
            <Sidebar/>
        </main>
        
    )
}
export default Content;
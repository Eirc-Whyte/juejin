/*
    侧边栏，无状态组件
*/

const Sidebar = () => {
    return (
        <aside className="mobile:hidden flex flex-col mx-4 w-1/6">
            <div className="bg-white px-6 mb-6 py-4">
                <div className="flex justify-between py-2">
                    <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-4b54a26a="" fillRule="evenodd" clipRule="evenodd" d="M8 2C8 1.72386 7.77614 1.5 7.5 1.5H6.5C6.22386 1.5 6 1.72386 6 2L5.9995 3H3C2.44772 3 2 3.47259 2 4.05556V7H22V4.05556C22 3.47259 21.5523 3 21 3H18V2C18 1.72386 17.7761 1.5 17.5 1.5H16.5C16.2239 1.5 16 1.72386 16 2V3H8V2ZM22 8.5H2V20.9444C2 21.5274 2.44772 22 3 22H21C21.5523 22 22 21.5274 22 20.9444V8.5Z" fill="#FFCF8B"></path><rect data-v-4b54a26a="" x="5" y="12" width="3" height="2" rx="1" fill="#FF7D00"></rect><rect data-v-4b54a26a="" x="10.5" y="12" width="3" height="2" rx="1" fill="#FF7D00"></rect><rect data-v-4b54a26a="" x="5" y="16" width="3" height="2" rx="1" fill="#FF7D00"></rect><rect data-v-4b54a26a="" x="10.5" y="16" width="3" height="2" rx="1" fill="#FF7D00"></rect><rect data-v-4b54a26a="" x="16" y="12" width="3" height="2" rx="1" fill="#FF7D00"></rect><rect data-v-4b54a26a="" x="16" y="16" width="3" height="2" rx="1" fill="#FF7D00"></rect></svg>
                        <span className="text-xl ml-4">下午好!</span>
                    </div>
                    <button className="rounded-full w-20 h-10 text-blue border border-blue-400 px-2 hover:bg-blue-100 transition">去签到</button>
                </div>
                <div className="flex items-center justify-center py-2">连续签到赢掘金惊喜好礼</div>
            </div>
            <div className="bg-white mb-6">
                <img className="w-full h-full" src={"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16efe4b4519f4fedab8e3b55c90e482f~tplv-k3u1fbpfcp-no-mark:540:450:0:0.awebp"}></img>
            </div>
            <div className="bg-white p-6 mb-6 flex items-center">
                <img className="w-16 h-16" src={"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.e8f8c43.png"}/>
                <div className="mx-4">
                    <div className="text-lg pb-2">
                        下载掘金客户端
                    </div>
                    <div className="opacity-50 text-sm">
                        一个帮助开发者成长的社区
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar;
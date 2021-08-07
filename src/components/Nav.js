
const navList = () =>{
    let keys = 0;
    function navItem(link, name){
        this.key = keys++;
        this.name = name;
        this.link = link;
    }
    const listContent = [
        new navItem('/recommended','推荐'),
        new navItem('/following','关注'),
        new navItem('/backend','后端'),
        new navItem('/fontend','前端'),
        new navItem('/android','Android'),
        new navItem('/ios','IOS')
    ];
    return (
    <nav className="bg-white fixed w-full top-20 transition-all transform">
    <ul className="mx-auto max-w-screen-lg h-14 flex text-left items-center shadow-sm">
        {listContent.map(item => 
        <a href={item.link} key={item.key}>
        <li 
        className="text-lg hover:text-blue cursor-pointer text-grey px-4">
            {item.name}
        </li>
        </a>
        )}
    </ul>
    </nav>
    );
}
export default navList;
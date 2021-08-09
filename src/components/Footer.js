const Footer = () =>{
    let keys = 0;
    function navItem(link, name){
        this.key = keys++;
        this.name = name;
        this.link = link;
    }
    const listContent = [
        new navItem('/hot','热门'),
        new navItem('/newest','最新'),
        new navItem('/history','历史'),
    ];
    return (
    <nav className="bg-white fixed w-screen bottom-0 transition-all transform text-center">
        <ul className="mx-auto h-14 inline-flex text-left items-center shadow-sm divide-x">
            {listContent.map(item => 
            <a href={item.link} key={item.key}>
            <li 
            className="text-lg hover:text-blue cursor-pointer text-grey px-8">
                {item.name}
            </li>
            </a>
            )}
        </ul>
    </nav>
    );
}
export default Footer;
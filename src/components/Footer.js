const Footer = ({condition, onConditionChange}) =>{
    function navItem(link, name){
        this.name = name;
        this.link = link;
    }
    const listContent = [
        new navItem('hot','热门'),
        new navItem('new','最新'),
        new navItem('his','历史'),
    ];
    return (
    <nav className="bg-white fixed w-screen bottom-0 transition-all transform text-center">
        <ul className="mx-auto h-14 inline-flex text-left items-center shadow-sm divide-x">
            {listContent.map(item => 
            <li 
                // key = {item.link}
                onClick={()=> onConditionChange({...condition, sortBy: item.link})} 
                className="text-lg hover:text-blue cursor-pointer text-grey px-8">
                {item.name}
            </li>
            )}
        </ul>
    </nav>
    );
}
export default Footer;
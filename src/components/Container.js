import Content from "./Content";
import Nav from './Nav';
import {useParams} from 'react-router-dom';
const Container = () =>{
    let {cid} = useParams();
    return (
    <div className="relative">
        <Nav/>
        <Content cid={cid}/>
    </div>
    );
}
export default Container;
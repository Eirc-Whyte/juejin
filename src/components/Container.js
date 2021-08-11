import Content from "./Content";
import Nav from './Nav';
import {useParams} from 'react-router-dom';
const Container = ({condition}) =>{
    // let {cid} = useParams();
    return (
    <div className="relative">
        <Nav cid={condition.categoryId}/>
        <Content condition={condition}/>
    </div>
    );
}
export default Container;
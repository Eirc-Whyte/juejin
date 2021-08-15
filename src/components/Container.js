import Content from "./Content";
import Nav from './Nav';
import {useParams} from 'react-router-dom';
const Container = ({condition,onConditionChange}) =>{
    // let {cid} = useParams();
    return (
    <div className="relative">
        <Nav cid={condition.categoryId} condition={condition} onConditionChange={onConditionChange} />
        <Content condition={condition}/>
    </div>
    );
}
export default Container;
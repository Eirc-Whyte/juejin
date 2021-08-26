import Header from './components/Header';
import Container from './components/Content';
import Footer from './components/Footer';
import Article from './components/Article';
import { AppProvider } from "./utils/state"
import ScrollToTop from './utils/ScrollToTop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const pre = useRef(0);
  const barController =  (e)=>{
    let header = document.getElementsByTagName('header')[0];
    let navs = document.getElementsByTagName('nav');
    let nav = null;
    let footer = null;
    if(navs.length > 1){
      nav = navs[0];
      footer = navs[1];
    }else{
      footer = navs[0];
    }
    if(window.pageYOffset > 0 && window.pageYOffset > pre.current){
      // 下滑隐藏
      header.classList.add('-translate-y-20');
      nav && nav.classList.add('-translate-y-20');
      footer.classList.add('translate-y-24');
    } else {
      // 上滑显示
      header.classList.remove('-translate-y-20');
      nav && nav.classList.remove('-translate-y-20');
      footer.classList.remove('translate-y-24');
    }
    pre.current = window.pageYOffset;
  }
  useEffect(()=>{
    window.addEventListener('scroll',barController);
    return ()=>{ window.removeEventListener('scroll',barController) }
  },[])
  /*
    在顶层组件存储当前文章列表的筛选条件
  */
  const [articleFilterCondition, setFilterCondition] = useState({
    categoryId: 0,
    sortBy:'hot',
    tag:'all',
    filter: [],
  });
  const handleConditionChange = (newCondition) => {
    setFilterCondition(newCondition);
  }
  /*
    将localstorage中存储的历史记录提取出来，作为状态管理组件的初始值
  */
  const [initState,setInitialState] = useState({
    history: JSON.parse(window.localStorage.getItem('history') ? window.localStorage.getItem('history') : "[]")
  })
  /*
    定义dispatch函数
  */
  const reducer = (state, action) => {
    if (action.type === "ADD_HIS") {
      // 存储当前历史记录到localstorage
      const newState = { history : [...new Set([...state.history, action.data])] };
      window.localStorage.setItem('history',JSON.stringify(newState.history))
      return newState;
    } 
    if(action.type === "CLEAR_HIS") {
      // 清空历史记录
      window.localStorage.removeItem('history')
      return { history : []}
    }
    else {
      throw new Error();
    }
  }
    return (
      <Router>
        <AppProvider initValue={initState} reducer={reducer}>
          <div className="w-screen">
          <ScrollToTop>
            <Header condition={articleFilterCondition} onConditionChange={handleConditionChange}/>
              <Switch>
                <Route path="/article/:id">
                  <Article />
                </Route>
                <Route path="/category/:cate">
                  <Container condition={articleFilterCondition} onConditionChange={handleConditionChange}/>
                </Route>
                <Redirect to="/category/hot"></Redirect>
              </Switch>
              <Footer condition={articleFilterCondition} onConditionChange={handleConditionChange}/>
          </ScrollToTop>
          </div>
        </AppProvider>
      </Router>
    )
}
export default HomePage;
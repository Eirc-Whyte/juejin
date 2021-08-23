import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import Article from './components/Article';
import { AppProvider } from "./components/state"
import ScrollToTop from './components/ScrollToTop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  window.addEventListener('scroll', (e)=>{
    let header = document.getElementsByTagName('header')[0];//定义一个dom节点为'header'的header变量
    let navs = document.getElementsByTagName('nav');
    let nav = null;
    let footer = null;
    if(navs.length > 1){
      nav = navs[0];
      footer = navs[1];
    }else{
      footer = navs[0];
    }
    if(window.pageYOffset >= 100){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
      header.classList.add('mobile:-translate-y-20');  //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
      header.classList.add('-translate-y-20');
      if(nav !== null) {
        nav.classList.add('mobile:-translate-y-20');
        nav.classList.add('-translate-y-20');
      }
      footer.classList.add('translate-y-24');
    } else {
      header.classList.remove('mobile:-translate-y-20');
      header.classList.remove('-translate-y-20');
      if(nav !== null) {
        nav.classList.remove('mobile:-translate-y-20');
        nav.classList.remove('-translate-y-20');
      }
      footer.classList.remove('translate-y-24');
    }
  });
  const [articleFilterCondition, setFilterCondition] = useState({
    categoryId: 0,
    sortBy:'hot',
    tag:'all',
    filter: '',
  });
  const handleConditionChange = (newCondition) => {
    setFilterCondition(newCondition);
  }
  const [initState,setInitialState] = useState({
    history: JSON.parse(window.localStorage.getItem('history') ? window.localStorage.getItem('history') : "[]")
  })
  const reducer = (state, action) => {
    console.log(state)
    if (action.type === "ADD_HIS") {
      const newState = { history : [...new Set([...state.history, action.data])] };
      window.localStorage.setItem('history',JSON.stringify(newState.history))
      return newState;
    } 
    if(action.type === "CLEAR_HIS") {
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
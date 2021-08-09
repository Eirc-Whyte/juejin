import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import Article from './components/Article';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
    if(window.pageYOffset >= 50){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
      header.classList.add('mobile:-translate-y-24');  //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
      header.classList.add('-translate-y-20');
      if(nav !== null) {
        nav.classList.add('mobile:-translate-y-24');
        nav.classList.add('-translate-y-20');
      }
      footer.classList.add('translate-y-24');
    } else {
      header.classList.remove('mobile:-translate-y-24');
      header.classList.remove('-translate-y-20');
      if(nav !== null) {
        nav.classList.remove('mobile:-translate-y-24');
        nav.classList.remove('-translate-y-20');
      }
      footer.classList.remove('translate-y-24');
    }
  });
  // let start = {x:0, y:0};
  // let end = {x:0, y:0};
  // window.addEventListener('touchstart', (e)=>{
  //   let touch = e.targetTouches[0];
  //   start = {x: touch.pageX, y: touch.pageY};
  // });
  // window.addEventListener('touchmove', (e)=>{
  //   let touch = e.targetTouches[0];
  //   end = {x: touch.pageX, y: touch.pageY};
  // });
  // window.addEventListener('touchend', (e)=>{
  //   var clientHeight = document.documentElement.clientHeight;
  //   let header = document.getElementsByTagName('header')[0];//定义一个dom节点为'header'的header变量
  //   let nav = document.getElementsByTagName('nav')[0];
  //   if(start.y !== Math.abs(end.y)){
  //       if(Math.abs(end.y - start.y) > clientHeight*0.1){
  //         if(end.y < start.y){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
  //           header.classList.add('mobile:-translate-y-8');  //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
  //           header.classList.add('-translate-y-20');
  //           nav.classList.add('mobile:-translate-y-8');
  //           nav.classList.add('-translate-y-20');
  //         } else {
  //           header.classList.remove('mobile:-translate-y-8');
  //           header.classList.remove('-translate-y-20');
  //           nav.classList.remove('mobile:-translate-y-8');
  //           nav.classList.remove('-translate-y-20');
  //         }
  //       }
  //   }
  // });
    return (
      <Router>
        <div className="w-screen">
            <Header />
            <Switch>
              <Route path="/article/:id">
                <Article />
              </Route>
              <Route path="/categories/:cid?">
                <Container />
              </Route>
              <Redirect to="/categories/0"></Redirect>
            </Switch>
            <Footer/>
        </div>
      </Router>
    )
}
export default HomePage;
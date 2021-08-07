import Header from './components/Header';
import Container from './components/Container';

const HomePage = () => {
  window.addEventListener('scroll', (e)=>{
    let header = document.getElementsByTagName('header')[0];//定义一个dom节点为'header'的header变量
    let nav = document.getElementsByTagName('nav')[0];
    if(window.pageYOffset >= 50){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
      header.classList.add('-translate-y-20');  //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
      nav.classList.add('-translate-y-20');
    } else {
      header.classList.remove('-translate-y-20'); //否则就移除'header_bg'样式
      nav.classList.remove('-translate-y-20');
    }
  });
    return (
        <div>
            <Header />
            <Container/>
        </div>
    )
}
export default HomePage;
import { forwardRef } from "react";
/*
    加载动画组件，用于控制图片加载时的动画
*/
const LoadingAnimation = forwardRef((props, ref)=>{
    return (
        <div ref={ref}
            className="windows8 ml-8">
            <div className="wBall" id="wBall_1">
                <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_2">
                <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_3">
                <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_4">
                <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_5">
                <div className="wInnerBall"></div>
            </div>
        </div>
    )
})
export default LoadingAnimation;
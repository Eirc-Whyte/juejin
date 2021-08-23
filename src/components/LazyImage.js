import { forwardRef, useEffect, useRef, useState } from "react"
import LoadingAnimation from "./LoadingAnimation"
const LazyImage = forwardRef((props, ref)=>{
    const img = useRef(null);
    const animation = useRef(null);
    const container = useRef(null);
    const [observer , setObserver] = useState();
    
    useEffect(()=>{
        if(container.current !== null && animation.current !== null){
            const newObserver = new IntersectionObserver((entries, observer)=>{
                entries.forEach(entry=>{
                    if(entry.isIntersecting > 0){
                        entry.target.src = props.src;
                        let timer = setTimeout(()=>{
                            container.current && (container.current.className = 'relative')
                            animation.current && (animation.current.className = "ml-4 invisible")
                        },3000)
                        img.current && (img.current.onError = ()=>{
                            container.current && (container.current.className = 'relative')
                            animation.current && (animation.current.className = "ml-4 invisible")
                        })
                        img.current && (img.current.onload = ()=>{
                            clearTimeout(timer);
                            animation.current && (animation.current.className = "ml-4 invisible")
                            img.current && (img.current.className = "ml-4")
                        })
                    }
                })
            }).observe(img.current)
            setObserver(newObserver);
        }
        
        return () => {
            if(observer !== undefined) {observer.unobserve(img.current)}
        }
    },[])
    return (
        <div className="flex-1 relative" ref={container}>
            <img 
            // height={40}
                className="ml-4 invisible"
                alt="img"
                ref={img}/>
            <LoadingAnimation
                ref={animation}/>
        </div>
    )
})

export default LazyImage;
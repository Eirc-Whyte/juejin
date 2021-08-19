import { useCallback, useEffect, useRef, useState } from "react";
/* @const status
 * @param status = 0 : not hit bottom
 * @param status = 1 : hit bottom
*/

const useHitBottom = (expand) => {
    const [observer, setObserver] = useState(null);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0.5]
    };
    const handleRefChange = useCallback((node)=>{
        const newObserver = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry) => {
                // Scroll Down
                if (entry.isIntersecting) {
                    expand();
                    // node.style.background = "red"
                    if(observer) observer.disconnect();
                    // console.log("scroll down",observer)
                }
            });
        }, options)
        if(node) newObserver.observe(node);
        setObserver(newObserver)
    },[expand])
    return handleRefChange
}
export default useHitBottom;
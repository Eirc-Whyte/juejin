import { useCallback } from "react";
/* @const status
 * @param status = 0 : not hit bottom
 * @param status = 1 : hit bottom
*/

const useHitBottom = (expand) => {
    // const [observer, setObserver] = useState(null);
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
                    if(observer) observer.disconnect();
                }
            });
        }, options)
        if(node) newObserver.observe(node);
    },[expand])
    return handleRefChange
}
export default useHitBottom;
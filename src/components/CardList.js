import React, { useState, useEffect, useRef } from 'react';
import { getArticles } from '../api'
import Card from './Card.js'
import { findDOMNode } from 'react-dom';

const CardList = ({condition}) =>{
    const [articleList, setArticleList] = useState([]);
    const [articleIdSet, setArticleIdSet] = useState([]);

    const MaxLength = 10;
    const [renderRange, setRange] = useState({});
    const [observer, setObserver] = useState(null);
    const $bottomElement = useRef();
    const $topElement = useRef();
    const [topMargin, setTopMargin] = useState(0);

    useEffect(() =>{
        console.log("useEffect called by condition")
        getArticles(condition.categoryId, condition.sortBy, 0, MaxLength).then((value) =>{
            let array = []
            let arr = value.data.articles;
            let indexSet = []
            for (var i = 0; i < arr.length; i++) {
                if (indexSet.indexOf(arr[i].article_id) === -1) {
                    array.push(arr[i])
                    indexSet.push(arr[i].article_id)
                }
            }
            setArticleIdSet(indexSet);
            setArticleList(array);
            setRange({
                start: 0,
                end: array.length - 1
            });
            return array;
        })
    },[condition])
    useEffect(() => {
        console.log("useEffect called by start and end")
        console.log(renderRange);
        if(renderRange.end >= articleList.length - 1){
            getArticles(condition.categoryId, condition.sortBy, articleList.length, MaxLength).then((value) =>{
                let array = articleList;
                let arr = value.data.articles;
                let indexSet = articleIdSet;
                for (var i = 0; i < arr.length; i++) {
                    if (indexSet.indexOf(arr[i].article_id) === -1) {
                        array.push(arr[i])
                        indexSet.push(arr[i].article_id)
                    }
                }
                setArticleIdSet(indexSet);
                setArticleList(array);
                return array;
            })
        }
    },[renderRange.start, renderRange.end])

    const initObserver = () => {
        console.log('initObserver')
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: [0.5]
        };
        const Observer = new IntersectionObserver((entries, observer)=>{
                const {start, end} = renderRange;
                entries.forEach((entry, index) => {
                const listLength = articleList.length;
                console.log("listLength",listLength)
                // Scroll Down
                console.log(entry.target , entry.isIntersecting)
                if (entry.isIntersecting && entry.target.id === "bottom") {
                    const maxStartIndex = listLength - 1 - MaxLength;     // Maximum index value `start` can take
                    const maxEndIndex = listLength - 1;                   // Maximum index value `end` can take
                    const newEnd = (end + 4) <= maxEndIndex ? end + 4 : maxEndIndex;
                    const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex;
                    setRange({
                        start: newStart,
                        end: newEnd
                    });
                    setTopMargin($topElement.current.clientHeight * (newStart));
                }
                // Scroll up
                if (entry.isIntersecting && entry.target.id === "top") {
                    const newEnd = start + 5 >= (MaxLength - 1) ? start + 5 : (MaxLength - 1) ;
                    const newStart = start - 4 >= 0 ? start - 4 : 0;
                    // $topElement.current.style.margin = `0`;
                    setRange({
                        start: newStart,
                        end: newEnd
                    });
                    setTopMargin($topElement.current.clientHeight * (newStart));
                }
            });
        }, options)
        console.log($topElement.current, $bottomElement.current)
        if ($topElement.current) {
          Observer.observe($topElement.current);
        }
        if ($bottomElement.current) {
          Observer.observe($bottomElement.current);
        }
        setObserver(Observer)    
    }
    const resetObserver = () => {
        observer && observer.disconnect();
    }
    useEffect(() => {
        initObserver();
        if(renderRange.start !== renderRange.end) {
            // console.log("height:",$topElement.current.clientHeight)
            // $topElement.current.style.margin = `${topPadding}px 0 0 0`;
            // console.log("ininti:",$topElement.current, $bottomElement.current)
            // return ()=>{
            //     resetObserver();
            // }
        }
        return ()=>{
            resetObserver();
        }
    },[renderRange.start, renderRange.end])
    
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <div id="topMargin" style={{margin:`${topMargin}px 0 0 0`}}></div>
            {
            articleList
                .slice(renderRange.start,renderRange.end)
                .map((article,index) => {
                const {start, end} = renderRange;
                if(index === 0) console.log(articleList);
                return (
                    <div 
                        id={index === 0 ? "top" : (index === end - start - 1 ? "bottom" :"" )} 
                        ref={index === 0 ? $topElement : (index === end - start - 1 ? $bottomElement : null )}
                        key={article.article_id}
                        >
                        <Card
                            article={article}
                            >
                        </Card>
                    </div>
                )
            }
        )
        }
        {/* <div id="bottom" ref={$bottomElement}>到底了-----</div> */}
        </div>
    )
}

export default CardList;
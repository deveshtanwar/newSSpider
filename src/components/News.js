import { useState, useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) =>{

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const update = async () => {
        props.setProgress(10);

        // News API free version give 100 request per day only so, for backup using 4 apis XD

        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c52646a7d4384a60a99ee65ef6042d6e&page=${page}&pageSize=${props.pageSize}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0e54abbb6a047f992f98f592fb38a90&page=${page}&pageSize=${props.pageSize}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63b131d2aaf446919bb6206b0b0b12d3&page=${page}&pageSize=${props.pageSize}`;
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5204042879cc43fa889c0238be8d0125&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticle(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        update();
    },[]);

    const fetchMoreData = async () =>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c52646a7d4384a60a99ee65ef6042d6e&page=${page+1}&pageSize=${props.pageSize}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0e54abbb6a047f992f98f592fb38a90&page=${page+1}&pageSize=${props.pageSize}`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63b131d2aaf446919bb6206b0b0b12d3&page=${page+1}&pageSize=${props.pageSize}`;
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5204042879cc43fa889c0238be8d0125&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page + 1);
    }
    
    return(
        <>
            <h2 className={`text-center text-${props.mode === 'dark'? 'light':'dark'}`} style={{marginTop:"70px"}}>{props.category.charAt(0).toUpperCase() + props.category.slice(1)} Top Headlines</h2>
            {loading && <Spinner mode={props.mode}/>}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalResults}
                loader={<Spinner mode={props.mode}/>}>
                <div className='container mt-3'>
                    <div className='row'>
                        {article.map((val) => {
                            return (
                                <div className='col-md-4' key={val.url}>
                                    <NewsItem title={val.title} description={val.description ? val.description.slice(0, 85) : val.description} imageUrl={val.urlToImage} newsUrl={val.url} author={val.author} date={val.publishedAt} source={val.source.name} mode = {props.mode}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}
export default News;
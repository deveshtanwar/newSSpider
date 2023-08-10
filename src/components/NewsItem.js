// import {Component} from 'react';
import noImage from '../assets/no-image-available.jpeg';

const NewsItem = (props) =>{
    
    const {title, description, imageUrl, newsUrl, author, source, date} = props;
    return(
        <div className="card mb-5 m-auto">
            <div>
                <span className="d-flex badge rounded-pill bg-danger" style={{position:"absolute", right:"0"}}>{source}</span>
            </div>
            <img src={imageUrl ? imageUrl : noImage} alt="newsImage" style={{height:"200px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By- {author?author:"unknown"} on {new Date(date).toDateString()}</small></p>
                <a href={newsUrl} target='_blank' rel='noopener noreferrer' className={`btn btn-sm btn-${props.mode === 'dark'? 'dark':'primary'}`}>Read More</a>
            </div>
        </div>
    );

}
export default NewsItem;
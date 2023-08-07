// import Loading from '../assets/loading.gif';
import Loading from '../assets/spin.gif';
import LoadingWhite from '../assets/spin-white.gif';

const Spinner = (props) => {
    
    return(
        <div className='container text-center'>
            <img src={props.mode==="dark"? LoadingWhite: Loading} alt="loading" />
        </div>
    );
    
}
export default Spinner;
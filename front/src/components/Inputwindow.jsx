import Styles from '../components/Inputwindow.module.css';
function Inputwindow(props){

    return(
    <div>
        <input id = {Styles.shape} placeholder={props.placeholder}></input>
    </div> );
}

export default Inputwindow;
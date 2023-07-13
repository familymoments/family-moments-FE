import classes from "./Header.module.css"

const Header = props => {
    return (
        <div className={classes.Header}>
            <div className={classes.font}>{props.title}</div>
        </div>
    );
};

export default Header;
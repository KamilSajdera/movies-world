import { createPortal } from 'react-dom';
import classes from './LoaderPage.module.css';

const LoaderPage = () => {
    return createPortal(<div className={classes.loadWrapper}>
        <span className={classes.loader}></span>
    </div>, document.getElementById("loader"))
};

export default LoaderPage;
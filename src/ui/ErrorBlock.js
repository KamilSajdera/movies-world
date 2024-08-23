import classes from './ErrorBlock.module.css';

export default function ErrorBlock({message}) {
    return <div className={classes.error}>{message}</div>
}
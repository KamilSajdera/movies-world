import { useRouteError, useNavigate } from "react-router-dom";
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "Something went wrong!";
  let desc = "We're working on it...";

  if(error.status === 500) 
  {
    message = error.data.message;
    desc = error.data.desc;
  }

  if(error.status === 404) {
    message = "Could not find resource or page.";
    desc = "The page you are looking for might have been removed, had its name changed or is temporarily unavailable."
  }

  return (
    <div className={classes.errorContainer}>
      <h1>Oops!</h1>
      <h3>{error.status} - {message}</h3>
      <p>{desc}</p>
      <button className={classes.goToHomeBtn} onClick={() => navigate('./')}>Go to Home</button>
    </div>
  );
};

export default ErrorPage;

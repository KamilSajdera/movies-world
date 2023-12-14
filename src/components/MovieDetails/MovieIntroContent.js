import IntroBasicInfo from "./IntroBasicInfo";
import IntroUsersRating from "./IntroUsersRating";

import classes from './MovieIntroContent.module.css';

const MovieIntoContent = ({movieData}) => 
{
    return (
        <div className={classes.movieIntroContent}>
        <h1>{movieData.title}</h1>
        <IntroBasicInfo movieData={movieData} />
        <IntroUsersRating
          usersRating={movieData.usersRating}
          quantityReviews={movieData.reviews.total_results}
        />
      </div>
    )
};

export default MovieIntoContent;
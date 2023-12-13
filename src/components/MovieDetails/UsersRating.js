import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";

import classes from "./UserRating.module.css";

const UsersRating = ({usersRating, quantityReviews}) => {
  const movieRating = usersRating;

  const renderStars = () => {
    let starsTab = [];

    if(movieRating < 10) {
        for(let i = 0; i<=4; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#696969"}}/>);
        }
    }

    if(movieRating >= 10 && movieRating < 20) {
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}}/>);
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar}/>)
        } 
    }

    if(movieRating >= 20 && movieRating < 30) {
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>);
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}}/>);
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar}/>)
        } 
    }
    
    if(movieRating >= 30 && movieRating < 45) {
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>);
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar}/>)
        } 
    }

    if(movieRating >= 45 && movieRating < 55) {
        for(let i = 0; i<=1; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
    }

    if(movieRating >= 55 && movieRating < 65) {
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
    }

    if(movieRating >= 65 && movieRating < 75) {
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
    }

    if(movieRating >= 75 && movieRating < 85) {
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStar}/>); 
    }

    if(movieRating >= 85 && movieRating < 96) {
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}}/>); 
    }

    if(movieRating > 96) {
        for(let i = 0; i<=4; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}}/>)
        } 
    }

    return starsTab;
  };

  return (
    <div className={classes.ratingWrapper}>
      <div className={classes.stars}>
        <span className={classes.tooltip}>{usersRating}%</span>
       {renderStars()}
      </div>
      <div className={classes.reviews}>
        ({quantityReviews} reviews)
      </div>
    </div>
  );
};

export default UsersRating;

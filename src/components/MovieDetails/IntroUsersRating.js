import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";

import classes from "./IntroUsersRating.module.css";

const UsersRating = ({usersRating, quantityReviews}) => {
  const movieRating = usersRating;

  const renderStars = () => {
    let starsTab = [];

    if(movieRating < 10) {
        for(let i = 0; i<=4; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#696969"}} key={i}/>);
        }
    }

    if(movieRating >= 10 && movieRating < 20) {
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}} key={4}/>);
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} key={i}/>)
        } 
    }

    if(movieRating >= 20 && movieRating < 30) {
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={3} />);
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}} key={4}/>);
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} key={i}/>)
        } 
    }
    
    if(movieRating >= 30 && movieRating < 45) {
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={3}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={4}/>);
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} key={i}/>)
        } 
    }

    if(movieRating >= 45 && movieRating < 55) {
        for(let i = 0; i<=1; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}} key={2}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar} key={3}/>); 
        starsTab.push(<FontAwesomeIcon icon={faStar} key={4}/>); 
    }

    if(movieRating >= 55 && movieRating < 65) {
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStar} key={3}/>); 
        starsTab.push(<FontAwesomeIcon icon={faStar} key={4}/>); 
    }

    if(movieRating >= 65 && movieRating < 75) {
        for(let i = 0; i<=2; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}} key={3}/>);
        starsTab.push(<FontAwesomeIcon icon={faStar} key={4}/>); 
    }

    if(movieRating >= 75 && movieRating < 85) {
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStar} key={4}/>); 
    }

    if(movieRating >= 85 && movieRating < 96) {
        for(let i = 0; i<=3; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
        } 
        starsTab.push(<FontAwesomeIcon icon={faStarHalfStroke} style={{color: "#7eceec"}} key={4}/>); 
    }

    if(movieRating > 96) {
        for(let i = 0; i<=4; i++) {
            starsTab.push(<FontAwesomeIcon icon={faStar} style={{color: "#7eceec"}} key={i}/>)
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

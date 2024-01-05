import classes from "./ReviewsSection.module.css";

const ReviewsSection = ({ reviews }) => {
  return (
    <section className={classes.reviewsContainer}>
      <h1>Reviews</h1>
      {reviews.map((item, index) => {
        const date = item.created_at.slice(0,10)
        return (
          <div className={classes["review-item"]} key={index}>
            <div className={classes["author_name"]}>{item.author}</div>
            <div className={classes["review_date"]}>{date}</div>
            <div className={classes["review_content"]}>{item.content}</div>
          </div>
        );
      })}
    </section>
  );
};

export default ReviewsSection;

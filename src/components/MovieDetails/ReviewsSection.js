import classes from "./ReviewsSection.module.css";

const ReviewsSection = ({ reviews }) => {
  let content =
    reviews.length > 0
      ? reviews.map((item, index) => {
          const date = item.created_at.slice(0, 10);
          return (
            <div className={classes["review-item"]} key={index}>
              <div className={classes["author_name"]}>{item.author}</div>
              <div className={classes["review_date"]}>{date}</div>
              <div className={classes["review_content"]}>{item.content}</div>
            </div>
          );
        })
      : <p className={classes.noReviewsMsg}>This movie doesn't have any reviews in our database yet.</p>

  return (
    <section className={classes.reviewsContainer}>
      <h1>Reviews</h1>
      {content}
    </section>
  );
};

export default ReviewsSection;

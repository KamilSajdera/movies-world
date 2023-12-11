import classes from './UserProfileMain.module.css';

const UserOtherNames = ({otherNames}) => {
  return (
    <div className={classes.otherNames}>
      <h3>Other names</h3>
      {otherNames.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default UserOtherNames;

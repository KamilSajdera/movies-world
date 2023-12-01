import classes from "./UserProfileSocials.module.css";

import fbLogo from "../../assets/people/facebook_user.png";
import igLogo from "../../assets/people/instagram_user.png";
import twitterLogo from "../../assets/people/twitter_user.png";
import tiktokLogo from "../../assets/people/tiktok_user.png";

const UserProfileSocials = ({ socials }) => {
  const facebookLink = `https://facebook.com/${socials.facebook}`;
  const instagramLink = `https://instagram.com/${socials.instagram}`;
  const twitterLink = `https://twitter.com/${socials.twitter}`;
  const tiktokLink = `https://tiktok.com/@${socials.tiktok}`;
  return (
    <div className={classes.socials}>
      {socials.facebook && (
        <a href={facebookLink} target="_blank" rel="noreferrer">
          <img src={fbLogo} alt="User's facebook" />
        </a>
      )}
      {socials.instagram && (
        <a href={instagramLink} target="_blank" rel="noreferrer">
          <img src={igLogo} alt="User's instagram" />
        </a>
      )}
      {socials.twitter && (
        <a href={twitterLink} target="_blank" rel="noreferrer">
          <img src={twitterLogo} alt="User's twitter" />
        </a>
      )}
      {socials.tiktok && (
        <a href={tiktokLink} target="_blank" rel="noreferrer">
          <img src={tiktokLogo} alt="User's tiktok" />
        </a>
      )}
    </div>
  );
};

export default UserProfileSocials;

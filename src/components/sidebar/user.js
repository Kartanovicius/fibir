import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {
    DEFAULT_FEMALE_IMAGE_PATH,
    DEFAULT_IMAGE_PATH,
    DEFAULT_MALE_IMAGE_PATH,
    DEFAULT_OTHER_IMAGE_PATH
} from '../../constants/paths';

export default function User({ username, fullName, gender }) {

    const userGender = () => {
        let path = '';

        if(gender === "male"){
            path = DEFAULT_MALE_IMAGE_PATH;
        }
        else if(gender === "female"){
            path = DEFAULT_FEMALE_IMAGE_PATH;
        }
        else if(gender === "other"){
            path = DEFAULT_OTHER_IMAGE_PATH;
        }
        else {
            path = DEFAULT_IMAGE_PATH;
        }

        return path;
    }

  return !username || !fullName ? (
    <Skeleton count={1} height={60} />
  ) : (
    <Link to={`/p/${username}`} className="grid w-full gap-4 mb-6 items-center justify-center bg-black-light p-5 shadow-lg">
      <div className="grid w-full items-center justify-center">
        <img
          className="rounded-full w-16"
          src={userGender()}
          alt="User profile image"
          onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="text-white text-center">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};

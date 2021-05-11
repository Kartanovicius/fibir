import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    <div className="px-6 pt-2">
      <div className=" items-center">
        <Link to={`/p/${username}`} className="items-center">
          <p className="font-bold text-gray-100">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};

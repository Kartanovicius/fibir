import PropTypes from 'prop-types';

export default function Footer({ caption }) {
  return (
    <div className="p-6 pb-0">
      <span className="">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

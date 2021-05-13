import PropTypes from 'prop-types';
import Linkify from 'react-linkify';

export default function Footer({caption}) {

    return (
        <Linkify >
            <div className="p-6 pb-0 detectLinks">
                <p className="">{caption}</p>
            </div>
        </Linkify>
    );
}

Footer.propTypes = {
    caption: PropTypes.string.isRequired
};

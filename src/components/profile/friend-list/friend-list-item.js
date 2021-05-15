import {Link} from 'react-router-dom';

export default function FriendListItem({ username, fullName }) {
    return (
        <div className="flex flex-row items-center align-items justify-between ml-4">
            <div className="flex items-center justify-between">
                <Link to={`/p/${username}`}>
                    <p className="font-semibold text-sm text-white hover:text-blue-medium">{username}<br/>{fullName}</p>
                </Link>
            </div>
        </div>
    )
}

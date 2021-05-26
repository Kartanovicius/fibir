import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {
    updateLoggedInUserFollowing,
    updateFollowedUserFollowers,
    getUserByUserId
} from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import {
    DEFAULT_IMAGE_PATH,
    DEFAULT_MALE_IMAGE_PATH,
    DEFAULT_FEMALE_IMAGE_PATH,
    DEFAULT_OTHER_IMAGE_PATH
} from "../../constants/paths";

export default function SuggestedProfile({
                                             profileDocId,
                                             username,
                                             profileId,
                                             userId,
                                             gender,
                                             loggedInUserDocId
                                         }) {
    const [followed, setFollowed] = useState(false);
    const {setActiveUser} = useContext(LoggedInUserContext);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
        const [user] = await getUserByUserId(userId);
        setActiveUser(user);
    }

    const userGender = () => {
        let path = '';

        if (gender === "male") {
            path = DEFAULT_MALE_IMAGE_PATH;
        } else if (gender === "female") {
            path = DEFAULT_FEMALE_IMAGE_PATH;
        } else if (gender === "other") {
            path = DEFAULT_OTHER_IMAGE_PATH;
        } else {
            path = DEFAULT_IMAGE_PATH;
        }

        return path;
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={userGender()}
                    alt="User profile image"
                    onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm text-white">{username}</p>
                </Link>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
}
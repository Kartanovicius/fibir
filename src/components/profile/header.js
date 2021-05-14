import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import {isUserFollowingProfile, toggleFollow} from '../../services/firebase';
import UserContext from '../../context/user';
import {
    DEFAULT_FEMALE_IMAGE_PATH,
    DEFAULT_IMAGE_PATH,
    DEFAULT_MALE_IMAGE_PATH,
    DEFAULT_OTHER_IMAGE_PATH
} from '../../constants/paths';

export default function Header({
                                   postsCount,
                                   followerCount,
                                   setFollowerCount,
                                   profile: {
                                       docId: profileDocId,
                                       userId: profileUserId,
                                       fullName,
                                       followers,
                                       following,
                                       gender,
                                       username: profileUsername
                                   }
                               }) {
    const {user: loggedInUser} = useContext(UserContext);
    const {user} = useUser(loggedInUser?.uid);
    const [isFollowingProfile, setIsFollowingProfile] = useState(null);
    const activeBtnFollow = user?.username && user?.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        };

        if (user?.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);

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

    return (
        <div className="mx-auto max-w-screen-lg bg-black-light p-5 py-8 text-white space-y-5">
            <div className="grid grid-cols-2">
                <div>
                    {profileUsername ? (
                        <img
                            className="rounded-full h-40 w-40 flex"
                            alt={`${fullName} profile picture`}
                            src={userGender()}
                            onError={(e) => {
                                e.target.src = DEFAULT_IMAGE_PATH;
                            }}
                        />
                    ) : (
                        <Skeleton circle height={150} width={150} count={1}/>
                    )}
                </div>
                <div className="flex items-center justify-center flex-col">
                    <div className="container items-baseline text-right space-y-4 px-2">
                        <p className="text-3xl font-semibold">{profileUsername}</p>
                        <p className="text-md">{!fullName ? <Skeleton count={1} height={24}/> : fullName}</p>
                        {activeBtnFollow && isFollowingProfile === null ? (
                            <Skeleton count={1} width={80} height={32}/>
                        ) : (
                            activeBtnFollow && (
                                <button
                                    className="bg-blue-medium hover:bg-blue-light font-bold text-sm text-white w-20 h-8 ml-8 my-auto"
                                    type="button"
                                    onClick={handleToggleFollow}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleToggleFollow();
                                        }
                                    }}
                                >
                                    {isFollowingProfile ? 'Unfollow' : 'Follow'}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="container flex justify-between items-center text-center p-3">
                {!followers || !following ? (
                    <Skeleton count={1} width={677} height={24}/>
                ) : (
                    <>
                        <p className="">
                            <span className="font-bold">{postsCount}</span> <br/>posts
                        </p>
                        <p className="">
                            <span className="font-bold">{followerCount}</span>
                            <br/>
                            {followerCount === 1 ? `follower` : `followers`}
                        </p>
                        <p className="">
                            <span className="font-bold">{following?.length}</span> <br/>following
                        </p>
                    </>
                )}
            </div>
        </div>


    );
}

Header.propTypes = {
    postsCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};

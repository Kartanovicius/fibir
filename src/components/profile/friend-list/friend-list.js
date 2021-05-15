import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {getFriendListProfiles} from '../../../services/firebase';
import FriendListItem from "./friend-list-item";

export default function FriendList(
    {
        profile:
            {
                userId: userId,
                following: following
            }
    }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function friendListProfiles() {
            const response = await getFriendListProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) {
            friendListProfiles();
        }
    }, [userId]);
    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5"/>
    ) : profiles.length > 0 ? (
        <div>
            <div className=" bg-black-light shadow-lgx` p-5 text-sm flex items-center align-items justify-between mb-4">
                <p className="font-semibold text-white text-2xl">Friend List</p>
            </div>
            <div className="flex flex-col bg-black-light shadow-lgx` p-5">
                <div className="grid gap-5">
                    {profiles.map((profile) => (
                        <FriendListItem
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            fullName={profile.fullName}
                            userId={userId}
                            gender={profile.gender}
                        />
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

FriendList.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};

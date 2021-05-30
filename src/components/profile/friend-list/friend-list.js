import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {getFriendListProfiles} from '../../../services/firebase';
import FriendListItem from "./friend-list-item";
import * as PATHS from "../../../constants/paths";

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
                            username={profile.username}
                            fullName={profile.fullName}
                            userId={userId}
                        />
                    ))}
                </div>
            </div>
        </div>
    ) : (!profiles || (profiles.length === 0 &&
        <div className="grid grid-cols-2 justify-center items-center bg-black-light p-20 gap-4">
            <div>
                <p className="text-white text-center text-xl font-semibold mb-3">We looked for accounts that you following
                but we didn't find any
            </p>
                <p className="text-white text-center text-lg"> Maybe try to follow someone?</p></div>
            <img className="w-40 mx-auto" src={PATHS.EMPTY_PATH} alt="empty box"/>
        </div>))
        ;
}
import {useContext} from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
    const {user: {docId = '', fullName, username, userId, following, gender} = {}} = useContext(
        LoggedInUserContext
    );

    return (
        <div className="pl-5">
            <div className="">
                <User username={username} fullName={fullName} gender={gender}/>
            </div>
                <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    );
}

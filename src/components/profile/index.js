import {useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Posts from './posts';
import {getUserPostsByUserId} from '../../services/firebase';
import '../../styles/background-to-gray.css'
import {Route} from "react-router-dom";
import Menu from "./menu";
import FriendList from "./friend-list/friend-list";

export default function Profile({user}) {
    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {},
        postsCollection: null,
        followerCount: 0,
    };

    const [{profile, postsCollection, followerCount, gender}, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function getProfileInfoAndPosts() {
            const posts = await getUserPostsByUserId(user.userId);
            dispatch({
                profile: user,
                postsCollection: posts,
                followerCount: user.followers.length,
                gender: user,
                username: user
            });
        }

        getProfileInfoAndPosts();
    }, [user.username]);


    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="grid col-span-1 gap-4">
                <Header
                    postsCount={postsCollection ? postsCollection.length : 0}
                    profile={profile}
                    followerCount={followerCount}
                    setFollowerCount={dispatch}
                    gender={gender}
                />
                <Menu
                    Header
                    postsCount={postsCollection ? postsCollection.length : 0}
                    profile={profile}
                    followerCount={followerCount}
                    setFollowerCount={dispatch}
                    gender={gender}
                />
            </div>
            <div className="col-span-2">
                <Route exact path={`/p/${user.username}`}>
                    <Posts posts={postsCollection}/>
                </Route>
                <Route exact path={`/p/${user.username}/posts`}>
                    <Posts posts={postsCollection}/>
                </Route>
                <Route exact path={`/p/${user.username}/friendlist`}>
                    <FriendList profile={profile}/>
                </Route>
            </div>
        </div>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number,
        emailAddress: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        gender: PropTypes.string
    })
};

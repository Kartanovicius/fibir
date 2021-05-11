import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Posts from './posts';
import { getUserPostsByUserId } from '../../services/firebase';
import '../../styles/background-to-gray.css'

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    postsCollection: null,
    followerCount: 0
  };

  const [{ profile, postsCollection, followerCount , gender }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPosts() {
      const posts = await getUserPostsByUserId(user.userId);
      dispatch({ profile: user, postsCollection: posts, followerCount: user.followers.length, gender: user });
    }
    getProfileInfoAndPosts();
  }, [user.username]);

  return (
    <>
      <Header
        postsCount={postsCollection ? postsCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        gender={gender}
      />
      <Posts posts={postsCollection}/>
    </>
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

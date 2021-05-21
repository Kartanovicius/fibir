import {useState, useEffect} from 'react';
import {getPosts} from '../services/firebase';

export default function usePosts(user, filter) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function getTimelinePosts() {
            if (user?.following?.length > 0) {
                if (filter === null) {
                    const followedUserPosts = await getPosts(user.userId, user.following);
                    followedUserPosts.sort((a, b) => b.dateCreated - a.dateCreated);
                    setPosts(followedUserPosts);
                }
                else {
                    const followedUserPosts = await getPosts(user.userId, user.following, filter);
                    followedUserPosts.sort((a, b) => a.dateCreated - b.dateCreated);
                    setPosts(followedUserPosts);
                }
            }
        }
        getTimelinePosts();
    }, [user?.userId, user?.following, filter]);

    return {posts};
}

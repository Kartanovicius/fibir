import React, {useContext} from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePosts from '../hooks/use-posts';
import Post from './post';

export default function TimelinePosts({filter}) {

    const {user} = useContext(LoggedInUserContext);
    const {posts} = usePosts(user, filter);

    return (
        <div className="container col-span-2 border-r-0">
            {!posts ? (
                <Skeleton circle={false} count={4} height={500} className="mb-5"/>
            ) : (
                posts.map((content) => <Post key={content.docId} content={content}/>)
            )}
        </div>
    );
}

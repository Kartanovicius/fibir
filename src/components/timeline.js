import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePosts from '../hooks/use-posts';
import Post from './post';
import AddPost from "./add-post";

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { posts } = usePosts(user);

  return (
    <div className="container col-span-2 border-r-0">
        <AddPost></AddPost>
        {!posts ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        posts.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}

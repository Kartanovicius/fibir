import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Linkify from 'react-linkify';


export default function Posts({posts}) {
    return (
        <div className="h-16 mt-12 pt-4 detectLinks">
            <div className="grid grid-cols-2 gap-8 mt-4 mb-12">
                {!posts
                    ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400}/>)
                    : posts.length > 0
                        ? posts.map((posts) => (
                            <Linkify>
                                <div key={posts.docId} className="bg-black-light mb-12 text-white shadow-lg p-6">
                                    <div className="">{posts.caption}</div>
                                    <div className="">{posts.likes.length === 1 ? `
                                    ${posts.likes.length} like` : `${posts.likes.length} likes`} </div>
                                </div>
                            </Linkify>
                        ))
                        : null}
            </div>
            {!posts || (posts.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
        </div>
    );
}

Posts.propTypes = {
    posts: PropTypes.array
};

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Linkify from 'react-linkify';
import * as PATHS from '../../constants/paths';


export default function Posts({posts}) {
    return (
        <div className="detectLinks">
            {!posts
                ? new Array(12).fill(0).map((_, i) => <Skeleton key={i} width={320} height={400}/>)
                : posts.length > 0
                    ? posts.map((posts) => (
                        <Linkify>
                            <div key={posts.docId} className="bg-black-light mb-4 text-white shadow-lg p-6">
                                <div className="">{posts.caption}</div>
                                <div className="mt-4 font-bold flex items-center">
                                    <svg
                                        onClick=""
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                            }
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="white"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        tabIndex={0}
                                        className={"w-8 mr-4 select-none cursor-pointer focus:outline-none"}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    {posts.likes.length === 1 ? `
                                    ${posts.likes.length} like` : `${posts.likes.length} likes`}
                                </div>
                            </div>
                        </Linkify>
                    ))
                    : null}
            {!posts || (posts.length === 0 &&
                <div className="grid grid-cols-2 justify-center items-center bg-black-light p-20 gap-4">
                    <p className="text-white text-center text-2xl font-semibold">We looked for posts but we didn't find
                        any</p>
                    <img className="w-40 mx-auto" src={PATHS.EMPTY_PATH}/>
                </div>)}
        </div>
    );
}

Posts.propTypes = {
    posts: PropTypes.array
};

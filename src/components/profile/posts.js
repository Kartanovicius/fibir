import Skeleton from 'react-loading-skeleton';
import Linkify from 'react-linkify';
import * as PATHS from '../../constants/paths';

export default function Posts({posts, docId}) {

    return (
        <div className="detectLinks">
            {!posts
                ? <Skeleton width={320} height={400}/>
                : posts.length > 0
                    ? posts.map((posts) => (
                        <Linkify>
                            <div key={posts.docId} className="bg-black-light mb-4 text-white shadow-lg p-6">
                                <div className="">{posts.caption}</div>
                                <div className="mt-4 font-bold flex items-center">
                                </div>
                            </div>
                        </Linkify>
                    ))
                    : null}
            {!posts || (posts.length === 0 &&
                <div className="grid grid-cols-2 justify-center items-center bg-black-light p-20 gap-4">
                    <p className="text-white text-center text-2xl font-semibold">We looked for posts but we didn't find
                        any</p>
                    <img className="w-40 mx-auto" src={PATHS.EMPTY_PATH} alt="empty box"/>
                </div>)}
        </div>
    );
}

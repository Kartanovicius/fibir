import {useRef} from 'react';
import Footer from './footer';
import Actions from './actions';
import Header from './header';
import Comments from './comments';

export default function Post({content}) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="bg-black-light mb-12 text-white shadow-lg">
            <Header caption={content.caption} username={content.username}/>
            <div className="flex flex-row justify-between pr-6 mb-4">
                <Footer username={content.username}/>
                <Actions
                    docId={content.docId}
                    totalLikes={content.likes.length}
                    likedPosts={content.userLikedPosts}
                    handleFocus={handleFocus}
                />
            </div>
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}
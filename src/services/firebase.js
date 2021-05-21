import {
    firebase,
    FieldValue
} from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.length > 0;
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}

export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');

    if (following.length > 0) {
        query = query.where('userId', 'not-in', [...following, userId]);
    }

    const result = await query.limit(10).get();

    const profiles = result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));

    return profiles;
}

export async function getFriendListProfiles(userId, following) {
    let query = firebase.firestore().collection('users');

    if (following.length > 0) {
        query = query.where('userId', 'in', [...following, userId]);
    }

    const result = await query.limit(10000).get();

    const profiles = result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));

    function deleteLoggedInUserFromArray(array, item) {
        var rowToDelete = null;
        for (var i = 0; i <= array.length - 1; i++) {
            if (array[i].userId == item) {
                rowToDelete = i;
            }
        }
        array = array.slice(0); // make copy
        array.splice(rowToDelete, 1);
        return array
    }

    return deleteLoggedInUserFromArray(JSON.parse(JSON.stringify(profiles)), userId);
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,
    isFollowingProfile
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile ?
                FieldValue.arrayRemove(profileId) :
                FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId,
    loggedInUserDocId,
    isFollowingProfile
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile ?
                FieldValue.arrayRemove(loggedInUserDocId) :
                FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPosts(userId, following, filter) {
    console.log(filter)
    const result = await firebase
        .firestore()
        .collection('posts')
        .where('userId', 'in', following)
        .get();

    const userFollowedPosts = result.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    }));

    if(filter != undefined){
        for (var i = 0; i <= userFollowedPosts.length - 1; i++) {
            if (userFollowedPosts[i].filter != filter) {
                userFollowedPosts.splice(i, 1);
                i = 0;
            }
        }
        for (var i = 0; i <= userFollowedPosts.length - 1; i++) {
            if (userFollowedPosts[i].filter != filter) {
                userFollowedPosts.splice(i, 1);
                i = 0;
            }
        }
    }

    const postsWithUserDetails = await Promise.all(
        userFollowedPosts.map(async (post) => {
            let userLikedPost = false;
            if (post.likes.includes(userId)) {
                userLikedPost = true;
            }
            const user = await getUserByUserId(post.userId);
            const {
                username
            } = user[0];
            return {
                username,
                ...post,
                userLikedPost
            };
        })
    );

    return postsWithUserDetails;
}

export async function getFilters() {
    const result = await firebase
        .firestore()
        .collection('filters')
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}

export async function getUserPostsByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('posts')
        .where('userId', '==', userId)
        .get();

    const posts = result.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    }));
    return posts;
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername) // karl (active logged in user)
        .where('following', 'array-contains', profileUserId)
        .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) {
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
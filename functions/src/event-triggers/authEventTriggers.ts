import * as functions from 'firebase-functions';
import { db } from '../utils/firestore';
import User from '../../../Models/user';
export const beforeUserCreated = functions.identity.beforeUserCreated((event) => {
    const user = event.data;
    db.collection(User.COLLECTION_NAME).add({
        id: user?.uid,
        email: user?.email
    } as User)
    return user;
})
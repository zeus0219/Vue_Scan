import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { signOut, getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
export async function getUsers() {
    const users = await getDocs(collection(db, 'company_users'));
    const documents = users.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return documents
}
export async function createUser(user: any, role: String) {
    const userExists = await existUser(user, `company_users`)
    if (await existUser(user, `users`)) {
        return 'This is user account, you can not access with this user.'
    }
    if (!userExists) {
        const newObj = {
            email: user.email,
            name: user.displayName,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photo: user.photoURL,
            role
        };
        await addDoc(collection(db, 'company_users'), newObj);
        return true;
    }
}
export async function registerWithGithub() {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const result = signInWithPopup(auth, provider)
        .then(async result => {
            const user = result.user;
            if (await existUser(user, `users`)) {
                await signOut(auth)
                return 'This is user account, you can not access with this user.'
            }
            await createUser(user, `COMPANY_USER`);
            return true;
        })
        .catch(() => {
            console.log('error with git auth')
        });
        return result;
}

export async function registerWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    const result = signInWithPopup(auth, provider)
        .then(async (result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const user = result.user;
            if (await existUser(user, `users`)) {
                await signOut(auth)
                return 'This is user account, you can not access with this user.'
            }
            await createUser(user, `COMPANY_USER`);
            return true;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch(() => {
            console.log('error---');

        });
        return result;
}

export async function loginWithGithub() {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider)
        .then(async result => {
            const user = result.user;
            if (await existUser(user, `users`)) {
                await signOut(auth)
                return 'This is user account, you can not access with this user.'
            }
            await createUser(user, `COMPANY_USER`);
            return true;
        })
        .catch(() => {
            console.log('error with git auth')
        })
        return result;
}
export async function loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    const result = await signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            if (await existUser(user, `users`)) {
                await signOut(auth);
                return 'This is user account, you can not access with this user.'
            }

            await createUser(user, `COMPANY_USER`)
            return true
        }).catch(() => {
            return false;
        });
    return result;


}
async function existUser(user, collection_name) {
    const usersCollection = collection(db, collection_name);
    const q = query(usersCollection, where('email', '==', user.email));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    if(documents.length){
        return true
    }else{
        return false;
    }
    
    // return userExists;
}
export async function _existUser(email, collection_name) {
    const usersCollection = collection(db, collection_name);
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    if(documents.length){
        return true
    }else{
        return false;
    }
}
export async function getCompanyInfo(email) {
    const usersCollection = collection(db, 'company_users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
    }));
    return documents[0];
}
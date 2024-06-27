import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { signOut, getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import bcrypt from 'bcryptjs';

export async function getUsers() {
    const users = await getDocs(collection(db, 'users'));
    const documents = users.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return documents
}
export async function createUser(user: any, role: String) {
    const userExists = await existUser(user, `users`)
    if (await existUser(user, `company_users`)) {
        return 'This is company account, you can not access with this user.'
    }
    if (!userExists) {
        const newObj = {
            email: user.email,
            name: user.displayName,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photo: user.photoURL,
            role,
            companyId:user.companyId,
            password:user._password || '123123'
        };
        await addDoc(collection(db, 'users'), newObj);
        return true;
    }
}
export async function _createUser(user: any, role: String) {
    const newObj = {
        email: user.email,
        name: user.displayName,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photo: user.photoURL,
        role,
        companyId:user.companyId
    };
    await addDoc(collection(db, 'users'), newObj);
    return true;
}

export async function registerWithGithub(companyId) {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const result = signInWithPopup(auth, provider)
        .then(async result => {
            const user = result.user;
            if (await existUser(user, `company_users`)) {
                await signOut(auth)
                return 'This is company account, you can not access with this user.'
            }
            const isExistsThisCompany = await checkCompanyUser(user.email, companyId);
            if(isExistsThisCompany){
                await signOut(auth)
                return `Email is exists.`
            }else{
                await _createUser({...user,companyId}, `USER`);
            }
            localStorage.clear();
            localStorage.setItem('baseUrl', companyId)
            await createUser(user, `USER`);
            return true;
        })
        .catch(() => {
            console.log('error with git auth')
        });
    return result;
}

export async function registerWithGoogle(companyId) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    const result = signInWithPopup(auth, provider)
        .then(async (result) => {

            // This gives you a Google Access Token. You can use it to access the Google API.
            const user = result.user;
            if (await existUser(user, `company_users`)) {
                await signOut(auth)
                return 'This is company account, you can not access with this user.'
            }
            const isExistsThisCompany = await checkCompanyUser(user.email, companyId);
            if(isExistsThisCompany){
                await signOut(auth)
                return `Email is exists.`
            }else{
                await _createUser({...user,companyId}, `USER`);
            }
            localStorage.clear();
            localStorage.setItem('baseUrl', companyId)
            await createUser({...user,companyId}, `USER`);
            return true;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            console.log(error,'error---');

        });
    return result;
}

export async function loginWithGithub(companyId) {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider)
        .then(async result => {
            const user = result.user;
            if (await existUser(user, `company_users`)) {
                await signOut(auth)
                return 'This is company account, you can not access with this user.'
            }
            const isExistsThisCompany = await checkCompanyUser(user.email, companyId);
            if(!isExistsThisCompany){
                await signOut(auth);
                return `Email is not exists.`
            }
            localStorage.clear();
            localStorage.setItem('baseUrl', companyId)
            return true;
        })
        .catch(() => {
            console.log('error with git auth')
        })
    return result;
}
export async function loginWithGoogle(companyId) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    const result = await signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            if (await existUser(user, `company_users`)) {
                await signOut(auth);
                return 'This is company account, you can not access with this user.'
            }
            const isExistsThisCompany = await checkCompanyUser(user.email, companyId);
            if(!isExistsThisCompany){
                await signOut(auth);
                return `Email is not exists.`
            }
            localStorage.clear();
            localStorage.setItem('baseUrl', companyId)
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
    if (documents.length) {
        return true
    } else {
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
    console.log(documents.length ? true : false, 'documents');

    if (documents.length > 0) {
        return true
    } else {
        return false;
    }
}
export async function getCurrentUser(email) {
    const companyUsersCollection = collection(db, 'company_users');
    const q = query(companyUsersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    const UsersCollection = collection(db, 'users');
    const u_q = query(UsersCollection, where('email', '==', email));
    const u_querySnapshot = await getDocs(u_q);
    const u_documents = u_querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(documents.length > 0 ? documents[0] : u_documents[0], 'documents.length > 0 ? documents[0] : u_documents[0];');
    return documents.length > 0 ? `company` : `user`;

}
export async function checkCompanyUser(email, companyId) {
    const UsersCollection = collection(db, 'users');
    const u_q = query(UsersCollection, 
        where('email', '==', email),
        where('companyId', '==', companyId),
    );
    const u_querySnapshot = await getDocs(u_q);

    const u_documents = u_querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(u_documents,email, companyId,'4444');
    
    return u_documents.length > 0 ? true : false;
}
export async function checkPassword(email,password,companyId) {

    const UsersCollection = collection(db, 'users');
    const u_q = query(UsersCollection, 
        where('email', '==', email),
        where('companyId', '==', companyId),
    );
    const u_querySnapshot = await getDocs(u_q);
    const u_documents = u_querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    const user:any = u_documents[0];
    console.log(u_documents,'user');
    
    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(user,password,isMatch);
        if(isMatch){
            return true;
        }else{
            return false;
        }
    }

}
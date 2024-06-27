import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
export async function getSurveyLists() {
    const surveys = await getDocs(collection(db, 'surveys'));
    const documents = surveys.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return documents
}
export async function getCompanyInfo(id) {
    const companyDoc = await getDoc(doc(db, 'company_users', id));
    return (companyDoc.exists()) ? { id: companyDoc.id, ...companyDoc.data() } : null;

}
export async function getCompanySurvey(companyId:String) {
    const Collection = collection(db, 'surveys');
    const q = query(Collection, where('companyId', '==', companyId));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return documents;
}

export async function createSurvey(newObj:any) {
    const doc = await addDoc(collection(db, 'surveys'), newObj);
    return { id: doc.id, name: newObj['name'], json: newObj['json'] };
}
export async function removeSurvey(id: string) {
    await deleteDoc(doc(db, 'surveys', id));
}
export async function updateSurvey(id: string, json: any,companyId:string) {
    await updateDoc(doc(db, 'surveys', id), { json: json,companyId });
}
export async function getSurvey(id: any) {
    const surveyDoc = await getDoc(doc(db, 'surveys', id));
    return (surveyDoc.exists()) ? { id: surveyDoc.id, ...surveyDoc.data() as any } : null;
}
export async function postResult(id: string, json: any,userId:string) {
    await addDoc(collection(db, 'results'), { json: json ,userId});
}

export async function getResults(id: string) {    
    
    const surveys = await getDocs(collection(db, 'results'));
    const documents = surveys.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    const filteredResults = [...documents].filter(a=> a['json']['postid'] === id).map((item=>item['json']['surveyResultText']))
    return filteredResults;    
}

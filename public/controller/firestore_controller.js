import {
    getFirestore, collection, addDoc, getDocs, query, orderBy,
    doc, getDoc, where,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js"
//import { orderBy } from "lodash";
import { COLLECTIONS } from "../model/constants.js";
import { Reply } from "../model/reply.js";
import { Thread } from "../model/thread.js";
const db = getFirestore();

export async function addThread(thread) {
    const docRef = await addDoc(collection(db, COLLECTIONS.THREADS), thread.toFirestore());
    return docRef.id;
}

export async function getThreadList() {
    let threadList = [];
    const q = query(collection(db, COLLECTIONS.THREADS), orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const t = new Thread(doc.data());
        t.set_docId(doc.id);
        threadList.push(t);
    });
    return threadList;
}

export async function getOneThread(threadId) {
    const docRef = doc(db, COLLECTIONS.THREADS, threadId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const t = new Thread(docSnap.data());
    t.set_docId(threadId);
    return t;
}

export async function addReply(reply) {
    const docRef = await addDoc(collection(db, COLLECTIONS.REPLIES), reply.toFirestore());
    return docRef.id;
}

export async function getReplyList(threadId) {
    const q = query(collection(db, COLLECTIONS.REPLIES), where('threadId', '==', threadId), orderBy('timestamp'));
    const snapShot = await getDocs(q);

    const replies =[];
    snapShot.forEach(doc => {
        const r = new Reply(doc.data());
        r.set_docId(doc.id);
        replies.push(r);
    })

    return replies;
}

export async function searchThreads(keywordsArray){
    const threadList = [];
    //const q = query();
    const q = query(collection(db,COLLECTIONS.THREADS),
    where('keywordsArray','array-contains-any', keywordsArray),
    orderBy('timestamp','desc')
    );
    const snapShot = await getDocs(q);

    snapShot.forEach(doc => {
        const t = new Thread(doc.data());
        t.set_docId(doc.id);
        threadList.push(t);
    });
    return threadList;
}
import {useState, useEffect,useContext} from 'react';
import {database} from "../firebase"
import {AuthenticationContext} from "../Authenticated";

const useFirestore = (collection) => {
    const[docs, setDocs] = useState([]);
    const{user} = useContext(AuthenticationContext);
console.log(collection);
    useEffect(()=> {
        database.collection(collection)
            .where('uid','==',user.uid)
            .orderBy('createdAt', 'desc')
            .get()
            .then((snapshot)=>{
                let documents = [];
                snapshot.forEach((doc)=>{
                    if(doc.data().uid===user.uid){
                        const post={
                            caption: doc.data().caption,
                            imageUrl: doc.data().imageUrl,
                            timestamp: doc.data().timestamp,
                            uid: doc.data().uid,
                            username: doc.data().username,
                        }
                        documents.push(post);
                    }

                });
                    setDocs(documents);
            })
            /*.onSnapshot((snap)=> {
                let documents = [];
                snap.forEach(doc => {
                    console.log("hello");
                    // if(doc.data().uid===user.uid)
                    documents.push({imageUrl: doc.data().imageUrl, id: doc.id});
                });
                setDocs(documents);
            });*/

            //return () => unsub();

    }, [collection])

    return {docs};
}

export default useFirestore;
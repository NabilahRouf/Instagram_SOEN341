import {useState, useEffect,useContext} from 'react';
import {database} from "../Firebase/firebase"
import {AuthenticationContext} from "../Firebase/Authenticated";

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
    }, [collection])

    return {docs};
}

export default useFirestore;
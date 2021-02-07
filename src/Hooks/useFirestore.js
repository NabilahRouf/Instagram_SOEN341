import {useState, useEffect} from 'react';
import {database} from "../firebase"

const useFirestore = (collection) => {
    const[docs, setDocs] = useState([]);

    useEffect(()=> {
        const unsub = database.collection(collection)
        
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap)=> {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            });

            return () => unsub();

    }, [collection])

    return {docs};
}

export default useFirestore;
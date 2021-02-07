import {useState, useEffect} from 'react'
import {firebaseStorage, database, timestamp} from "../firebase"

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null); //image url we get back from storage after it's uploaded

    useEffect(()=>{
        // references
        const storageRef = firebaseStorage.ref(file.name);
        const collectionRef = database.collection('images');

        storageRef.put(file).on('state_changed', (snap)=> {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt});
            setUrl(url)
        })
    }, [file]);

    return {progress, url, error}
}

export default useStorage;
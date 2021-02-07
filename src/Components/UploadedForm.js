import React, {useState} from 'react'
import ProgressBar from './ProgressBar'
import './UploadedForm.css';


const UploadedForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const allowedTypes = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        // access files that the user selected
        let selected = e.target.files[0];

        // if we have a file, update the state
        if(selected && allowedTypes.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg');

        }

    }
    // if we have a file, then we'll output the progress bar
    return (
        <form className="uploadForm">
            <label className="uploadLabel">
                <input type= "file" onChange = {changeHandler}/>
                <span>+</span>
            </label>
            <div className = "output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file ={file} setFile={setFile}/>}  
            </div>
        </form>
    )
}
export default UploadedForm

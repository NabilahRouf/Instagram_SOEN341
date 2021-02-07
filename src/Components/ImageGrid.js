import React from 'react'
import useFirestore from '../Hooks/useFirestore'
import './ImageGrid.css';

const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore('images');
    console.log(docs);

    return(
        <div className = "imgGrid">
            {docs && docs.map(doc=>(
                <div className = "imgWrap" key = {doc.id}
                 onClick= {() => setSelectedImg(doc.url)}
                 >
                    <img src={doc.url} alt = "uploaded"/>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;
import React from "react";
import axios from 'axios';

import './stylesheets/Register.css'

const UploadImg = (props: {uploaded: (url: string) => void}) => {

    const upload = async (files: FileList | null ) => {
        if (files === null) return;

        const formData = new FormData();
        formData.append('image', files[0]);

        try {
            const {data} = await axios.post('upload', formData);
            props.uploaded(data.url);
        }
        catch (err) {props.uploaded('http://localhost:8000/api/uploads/egg.jpeg')}
    }

    return (
        <div>
            <label className="btn btn-primary">
                Upload new avatar
                <input placeholder="upload avatar" type="file" hidden onChange={e => upload(e.target.files)}/>
            </label>
        </div>
    );

}

export default UploadImg
import React, { useState } from 'react';
import axios from "axios";
import '../GlobalCss.css';
import {useForm} from "react-hook-form";

function Upload() {
    const [uploadMessage, setUploadMessage] = useState('');
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const url = "http://localhost:8080"
    const {handleSubmit} = useForm();

    async function handleFormSubmit() {
        try {
            // Create a FormData object to store the file data
            const formData = new FormData();
            formData.append("file", file);
            // Send the post request using axios
            let response = await axios.post(`${url}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setData(response.data);
            setUploadMessage("File uploaded successfully!");
        } catch (error) {
            setUploadMessage("Error: " + error);
            console.error(error);
        }
    }

    function handleAudioChange(e){
        let reader = new FileReader()

        let file = e.target.files[0]

        reader.onloadend = () => {
            setFile(file)
        }
        reader.readAsDataURL(file);
    }


    return (
        <>
            <h1>Upload a File</h1>
            <section className={"upload-container"}>
                <div className={"upload-inner-container"}>
                    <div className={"choose-file-container"}>
                    <input className={"input-choose-file"} onChange={handleAudioChange} type="file" name="file"/>
                    <form  className={"loggbutton2-direction"} onSubmit={handleSubmit(handleFormSubmit)}>
                        <button  className={"logbutton2"} type="submit">Upload</button>
                    </form>
                    </div>
                    {uploadMessage && <p>{uploadMessage}</p>}

                    <h2 className={"more-upload-text"}>1. Select choose File to Search for your vocal</h2>
                    <h2 className={"more-upload-text"}>& press the Upload button!</h2>
                </div>
            </section>
        </>
    );
}

export default Upload;
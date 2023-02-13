import React, { useState } from 'react';
import axios from "axios";
import '../uploadGood.css';
import {useForm} from "react-hook-form";

function Upload() {
    const [uploadMessage, setUploadMessage] = useState('');
    const [fieldUploadMessage, setFieldUploadMessage] = useState('');
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [genre, setGenre] = useState('');
    const [bpm, setBpm] = useState(0);
    const [artist, setArtist] = useState('');
    const url = "http://localhost:8080"
    const {handleSubmit} = useForm();
    const jwt = localStorage.getItem('token')

    async function handleFormSubmit() {
        if (!genre || !bpm || !artist) {
            setFieldUploadMessage("Error: All fields are required if it doesnt work refresh the page and fill in all fields");
            return;
        }
        try {
            // Create a FormData object to store the file data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("genre", genre);
            formData.append("bpm", bpm);
            formData.append("artist", artist);
            // Send the post request using axios
            let response = await axios.post(`${url}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization : `Bearer ${jwt}`
                }
            });
            setData(response.data);
            setUploadMessage("File uploaded successfully!");

        } catch (error) {
            setUploadMessage("Error: " + error);
            setFieldUploadMessage("error" + error);
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
                            <div className={"inputs-info"}>
                            <input className={"info-field"} name="genre" placeholder="GENRE" onChange={e => setGenre(e.target.value)}/>
                            <input className={"info-field"} name="bpm" placeholder="BPM" onChange={e => setBpm(e.target.value)}/>
                            <input className={"info-field"} name="artist" placeholder="ARTIST" onChange={e => setArtist(e.target.value)}/>
                                {fieldUploadMessage && <p>{fieldUploadMessage}</p>}
                            <button  className={"logbutton2"} type="submit">Upload</button>
                            </div>
                        </form>
                    </div>
                    {uploadMessage && <p>{uploadMessage}</p>}

                    <h2 className={"more-upload-text"}>1. Select choose File to Search for your vocal</h2>
                    <h2 className={"more-upload-text"}>2. Input the genre and BPM and Artist name</h2>
                </div>
            </section>
        </>
    );
}

export default Upload;
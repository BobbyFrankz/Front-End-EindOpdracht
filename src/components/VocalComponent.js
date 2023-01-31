import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VocalComponent.css';
import {useNavigate, useParams} from "react-router-dom";

const VocalComponent = ({vocal}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [audio] = useState(new Audio(data))

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/files");
                setData(response.data);
            } catch (e) {
                setError(e);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);






return (
    <>
        <div className={"vocal-outer-container"}>
        <div className="player">
            <div className="head">
                <div className="back"></div>
                <div className="front">
                    <div className="infos">
                        <div className="titulo_song"><strong>Title:</strong> {vocal.name} </div>
                        <div className="tags"><span>{vocal.audioInfo.genre}</span><span>BPM:{vocal.audioInfo.bpm}</span></div>
                        <div className="tags2"> <span>  <strong>Artist:</strong>  {vocal.audioInfo.artist} </span> </div>
                    </div>
                </div>
            </div>
            <div className="timeline">
                <div className="soundline"></div>
                <audio controls className={"audio-player"} src={vocal.url}>CLICK</audio>
            </div>
        </div>
        </div>


    </>
)}


export default VocalComponent;


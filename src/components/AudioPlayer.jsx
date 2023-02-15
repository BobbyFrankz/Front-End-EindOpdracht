import React, {useEffect, useState} from 'react';
import Howler from 'howler';
import './VocalComponent.css';
import axios, {Axios} from "axios";

function AudioPlayer({ src }) {
    const [sound, setSound] = useState([])
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const url = "http://localhost:8080"

    const FetchVocal = async () => {
        try {
            const response = await axios.get(`${url}/files`, {});
            setSound(response.data[0]);

        } catch (e) {
            console.error(e);
        }
    }
    useEffect( {
        FetchVocal
    },[])
    // console.log(sound)
    const blob = new Blob([sound],{type:`audio/wave`});
    const url2 = URL.createObjectURL(blob);
    const audio = new Audio(url2)
    //
    // let file = new Howler.Howl({
    //     src: [sound]});
    //
    // function play() {
    //     file.play();
    //     setPlaying(true);
    //     setDuration();
    // }
    //
    // function pause() {
    //     file.pause();
    //     setPlaying(false);
    // }
    //
    // function stop() {
    //     file.stop();
    //     setPlaying(false);
    //     setProgress(0);
    // }

        return (
            <div className="player">
                <div className="head">
                    <div className="back"></div>
                    <div className="front">
                        <div className="avatar"><img
                            src="http://vignette4.wikia.nocookie.net/lyricwiki/images/1/15/Semisonic_portrait.jpg/revision/latest?cb=20090409134209"/>
                        </div>
                        <div className="infos">
                            <div className="titulo_song">Your music file here</div>
                            <div className="duracao_song"><i className="fa fa-clock-o">
                                Total time:</i></div>
                            <div className="tags"><span>Genre</span><span>BPM</span></div>
                        </div>
                    </div>
                </div>
                <div className="timeline">
                    <div className="soundline"></div>
                    <div className="controllers active">

                    </div>
                </div>
            </div>
        );
}
export default AudioPlayer;







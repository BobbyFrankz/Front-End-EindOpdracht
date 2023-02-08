import React, {useContext, useEffect, useState} from 'react';
import './RatingComponent.css';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

const RatingComponent = ({ initialValue = 0, vocalId }) => {
    const [value, setValue] = useState(initialValue);
    const [comment, setComment] = useState("LATER");
    const [error, setError] = useState('');
    const [average, setAverage] = useState(0);
    const [userHasRated, setUserHasRated] = useState(false);
    const { user : { username } } = useContext(AuthContext)
    const jwt = localStorage.getItem('token')
    const url = "http://localhost:8080";

    const handleChange = (newValue) => {
        setValue(newValue);
        if (value !== 0 && !userHasRated) {
            void CreateRating()
            console.log(value)
            setValue(0)
        } else {
            console.log("already rated")
        }
    };


    const CreateRating = async (e) => {
        try {
            const response = await axios.post(`${url}/rating/${vocalId}/${username}`, {
                username: username,
                score: value,
                comment : comment,
                Authorization : `Bearer ${jwt}`
            })
            if(response.status === 200) {
                console.log("The Rating has been posted!")
                setUserHasRated(true)

            }
        } catch ( e ) {
            if(axios.isCancel(e)){
                console.log('The axios request was cancelled')
            } else {
                console.error(e.response.data.message)
                setError(e.response.data.message)
            }
        }
    }
    useEffect(() => {
        const GetAllRatings = async () => {
            try {
                const response = await axios.get(`${url}/files/ratings/${vocalId}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                const scores = response.data.ratings.map(rating => rating.score);

                if (scores.length > 0) {
                    const avg = scores.reduce((sum, score) => sum + score) / scores.length;
                    setAverage(avg);
                }

                if (Array.isArray(response.data)) {
                    const userRatings = response.data.filter(rating => rating.username === username);
                    if (userRatings.length > 0) {
                        setUserHasRated(true);
                    }
                }
                if (response.status === 200) {

                }
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log("The axios request was cancelled");
                } else {
                    console.error(e.message);
                    setError(e.message);
                }
            }
        };
        GetAllRatings();
    }, [jwt, value]);

    return (
        <>
        <div className={"rate-container"}>


            <div className="rate">
                <input type="radio" id="star5" name="rate" value="5" onClick={() => handleChange(5)} disabled={userHasRated}/>
                <label htmlFor="star5" title="text" onClick={() => handleChange(5)}>5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" onClick={() => handleChange(4)} disabled={userHasRated}/>
                <label htmlFor="star4" title="text" onClick={() => handleChange(4)}>4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" onClick={() => handleChange(3)} disabled={userHasRated}/>
                <label  htmlFor="star3" title="text" onClick={() => handleChange(3)}>3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" onClick={() => handleChange(2)} disabled={userHasRated}/>
                <label htmlFor="star2" title="text" onClick={() => handleChange(2)}>2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" onClick={() => handleChange(1)} disabled={userHasRated}/>
                <label htmlFor="star1" title="text" onClick={() => handleChange(1)}>1 star</label>
            </div>
            <div className={"rating-text"}>
                <h3>Rated Average: {average.toFixed(1)}</h3>
            </div>

            </div>

        </>
    );
};

export default RatingComponent;
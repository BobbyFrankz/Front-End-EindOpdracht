import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const url = "http://localhost:8080"

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`${url}/files`)
            .then((res) => {
                setResults(res.data);
            });

    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} onChange={handleChange} onSubmit={handleSubmit} placeholder="Search Here"/>
            <button type="reset"></button>
            {results.map((result) => (
                <div key={result.id}>{result.title}</div>
            ))}
        </form>
    );
}

export default Search
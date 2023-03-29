import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'

function ResultList({ results }) {
    return (
        <ul className="result-list">
            {results.map((result) => (
                <li key={result.id} className="result-item">
                    {result.title}
                </li>
            ))}
        </ul>
    );
}

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [displayResults, setDisplayResults] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const jwt = localStorage.getItem('token')
    const url = "http://localhost:8080"

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`${url}/users`, {

                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${jwt}`
                }
            });
            setResults(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    const handleClear = () => {
        setSearchTerm('');
        setResults([]);
    }
        return (
            <form className="search-box"
                  onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for Users or emails"
                />
                <button
                    className={"button-search"}
                    type="submit">Search</button>
                {searchTerm !== ''  && (
                    <button className={"button-search"}
                            type="button"
                            onClick={handleClear}>
                        Clear
                    </button> )}
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <ul className="results-list">
                    {searchTerm !== '' && (
                        <ul>
                            {results.filter(result => result.email.includes(searchTerm) || result.username.includes(searchTerm)).length === 0 ? (
                                <p>No results? try the search button.</p>
                            ) : (
                                results
                                    .filter(result => result.email.includes(searchTerm) || result.username.includes(searchTerm))
                                    .map((result) => (
                                        <li className="result-item" key={result.username}>
                                            <div>
                                                <strong>Username :</strong> {result.username} <strong>Email :</strong> {result.email}
                                            </div>
                                        </li> ))
                                )}
                        </ul>
                    )}
                </ul>
            </form>
    );
}

export default Search;
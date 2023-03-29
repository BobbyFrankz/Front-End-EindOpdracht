import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Profile.css';
import vocaly from '../../assets/vocaly.PNG'
import jwt_decode from "jwt-decode";

const jwToken = localStorage.getItem('token')
const authAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${jwToken}`,
    },
});


function Profile() {

    const url = "http://localhost:8080"
    const {user, username, fetchUserData, data} = useContext(AuthContext);
    const jwt = localStorage.getItem("token")
    const decodedToken = jwt_decode(jwt);
    const [artistOrProducer, setArtistOrProducer] = useState("")
    const [userList, setUserList] = useState([]);
    const [userList2, setUserList2] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    let imageUrl = '';
    if (data && data.image && data.image.data) {
        imageUrl = `data:image/*;base64,${(data.image.data)}`;
    } else {
        imageUrl = vocaly;
    }

    const filteredUserList = userList.filter(user => {

        if (user.username === "admin") {
            return false;
        }

        if (searchQuery) {
            const usernameLower = user.username.toLowerCase();
            const emailLower = user.email.toLowerCase();
            const searchQueryLower = searchQuery.toLowerCase();
            return usernameLower.includes(searchQueryLower) || emailLower.includes(searchQueryLower);
        }

        return true;
    });
    const filteredUserList2 = userList2.filter(user => {

        if (user.username === "admin") {
            return false;
        }
        if (searchQuery) {
            const usernameLower = user.username.toLowerCase();
            const emailLower = user.email.toLowerCase();
            const searchQueryLower = searchQuery.toLowerCase();
            return usernameLower.includes(searchQueryLower) || emailLower.includes(searchQueryLower);
        }

        return true;
    });

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUser2, setSelectedUser2] = useState("");


    function handleUserSelect(event) {
        setSelectedUser(event.target.value);
    }

    function handleUserSelect2(event) {
        setSelectedUser2(event.target.value);
    }

    function handleEmailChange(event) {
        setNewEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setNewPassword(event.target.value);
    }


    useEffect(() => {
        fetchUserData(jwt, decodedToken.sub)
    }, [decodedToken.sub])

    useEffect(() => {
        authAxios.get('/users')
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        authAxios.get('/users')
            .then(response => {
                setUserList2(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    function handleDeleteSelectedUser() {
        if (!selectedUser) {
            return;
        }

        authAxios
            .delete(`${url}/users/${selectedUser}`)
            .then(response => {
                // Handle successful deletion
                console.log("user deleted")
            })
            .catch(error => {
                // Handle error
            });
    }

    function handleUpdateUser() {


        authAxios.put(`${url}/users/${selectedUser2}`, {
                username: selectedUser2,
                password: newPassword,
                email: newEmail,
                headers: {
                    Authorization: `Bearer ${jwToken}`
                }
            }
        )
            .then(response => {
                // Handle successful update
                console.log("User updated:", response.data);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }


    return (
        <>

            <main className={"container-profile"}>
                <header>
                    <h1>Profile Page</h1>
                </header>
                <section>
                    <p><strong>UserName:</strong>{user.username}</p>
                </section>

                {user.username === "admin" ? (

                    <div>
                        <section>
                            <p><strong>Role:</strong> Administrator</p>
                            <p>This is the admin page</p>
                        </section>


                        <section>
                            <h4>Delete a user</h4>
                            <select value={selectedUser}
                                    onChange={handleUserSelect}>
                                <option
                                    value="">Select a user...
                                </option>
                                }
                                {filteredUserList.map(user => (
                                    <option key={user.username}
                                            value={user.username}>{user.username} ({user.email})
                                    </option>
                                ))}
                            </select>

                            <button type={"submit"}
                                onClick={handleDeleteSelectedUser}>Delete User
                            </button>


                            <input type="text"
                                   placeholder="Search for a user, then open the list above"
                                   value={searchQuery}
                                   onChange={e => setSearchQuery(e.target.value)}/>
                        </section>


                        <section>
                            <h4>Update User Info</h4>
                            <select
                                value={selectedUser2}
                                onChange={handleUserSelect2}>
                                <option
                                    value="">Select a user...
                                </option>
                                }
                                {filteredUserList2.map(user => (
                                    <option key={user.username}
                                            value={user.username}>{user.username} ({user.email})</option>
                                ))}
                            </select>
                            <br/>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    placeholder={user.email}
                                    value={newEmail}
                                    onChange={handleEmailChange}
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                            <button
                                type={"submit"}
                                onClick={handleUpdateUser}>Update User</button>
                        </section>

                    </div>

                ) : (
                    <section>
                        <p><strong>Email:</strong>{user.email}</p>
                        <div>
                            <p>
                                {user.artistOrProducer === true ? "Artist" : "Producer"}
                            </p>
                        </div>
                    </section>
                )}

                <picture>
                    {imageUrl ? <img src={imageUrl} alt="Photo with microphone"/> : null}
                </picture>

            </main>
        </>
    );
}

export default Profile;
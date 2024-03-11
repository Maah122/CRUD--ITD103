import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/create', { name, email, age })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="d-flex vh-100 bg-custom-primary justify-content-center align-items-center">
            <div className="w-50 bg-custom-white rounded p-3 shadow">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-3">Add User</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="text"
                            id="age"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-custom-primary me-2">Submit</button>
                    <button type="button" className="btn btn-custom-danger" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;

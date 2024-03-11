import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/update/' + id, { name, email, age })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <div className="d-flex vh-100 bg-custom-primary justify-content-center align-items-center">
            <div className="w-50 bg-custom-white rounded p-3 shadow">
                <form onSubmit={handleUpdate}>
                    <h2 className="mb-3">Update User</h2>
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
                    <button type="submit" className="btn btn-custom-primary me-2">Update</button>
                    <button type="button" className="btn btn-custom-danger" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;

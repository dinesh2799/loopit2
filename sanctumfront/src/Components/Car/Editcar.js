import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Editcar = () => {


    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [setInput, setCar] = useState([]);
    const [errorInput, setError] = useState([]);
    const navigate = useNavigate();
    const params = useParams()
    const car_id = params.id

    useEffect(() => {
        axios.get(`api/cars/${car_id}/edit`).then( res => {

            if(res.data.status === 200)
            {
                setCar(res.data.car);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/cars');
            }
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setCar({...setInput, [e.target.name]: e.target.value });
    }

    const updateCar = (e) => {

        e.preventDefault();
        
        const car_id = params.id
        const data = {
            model:setInput.model,
            brand:setInput.brand,
            stock:setInput.stock,
            booked:setInput.booked,
        }

    
        axios.put(`api/cars/${car_id}`,data).then(
            res => {
                console.log(res)
                swal("Success!",res.data.message,"success");
                navigate('/cars');
            }
        ).catch(
            err => {
                console.log(err.response.data)
                setError(err.response.data.message);
            }
        )
    }

    if(loading)
    {
        return <h4>Loading Edit Car Data...</h4>
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Car Details 
                                    <Link to={'/cars'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateCar} >
                                    <div className="form-group mb-3">
                                        <label>Car Model</label>
                                        <input type="text" name="model" onChange={handleInput} value={setInput.model} className="form-control" />
                                        <span className="text-danger">{errorInput.model}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Car Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={setInput.brand} className="form-control" />
                                        <span className="text-danger">{errorInput.brand}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Stock</label>
                                        <input type="text" name="stock" onChange={handleInput} value={setInput.stock} className="form-control" />
                                        <span className="text-danger">{errorInput.stock}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Booked</label>
                                        <input type="text" name="booked" onChange={handleInput} value={setInput.booked} className="form-control" />
                                        <span className="text-danger">{errorInput.booked}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Car</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editcar;

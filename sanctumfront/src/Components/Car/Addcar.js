import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Addcar = () => {

    const navigate = useNavigate();
    const [setInput, setCar] = useState({
        model: '',
        brand: '',
        stock: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCar({...setInput, [e.target.name]: e.target.value })
    }

    const saveCar = (e) => {
        e.preventDefault();
        
        const data = {
            model:setInput.model,
            brand:setInput.brand,
            stock:setInput.stock,
        }

        axios.post('api/cars',data).then(
            res => {
                console.log(res)
                swal("Success!",res.data.message,"success");
                navigate('/cars');
            }
        ).catch(
            err => {
                console.log(err.response.data)
                setCar({...setInput, error_list: err.response.data.message });
            }
        )
    }

    return (
        <div className='car-container'>
            <div className='car-inner'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Car 
                                    <Link to={'/cars'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveCar} >
                                    <div className="form-group mb-3">
                                        <label>Car Model</label>
                                        <input type="text" name="model" onChange={handleInput} value={setInput.model} className="form-control" />
                                        <span className="text-danger">{setInput.error_list.model}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Car Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={setInput.brand}  className="form-control" />
                                        <span className="text-danger">{setInput.error_list.brand}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Total stock</label>
                                        <input type="text" name="stock" onChange={handleInput} value={setInput.stock}  className="form-control" />
                                        <span className="text-danger">{setInput.error_list.stock}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Car</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Addcar;

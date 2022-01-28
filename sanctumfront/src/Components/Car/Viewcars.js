
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
// import { Button } from "reactstrap";
import swal from 'sweetalert';

const Viewcars = () => {


    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`api/cars`).then(res=>{
            if(res.status === 200)
            {
                console.log(res)
                setCars(res.data.data)
                console.log(cars)
                setLoading(false);
            }
        });
    }, []);

    

    const deleteCar = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`api/cars/${id}`).then(
            res=>{
                console.log(res)
                thisClicked.closest("tr").remove();
                swal("Deleted!",res.data.message,"success");
                navigate('/cars');
            }
        );
    }

    if(loading)
    {
        return <h4>Loading Cars...</h4>
    }
    else
    {
        var car_HTMLTABLE = "";
       
        car_HTMLTABLE = cars.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.model}</td>
                    <td>{item.brand}</td>
                    <td>{item.stock}</td>
                    <td>{item.booked}</td>
                    <td>{item.available}</td>
                    <td>
                        <Link to={`editcar/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteCar(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>  
                </tr>
            );
        });
    }


  return (
    <div>
        {/* <div className="col-xl-3 col-sm-12 col-md-3">
        </div> */}
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>All CARS
                                <Link to={'addcar'} className="btn btn-primary btn-sm float-end"> Add Car</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Model</th>
                                        <th>Brand</th>
                                        <th>Total Cars</th>
                                        <th>Booked</th>
                                        <th>In Stock</th>
                                        <th>Edit</th>
                                        <th>Delete</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {car_HTMLTABLE}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Viewcars;

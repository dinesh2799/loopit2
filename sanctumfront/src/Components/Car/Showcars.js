
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Showcars = ({user}) => {
    console.log({user})

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {

        axios.get(`api/cars`).then(res=>{
            if(res.status === 200)
            {
                // console.log(res)
                setCars(res.data.data)
                setLoading(false);
            }
        });
    }, []);


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
                    <td>{item.model}</td>
                    <td>{item.brand}</td>
                    <td>{item.available}</td>
                </tr>
            );
        });
    }


    if({user}){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>CARS
                                    </h4>
                                </div>
                                <div className="card-body">
                                    
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Model</th>
                                                <th>Brand</th>
                                                <th>In Stock</th>
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
    }
    return(
            <h2>You are not logged in</h2>
        )
    
    
}
export default Showcars;
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import swal from 'sweetalert';

const Car = () => {

    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`api/cars`).then(res=>{
            if(res.status === 200)
            {
                // console.log(res.data.data)
                const items = res.data.data
                const jsondata = JSON.stringify(items)
                console.log(jsondata)
                setCars(items)
                setLoading(false);
            }
        });
    }, []);
    console.log(cars)

      
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

    const columns = [
        {dataField:'id', text:'ID', sort:true, filter:textFilter()},
        {dataField:'model', text:'Model', sort:true, filter:textFilter()},
        {dataField:'brand', text:'Brand', sort:true, filter:textFilter()},
        {dataField:'stock', text:'Total Cars',sort:true, filter:textFilter()},
        {dataField:'booked', text:'Booked',sort:true, filter:textFilter()},
        {dataField:'available', text:'In Stock',sort:true, filter:textFilter()},
        {
            dataField: "databasePkey",
            text: "Edit",
            formatter: (cellContent, row) => {
                return (
                    <Link to={`/cars/editcar/${row.id}`} className="btn btn-success btn-sm">Edit</Link>
                  );
            },
        },
        {
            dataField: "databasePkey",
            text: "Delete",
            formatter: (cellContent, row) => {
                return (
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={(e) => deleteCar(e, row.id)}
                    >
                      Delete
                    </button>
                  );
            },
        },

        
    ]

    const pagination = paginationFactory({
        page:1,
        sizePerPage:10,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange: function(page, sizePerPage){
            console.log('page',page)
            console.log('sizeperpage',sizePerPage)
        },
        onSizePerPageChange: function(page, sizePerPage){
            console.log('page',page)
            console.log('sizePerPage',sizePerPage)
        }
    })



  return (
    <div className='car-container'>
        <div className='car-inner'>
            <div className="container" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>All CARS
                                    <Link to={'addcar'} className="btn btn-primary btn-sm float-end"> Add Car</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                            <BootstrapTable striped hover  bootstrap4 keyField='id' columns={columns} data={cars} pagination={pagination} filter={filterFactory()} />
  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Car;

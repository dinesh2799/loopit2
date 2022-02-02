import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home';
import Nav from './Components/Nav';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import axios from 'axios';
// import Viewcars from './Components/Car/Viewcars';
import Addcar from './Components/Car/Addcar';
import Editcar from './Components/Car/Editcar';
import PageNotFound from './Components/PageNotFound';
import PrivateRoute from './PrivateRoute';
import Showcars from './Components/Car/Showcars';
import Car from './Components/Car/test/Car';
import AdminRoute from './AdminRoute';

export default class App extends Component {

  state = {}
  componentDidMount = () => {
      axios.get('api/user').then(
          res => {
            // console.log(res.data.role)
            if(res.data.role===1)
            {
                localStorage.setItem("admin",true)
            }
            if(res.data.role===0)
            {
              localStorage.setItem("admin",false)
            }
              this.setUser(res.data)
          },
          err => {
              // console.log(err);
          }
      )
  }

  setUser = user => {
     this.setState({
        user:user
      });
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Nav  user={this.state.user} setUser= {this.setUser} />
        {/* <div className='auth-wrapper'>
          <div className='auth-inner'> */}
            <Routes>

                <Route exact path='/cars' element={<AdminRoute/>}>
                    <Route exact path='/cars' element= {<Car user = {this.state.user} />} />
                    <Route  exact path="/cars/addcar" element={<Addcar  user = {this.state.user}/>} />
                    <Route exact path= "/cars/editcar/:id" element={<Editcar user = {this.state.user} />} />
                </Route>

                <Route exact path='/cars' element={<PrivateRoute/>}>
                <Route exact path='/cars/all' element= {<Showcars user = {this.state.user} />} />
                </Route>

                
                <Route exact path='/home' element= {  <Home user = {this.state.user}/>} />
                <Route exact path='/' element= {  <Home user = {this.state.user}/>} />
                <Route exact path='/login' element= {<Login setUser= {this.setUser} />} />
                <Route exact path='/register' element= {<Register/>} />
                {/* <Route exact path= '/carpage' element = {<Car /> } /> */}
                
                <Route path="*" element={<PageNotFound />} />

            </Routes>
          {/* </div>
        </div> */}
        
      </div>
      </BrowserRouter>
      
    );
  }
}

// export default App;

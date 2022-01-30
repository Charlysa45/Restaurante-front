import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import Images from '../Components/Images';

const Home = () => {
  return <div>

    <div className="Portada">
        <header className="main-header">
            <div className="background-overlay text-white d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="header-content">
                            <img src={Images.RestLogo} alt="" className='img-fluid d-block'/>
                            <div className='d-flex justify-content-center'>
                                <h3>¡Tus restaurantes y menús en un solo lugar!</h3>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
    <div className='container'>
        <div className="d-flex py-5 justify-content-center">
            <Link to='restaurantes'><button className='btn btn-success fs-2'>Restaurantes</button></Link>
            <Link to="menus"><button className='btn btn-warning fs-2 mx-3'>Menús</button></Link>
        </div>
    </div>
  </div>;
};

export default Home;

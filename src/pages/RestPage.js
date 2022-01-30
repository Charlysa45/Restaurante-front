import React, { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import CardMenu from '../Components/CardMenu';
import ApiContext from '../Components/Context/ApiContext';
import FormMenu from '../Components/FormMenu';
import { useModal } from '../Components/Hooks/useModal';
import Images from '../Components/Images';
import Modal from '../Components/Modal';
import './RestPage.css'

const RestPage = () => {

    const {allRestaurants} = useContext(ApiContext);
    const[isOpenModal, openModal, closeModal] = useModal(false);
    const {restInfo} = useParams()

    const [rest, setRest] = useState(null);
    const [menus, setMenus] = useState(null);
    const [menuType1, setMenuType1] = useState('');
    const [menuType2, setMenuType2] = useState('');
    const [menuType3, setMenuType3] = useState('');
    const [menuType4, setMenuType4] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
      const rest = allRestaurants.find(res =>res.socialReason.replace('%20',' ') === restInfo)
      setRest(rest)

      if (rest) {
          handleType(rest.restType)
          if(rest.menus){
              setMenus(rest.menus)
            }else{
                setMenus(null)
            }
      }else{
          setMenus(null)
      }
    }, [allRestaurants]);

    useEffect(() => {
        if (menus) {
            console.log(menus)
            const type1 = menus.filter(res => res.menuType === 1)
            type1 ? setMenuType1(type1) : setMenuType1(null)
            
            const type2 = menus.filter(res => res.menuType === 2)
            type2 ? setMenuType2(type2) : setMenuType2(null)
            
            const type3 = menus.filter(res => res.menuType === 3)
            type3 ? setMenuType3(type3) : setMenuType3(null)
            
            const type4 = menus.filter(res => res.menuType === 4)
            type4 ? setMenuType4(type4) : setMenuType4(null)
            console.log(type4)
        }
    }, [menus]);

    const handleType = (numType) => {
        if (numType == 1) {
            setType('Vegano')
        }else if(numType == 2){ 
            setType('Vegetariano')
        }else if(numType == 3){
            setType('Carnes Rojas')
        }else if(numType == 4){
            setType('Aves, Pescados & Mariscos')
        }
    }

  return <div>
      <div className="container py-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/" className='link-success' style={{textDecoration:'none'}}>Inicio</Link></li>
                <li class="breadcrumb-item"><Link to="/restaurantes" className='link-success' style={{textDecoration:'none'}}>Restaurantes</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{rest && rest.socialReason}</li>
            </ol>
        </nav>

          <div className="restContent p-5 text-white">
              <h1 className='restTitle' style={{fontSize: '7rem'}}>
                  {rest &&
                    rest.socialReason
                  }
                </h1>
              <div className="restInfo row row-cols-4">
                <h3>Tipo de restaurante: <h3 className='text-dark'>{type}</h3></h3>
                <h3>Ciudad: <h3 className='text-dark'>{rest && rest.city}</h3></h3>
                <h3>Hora de apertura: <h3 className='text-dark'>{rest && rest.hourOpen}</h3></h3>
                <h3>Hora de cierre: <h3 className='text-dark'>{rest && rest.hourClose}</h3></h3>
              </div>

              <div className='menus mt-5'>
                  <h1>Menús</h1>
                  <button onClick={openModal} className='btn btn-light mb-3'>
                    <div className="row">
                        <div className="col-3">
                            <div className="newRest-user-card">
                                <AiOutlinePlus size={65}/>
                            </div>
                        </div>
                        <div className="col-9 mx-0 d-flex align-items-center">
                            <div className="newRest-title">    
                                <h5>Añadir nuevo menú</h5>
                            </div>    
                        </div>
                    </div>
                </button>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    <FormMenu/>
                </Modal>

                  <h2 className='mt-2'>Entrada.</h2>
                  <div className='row row-cols-3'>
                      {!menuType1.length ?
                        <div className="p-3">
                                    <div className="emptyMenu d-flex justify-content-center align-items-center">
                                    <h2 className="text-black p-4">Sin menús aun</h2>
                                    </div>
                        </div>
                        :
                        menuType1.map(res =>
                                <CardMenu 
                                    key={res.id}
                                    restId={res.id}
                                    restPage={false}
                                    bg={'bg-dark'}
                                    menuType={res.menuType}
                                    nameMenu={res.nameMenu}
                                    ingredients={res.ingredients}
                                    price={res.price}
                                    />
                                )
                        }
                    
                  </div>
                  <h2 className='mt-2'>Platos Fuertes.</h2>
                  <div className='row row-cols-3'>
                      {!menuType2.length?
                            <div className="p-3">
                                     <div className="emptyMenu d-flex justify-content-center align-items-center">
                                        <h2 className="text-black p-4">Sin menús aun</h2>
                                     </div>
                            </div>
                            :
                            menuType2.map(res =>
                                <CardMenu 
                                    key={res.id}
                                    restId={res.id}
                                    restPage={false}
                                    bg={'bg-dark'}
                                    nameMenu={res.nameMenu}
                                    ingredients={res.ingredients}
                                    price={res.price}
                                    />
                                )
                        }
                            
                    
                  </div>
                  <h2 className='mt-2'>Postres.</h2>
                  <div className='row row-cols-3'>
                      {!menuType3.length ?
                            <div className="p-3">
                                     <div className="emptyMenu d-flex justify-content-center align-items-center">
                                        <h2 className="text-black p-4">Sin menús aun</h2>
                                     </div>
                            </div>
                            :
                            menuType3.map(res =>
                                <CardMenu 
                                    key={res.id}
                                    restId={res.id}
                                    restPage={false}
                                    bg={'bg-dark'}
                                    nameMenu={res.nameMenu}
                                    ingredients={res.ingredients}
                                    price={res.price}
                                    />
                                )
                    }
                  </div>
                  <h2 className='mt-2'>Bebidas.</h2>
                  <div className='row row-cols-3'>
                      {!menuType4.length ?
                            <div className="p-3">
                                     <div className="emptyMenu d-flex justify-content-center align-items-center">
                                        <h2 className="text-black p-4">Sin menús aun</h2>
                                     </div>
                            </div>
                            :
                            menuType4.map(res =>
                                <CardMenu 
                                    key={res.id}
                                    restId={res.id}
                                    restPage={false}
                                    bg={'bg-dark'}
                                    nameMenu={res.nameMenu}
                                    ingredients={res.ingredients}
                                    price={res.price}
                                    />
                                )
                    }
                  </div>
              </div>
          </div>
      </div>
  </div>;
};

export default RestPage;


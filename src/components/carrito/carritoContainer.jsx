import React from 'react'
import { contextoUser } from '../usercontext/UserContext'
import { useContext, useState, useEffect } from 'react';
import CarritoProducto from '../carritoProducto/carritoProducto';
import axios from 'axios';
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'


const Carrito = () => {

  const {carritoSave,getProductCart,userSave } = useContext(contextoUser);
  const {STYLES} = useContext(contextoGlobal);
  const [carritoProducts, setCarritoProducts] = useState(carritoSave);
  //const [ProductosCarito, setProductosCarito] = useState(0);
  
  const baseURL = `https://localhost:4000/carritos/${userSave.user.id}/checkout`;//ERORRRRRR
  


  useEffect(() => {
 
    setCarritoProducts(carritoSave);

  },[carritoSave])


  const handleComprar = () => {
    if (carritoSave[0].products.length == 0){
      alert('No hay productos')
    } else {
    axios
      .post(baseURL,{
          nombre: userSave.user.username,
         email:  userSave.user.email,
         productos: carritoSave[0].products,
     },{headers: {
      Authorization: `Bearer ${userSave.token} `
    }})
      .then((res) => {   
        getProductCart();   
        alert('El pedido ha sido realizado')
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
    }
 };


  return (
    <div>
        <h3>
            Productos en Carrito:
        </h3>
     
      
        {carritoProducts&& carritoProducts[0].products.length == 0 ?( <p>No hay productos en el carrito</p>):
        (<p></p>)
        }
        {    
        carritoProducts? (
        carritoProducts[0].products.map((producto, i) => {
          return (
            <li key={producto.id}>
              <CarritoProducto producto={producto}/>
            </li>
          );
        })
      ) : (
        <p>Su carrito esta cargando...</p>
      )}
    <button className={`${STYLES.boton}`} onClick={handleComprar}>Comprar</button>
    </div>
  )
 
}

export default Carrito
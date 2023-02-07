import React from 'react'
import axios from 'axios';
import { useContext} from "react";
import { contextoUser } from "../usercontext/UserContext";
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'

const CarritoProducto = ({producto}) => {

     const { PATH  } = useContext(contextoGlobal);
     const { STYLES  } = useContext(contextoGlobal);
    const {  userSave, getProductCart } = useContext(contextoUser);
    const baseURL = `https://${PATH}/carritos/${userSave.user.id}/productos/${producto.idProductoCarrito}`;

    const handleLogin = () => {
       axios
        .delete(baseURL,{headers: {
            Authorization: `Bearer ${userSave.token} `
         }})
        .then((res) => {
          getProductCart();   
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
        });
       
    };



  return (
    <div>
      <ul>
        {producto.title}---{producto.cantidad}
        <button className={`${STYLES.boton}`}  onClick={handleLogin}>Borar del carrito</button>
      </ul>
    </div>
  )
}

export default CarritoProducto
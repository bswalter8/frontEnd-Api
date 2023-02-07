import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { contextoUser } from "../usercontext/UserContext";
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'



const Producto = ({ producto, admin }) => {
  const { addUser, userSave, getProductCart } = useContext(contextoUser);
  const { PATH  } = useContext(contextoGlobal);
  const { STYLES  } = useContext(contextoGlobal);
  const baseURL = `https://${PATH}/carritos/${userSave.user.id}/productos`;



  const handleLogin = () => {

    axios
      .post(baseURL,{
             id: producto.id,
            title: producto.title,
            price: producto.price,
            cantidad: 1,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            thumbnail: producto.thumbnail
        },{headers: {
            Authorization: `Bearer ${userSave.token} `
        }})
      .then((res) => {
        getProductCart(baseURL);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <>
      
       <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{producto.title}"</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{producto.price}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{producto.descripcion}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{producto.categoria}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{producto.thumbnail}</td>
            {!admin&&<button  onClick={handleLogin}>
                <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Agregar al carrito</a>
                </td>
              
            </button>} 
        </tr>                 
    </>
  );
};

export default Producto;

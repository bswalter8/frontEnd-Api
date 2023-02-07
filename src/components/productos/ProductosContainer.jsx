import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import Producto from "../producto/producto";
import Carrito from "../carrito/carritoContainer";
import ChatContaier from "../chat/ChatContainer";
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'
import io from 'socket.io-client';
import AddProducto from "../AddProducto/AddProducto";
import { contextoUser } from '../usercontext/UserContext'

const Productos = ({admin}) => {
  const { PATH  } = useContext(contextoGlobal);
  const { STYLES  } = useContext(contextoGlobal);
  const baseURL = `https://${PATH}/productos`;
  const socket = io();
  const { productSave } = useContext(contextoUser);

  const [productos, setProductos] = useState([]);
  useEffect(() => {
 //   io('http://localhost:4000');
    axios
      .get(baseURL)
      .then((res) => {
        setProductos(res.data);
     //   getProductCart();
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  }, [productSave]);

  return (
    <div className="flex flex-col h-screen justify-evenly ">
      <div className={`${STYLES.back2} `}>
        <div className="overflow-auto text-slate-300">
           {admin?<AddProducto/>:<Carrito/>  }
        </div>
      </div>
      <div className={`${STYLES.back1}`}>
        <div className="h-80 ">
            <h3>Productos:</h3>
            {productos ? (
                <div class="flex flex-col">
                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                      <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden ">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead class="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-black-300 uppercase dark:text-gray-400">
                                          Titulo
                                      </th>
                                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-gray-400">
                                          Precio
                                      </th>
                                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-gray-400">
                                          Categoria
                                      </th>
                                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-gray-400">
                                          Descripcion
                                      </th>
                                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-300 uppercase dark:text-gray-400">
                                          Thumbnail
                                      </th>
                                      <th scope="col" class="p-4">
                                         <span class="sr-only">Edit</span>
                                      </th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  {
                                    productos.map((producto,i)=>{
                                      return(
                                        <Producto producto={producto}  admin={admin}/>
                                      )
                                    })
                                  }
                                    
                                </tbody>
                            </table>
                        </div>
                      </div>          
                    </div>  
                  </div>   
            ) : (
              <p>Se ha producido un error</p>
            )}
        </div>
      </div>
      <div className={`${STYLES.back2} flex-grow flex justify-evenly items-center`}>
        <ChatContaier className='h-full' socket={socket} admin={admin}/>  
      </div>
    </div>
  );
};

export default Productos;

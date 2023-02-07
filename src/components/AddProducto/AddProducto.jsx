import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { contextoGlobal} from '../GlobalProvider/GlobalProvider'
import { useState, useContext } from "react";
import FormData from 'form-data'
import { contextoUser } from '../usercontext/UserContext'


const AddProducto = () => {

  const {userSave, setProductSave } = useContext(contextoUser);

  const { PATH  } = useContext(contextoGlobal);
  const { STYLES  } = useContext(contextoGlobal);
  const baseURL = `https://${PATH}/productos`; 
  const imgURL =  `https://${PATH}/productos/img`; 
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [descripcion, setDescripcion] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState();  

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChanePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleChangeThumbnail = (e) => {
    setThumbnail(e.target.value);
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };



  const handleLogin = () => {
    if (title == "" || price == "" || descripcion == ""|| categoria == ""|| thumbnail == "") {
      alert("Debe llenar todos los campos");
    } else {
     
        let form = new FormData();
       
  /*      form.append('image',file);
    
        axios.post(imgURL, form, {
            headers: {
              'accept': 'application/json',
              'Content-Type': `multipart/form-data; `,
              Authorization: `Bearer ${userSave.token} `
            }
          }
           
          )
            .then((response) => {
              console.log('succceso')
            }).catch((error) => {
              //handle error
            });
          }*/
      axios
      .post(baseURL,{
            title: title,
            price: price,
            descripcion: descripcion,
            categoria: categoria,
            thumbnail: thumbnail
      },{headers: {
        Authorization: `Bearer ${userSave.token} `
      }})
      .then((res) => {
        setProductSave(res)
        alert('Producto agregado')
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
    }
  };

  return (
   <>
     
        <div>
          <p>Ingrese sus datos para registrar un nuevo producto: </p>
          <label>
            Nombre:
            <input type="text" onChange={handleChangeTitle} />
          </label>
          <label>
            Precio:
            <input type="number" onChange={handleChanePrice} />
          </label>
          <label>
            Categoria:
            <input type="text" onChange={handleChangeCategoria} />
          </label>
          <label>
            Descripcion:
            <input type="text" onChange={handleChangeDescripcion} />
          </label>
          <label>
            Thumbnail:
            <input type="text" onChange={handleChangeThumbnail} />
          </label>
            {/* <label>
            Imagen del producto:
            <input type="file" onChange={handleChangeFile} />
          </label>*/}
         
         
          <button className={`${STYLES.boton}`} onClick={handleLogin}>Agregar producto</button>
            
        
        </div>
        
  </>
  );
};

export default AddProducto;

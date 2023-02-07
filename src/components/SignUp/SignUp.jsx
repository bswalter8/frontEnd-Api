import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { contextoGlobal} from '../GlobalProvider/GlobalProvider'
import { useState, useContext } from "react";




const SignUp = () => {

  const { PATH  } = useContext(contextoGlobal);
  const baseURL = `https://${PATH}/signup`; 
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [userCreate, setUserCreate] = useState(false);
  const [username, setNombre] = useState("");
  const [cellphone, setTelefono] = useState("");
  const [address, setAdress] = useState("");

  const [age, setAge] = useState("");

  const handleChangeName = (e) => {
    setNombre(e.target.value);
  };
  const handleChangePhone = (e) => {
    setTelefono(e.target.value);
  };
  const handleChangeAdress = (e) => {
    setAdress(e.target.value);
  };
  const handleChangeEMail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };


  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };


  const handleLogin = () => {
    if (email == "" || password == "" || username == ""|| cellphone == ""|| address == "" || age == "") {
      alert("Debe llenar todos los campos");
    } else {
      axios
      .post(baseURL,{
        username:username,
        password:password,
        email: email,
        address: address, 
        cellphone: cellphone,
        age: age
      })
      .then((res) => {

      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
     setUserCreate(true);
    }
  };

  return (
   <>
      {userCreate ? (
        <p>Usuario creado con exito!</p>
      ) : (
        <div className="grid place-items-center h-screen ">
          <p className="text-3xl font-bold underline">Ingrese sus datos para registrar un nuevo usuario: </p>
          <label>
            Nombre de usuario:
            <input type="text" className="bg-blue-500 bg-opacity-25" onChange={handleChangeName} />
          </label>
          <label>
            Password:
            <input type="password"className="bg-blue-500 bg-opacity-25" onChange={handleChangePass} />
          </label>
          <label>
            Edad:
            <input type="number" className="bg-blue-500 bg-opacity-25" onChange={handleChangeAge} />
          </label>
          <label>
            Email:
            <input type="text" className="bg-blue-500 bg-opacity-25" onChange={handleChangeEMail} />
          </label>
          <label>
            Telefono:
            <input type="number" className="bg-blue-500 bg-opacity-25" onChange={handleChangePhone} />
          </label>
          
          <label>
            Direccion:
            <input type="text" className="bg-blue-500 bg-opacity-25" onChange={handleChangeAdress} />
          </label>
         
         
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleLogin}>Crear Usuario</button>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" to={"/"}>Volver</Link>
        </div>
      )}
  </>
  );
};

export default SignUp;

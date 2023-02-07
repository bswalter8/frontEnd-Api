import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import User from '../user/User'
import { contextoUser } from '../usercontext/UserContext'
import io from 'socket.io-client';
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'

const Login = () => {
    const { addUser, logOut, userSave } = useContext(contextoUser);
    const { PATH  } = useContext(contextoGlobal);
    const { STYLES  } = useContext(contextoGlobal);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [warning, setWarning] = useState(false);
    const [auth, setAuth] = useState(false);

  //  const [userData, setuserData] = useState();
  //  let userData ;
   // const baseURL = "//localhost:4000/login";

  //const auth = getAuth(app);

  const handleChangeUser = (e) => {
    setUser(e.target.value);
    setWarning(false);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
    setWarning(false);
  };

  const handleLogin = () => {
    axios
    .post(`https://${PATH}/login`, {
        username: user,
        password: pass
    })
    .then((res) => {
    //    userData = res.data.user;
      //  console.log(userData);
   //     setuserData(res.data.user)
        addUser(res.data);
    //    console.log('estee         '+userSave.user)
        setAuth(true);
    })
    .catch(error => {
        // Handle error.
        setAuth(false);
        setWarning(true);
        console.log('An error occurred:', error.response);
    });

  };
/*
  const handleLogOut = () => {
    logOut();
  };*/

  return (
   
    <>
    
      {!auth?(
        <div className="grid place-items-center h-screen ">
          <div className="h-96 flex-col ">
            <div>
              <div className="flex justify-center">
                <h1 className={`${STYLES.h1}`}>Login</h1>
              </div>
               <div>  
                <p className="mb-2" >Ingrese sus datos para ingresar: </p>
              </div>
            </div>  
            <div>
              <label className="mb-1" >
                User:
                <input type="text" className="bg-blue-500 bg-opacity-25 mb-1 " onChange={handleChangeUser} />
              </label>
            </div>
            <div>
              <label>
                Pass:
                <input type="password" className="bg-blue-500 bg-opacity-25 mb-3"onChange={handleChangePass} />
              </label>
            </div>
            <div className="flex justify-center">
              <button onClick={handleLogin} className={`${STYLES.boton}`}>Login</button>
              {warning?(<p>Contraseña o User invalido. Anda pa'ya bobo</p>):(<p></p>)}
            </div>  
            <div>
                <div>
                  <p className="mb-2">Si no esta registrado ingrese aqui: </p>
                </div>
                <div className="flex justify-center">
                  <Link   className={`${STYLES.boton}`} to={"/singup"}>Registrarse</Link>
                </div>
            </div>
          </div>
        </div>):
        (<p>
            <User user={userSave}/>
        </p>)}
        
     
    </>

  );
};

export default Login;

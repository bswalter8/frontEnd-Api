import React from 'react'
import Productos from '../productos/ProductosContainer'
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import { contextoGlobal} from '../GlobalProvider/GlobalProvider'

 const User = ({user}) => {
  const { PATH  } = useContext(contextoGlobal);
  const { STYLES  } = useContext(contextoGlobal);
  const [admin, setAdmin] = useState();
  const baseCheckAdmin = `https://${PATH}/isAdmin`;

  useEffect(() => {
    console.log(user)
    axios
    .get(baseCheckAdmin,{headers: {
      Authorization: `Bearer ${user.token} `
    }})
    .then((res) => {
       setAdmin(true);
       console.log(res)
       console.log('Usted es admin'); 
    })
    .catch(error => {
       setAdmin(false);
        console.log('An error occurred:', error.response);
    });

  },[])
 

  return (
    <div className='flex flex-col items-stretch'>
        <h2 className={`${STYLES.h1}`}>Bienvenido {user.user.username}!</h2>
        <Productos admin={admin}/>
    </div>

  )
}

export default User
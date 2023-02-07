import { createContext, useState, useContext } from "react";
import axios from "axios";
import { contextoGlobal } from '../GlobalProvider/GlobalProvider'

export const contextoUser = createContext();
const { Provider } = contextoUser;

const UserContext = ({ children }) => {
  const { PATH  } = useContext(contextoGlobal);  
  const [userSave, setUserSave] = useState();
  const [carritoSave, setCarritoSave] = useState();
  const [productSave, setProductSave] = useState();

  const addUser = (usuario) => {
    setUserSave(usuario);
    
  };

  const getProductCart = (baseURL) => {
    axios
    .get(`https://${PATH}/carritos/${userSave.user.id}/productos`, {headers: {
      Authorization: `Bearer ${userSave.token} `
   }})
    .then((res) => {
      setCarritoSave(res.data.data);
      
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
  };


  const logOut = () => {

  };

  return <Provider value={{ addUser, logOut, userSave, getProductCart,carritoSave,productSave, setProductSave}}>{children}</Provider>;
};

export default UserContext;

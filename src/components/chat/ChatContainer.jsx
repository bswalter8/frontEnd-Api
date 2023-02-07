
import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { contextoGlobal} from '../GlobalProvider/GlobalProvider'
import { contextoUser } from '../usercontext/UserContext'
import MsgChats from '../MsgChats/MsgChats'

function ChatContaier({admin}) {

  const { PATH  } = useContext(contextoGlobal);
  const { STYLES  } = useContext(contextoGlobal);
  const {userSave } = useContext(contextoUser);
  const [consulta, setConsulta] = useState('');
  const [msgRecibido, setmsgRecibido] = useState();

  const socketUrl = `https://${PATH}`;
  let socket = useRef(null);

  useEffect(() => {

    socket.current = io(socketUrl);
   // const socket = io('http://localhost:4000');

   // if (admin){
        socket.current.on('server:msgs', async (msgInfo) => {
          console.log(msgInfo)
          setmsgRecibido(msgInfo);
        });
    // }
/*    socket.on('disconnect', () => {
      setIsConnected(false);
    });*/

  
  },[socketUrl]);

  const handleChangeConsulta = (e) => {
    setConsulta(e.target.value);
  };

  const handleSend = () => {
    if (consulta === ''){
      alert('Debe escrbir una consulta')
    } else {
    
      socket.current.emit("client:msgs", {
        idUser: userSave.user.id,
        tipo:'consulta',
        email: userSave.user.email,
        text: consulta,
        fechahora:  new Date()
      });
      alert('La consulta ha sido realizada');
    }
  };


  return (
    <div>
       
      {!admin? (
        <div>
          <h3>Desea realizar un consulta?:</h3>        
     
            <label>
              <input type="text" onChange={handleChangeConsulta} />
            </label>
            <button className={`${STYLES.boton}`}  onClick={handleSend}>Send</button>
        </div>
      ):(
        <div>
           <h3>Mensajes de consulta recibidos:</h3>
           
          {msgRecibido&&(
            msgRecibido.map((msg, i) => {
              return (             
                <li key={msg.idUser}>
                    <MsgChats msg={msg}/>
                </li>
              );
            }))
          }
        </div>
       
     
      )}
     
          
   
    </div>
  );
}

export default ChatContaier;
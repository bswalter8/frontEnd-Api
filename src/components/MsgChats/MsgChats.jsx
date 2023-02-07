import React from "react";


const MsgChats = ( {msg} ) => {

  return (
    <div>
        <ul>
            {msg.idUser}---{msg.tipo}---{msg.email}---
            {msg.text}---{msg.fechahora}
        </ul>
      </div>
  );
};

export default MsgChats;
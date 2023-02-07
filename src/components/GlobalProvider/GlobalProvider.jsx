import { createContext } from "react";

export const contextoGlobal = createContext();
const { ProviderGlobal } = contextoGlobal;

export const GlobalContext = ({ children }) => {
 /*   const PATH= {
      devURL : '//localhost:4000/',
    proURL:"//localhost:4000/",
  }*/
// const PATH ='//localhost:8080';
const PATH ='ecommerce-i26y.onrender.com';
const STYLES = {
    h1:"text-3xl font-bold underline  mx-auto mb-8",
    boton:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded",
    back1 :"bg-slate-400",
    back2: "bg-slate-700"
}

  return (
  <contextoGlobal.Provider value={{ PATH, STYLES}}>{children}</contextoGlobal.Provider>
)
};



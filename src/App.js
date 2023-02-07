import Login from'./components/login/Login'
import UserContext from './components/usercontext/UserContext'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import SignUp from './components/SignUp/SignUp';
import {GlobalContext} from './components/GlobalProvider/GlobalProvider'

function App() {
  return (
    <BrowserRouter>  
        <GlobalContext>
          <UserContext>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                  <Route path="/singup" element={<SignUp/>}></Route> 
            
            </Routes>
          </UserContext>
        </GlobalContext>
    </BrowserRouter>
  );
}

export default App;

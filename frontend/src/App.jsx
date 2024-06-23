  import {BrowserRouter, Navigate, Route,Routes, useNavigate} from 'react-router-dom'
  import { Signup } from './pages/signup'
  import { Signin } from './pages/sigin'
  import { Dashboard } from './pages/dashboard'
  import { SendMoney } from './pages/sendMoney'
  import { useEffect } from 'react'
  function App() {
    
    function PrivateRooute({children}){
      const token=localStorage.getItem("token");
      return token ? children : <Navigate to="/signup"/>; 
    }
    return (
      <div className=''>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultDirect/>}/>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/dashboard" element={<PrivateRooute   ><Dashboard/></PrivateRooute>}></Route>
            <Route path="/send" element={<PrivateRooute  ><SendMoney/></PrivateRooute>}></Route>
          </Routes>
          </BrowserRouter>
      </div>
    )
  }
  function DefaultDirect(){
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate('/dashboard');
      } else {
        navigate('/signup');
      }
    }, [navigate]);
    return null;
  }
  export default App

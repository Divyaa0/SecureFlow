
import Login from './Components/Login/Login.js'
import Dashboard from './Components/DashBoard/Dashboard.js'
import DashFC from './Components/DashBoard/DashFC.js'
import Admindashboard from './Components/DashBoard/Admin/Admindashboard.js'
import Uploads from './Components/DashBoard/Admin/Uploads.js'
import AdminNavbar from './Components/DashBoard/Admin/AdminNavbar.js';
import Foreclosure from './Components/DashBoard/Foreclosure.js'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes.js'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css'
import "primeicons/primeicons.css";


function App() {

   return (
      <div>
      <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login/>}></Route>
     <Route path='/nav' element={<AdminNavbar/>}/>
     
     <Route element={<ProtectedRoutes/>}>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/foreclosure' element={<Foreclosure/>}></Route>
      <Route path='/dashboard/ForeclosureData' element={<DashFC/>}></Route>
      <Route path='/Admin/admin-dashboard' element={<Admindashboard/>}></Route>
      <Route path='/Admin/upload-data' element={<Uploads/>}></Route>
      <Route path='/nav' element={<AdminNavbar/>}/>
      </Route>

     </Routes>
     
     </BrowserRouter> 
   </div> 
   );
}

export default App;





















  
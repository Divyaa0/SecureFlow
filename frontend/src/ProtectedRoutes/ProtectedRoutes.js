import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {

  const token = localStorage.getItem('jwtToken');
  let location = useLocation();

  const reqURL = location.pathname;
  const reqRoleid = localStorage.getItem('role_id');
  console.log("requested URL at Protected routes : ", "--", reqURL, "requested role_id : ", reqRoleid)



  const isAuthenticated = () => {
    if (token) {

      let cached_UI = localStorage.getItem('UIroles');
      let cached_UI_url = JSON.parse(cached_UI);
      console.log("UI roles : ", cached_UI_url);
      const checkUI = cached_UI_url.some(data => { return data.role_id == reqRoleid && data.url == reqURL})
      console.log("check ui--------- : ", checkUI)
      if(checkUI===true)
      {
        return true;
      }  
      else
      {
        return false;
      }


    }
    return false;


  }
  
  return (isAuthenticated() ? <Outlet /> : <Navigate to="/" />)

}
export default ProtectedRoutes;
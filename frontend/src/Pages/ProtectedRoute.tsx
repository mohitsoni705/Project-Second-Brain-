import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}:any) => {
  const token = localStorage.getItem("token");
  if(!token){
      return <Navigate to="/signup"/>
  }
  return children
}


export default ProtectedRoute

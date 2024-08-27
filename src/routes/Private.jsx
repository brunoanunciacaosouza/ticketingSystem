import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function Private({ children }){
  const { signed, loadingPrivate } = useContext(AuthContext);

  console.log(signed)

  if(loadingPrivate){
    return(
      <div></div>
    )
  }

  if(!signed){
    return  <Navigate to="/" />
  }


  return children;

}
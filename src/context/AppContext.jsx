import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()


const ContextProvider = ({children}) => {
  const navigate = useNavigate()
  const [userLoggedIn,setUserLoggedIn] = useState(false)




  const value = {
    userLoggedIn,setUserLoggedIn,
    navigate

  }
  return (
  <AppContext.Provider value={value}>
        {children}
  </AppContext.Provider>
  )
}
export default ContextProvider;
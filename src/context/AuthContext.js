import { createContext, useEffect, useReducer } from 'react'

const initial_state = {
   user: localStorage.getItem('userId') 
      ? {
         _id: localStorage.getItem('userId'),
         email: localStorage.getItem('userEmail'),
         username: localStorage.getItem('username'),
         role: localStorage.getItem('role')
      } 
      : null,
   token: localStorage.getItem('token') || null,
   loading: false,
   error: null,
}

export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            ...state,
            loading: true,
            error: null
         }
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            user: action.payload,
            token: localStorage.getItem('token'),
            loading: false,
            error: null
         }
      case 'LOGIN_FAILURE':
         return {
            ...state,
            user: null,
            token: null,
            loading: false,
            error: action.payload
         }
      case 'REGISTER_SUCCESS':
         return {
            user: null,
            loading: false,
            error: null
         }
      case 'LOGOUT':
         localStorage.clear()
         return {
            ...state,
            user: null,
            token: null,
            loading: false,
            error: null
         }

      default:
         return state
   }
}


export const AuthContextProvider = ({ children }) => {

   const [state, dispatch] = useReducer(AuthReducer, initial_state)

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user))
   }, [state.user])

   return <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      loading: state.loading,
      error: state.error,
      dispatch,
   }}>
      {children}
   </AuthContext.Provider>
}
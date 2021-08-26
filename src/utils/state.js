import { useContext, useReducer,createContext } from 'react'

/*
  全局状态管理
*/

export const AppContext = createContext(null)

export function AppProvider ({reducer, initValue, children}) {
  return (
    <AppContext.Provider value={useReducer(reducer, initValue)}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => useContext(AppContext)
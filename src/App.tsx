import { ToastContainer } from 'react-toastify'
import { useEffect, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import useRouteElement from './useRouteElement'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div className='App'>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App

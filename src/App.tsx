import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import useRouteElement from './useRouteElement'

function App() {
  const routeElements = useRouteElement()
  return (
    <div className='App'>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App

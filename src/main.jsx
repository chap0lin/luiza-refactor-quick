import React from 'react'
import ReactDOM from 'react-dom/client'
import { Dashboard, Allocations } from './pages'
import './index.css'
import { GoogleDataProvider } from './contexts/dataProvider/GoogleDataProvider'

const Routers = () => {
    const { useState } = React;
    const [activeRoute, setActiveRoute] = useState("");
  
    if (activeRoute === "") {
      return <Dashboard setActiveRoute={setActiveRoute} />
    } else {
      return <Allocations setActiveRoute={setActiveRoute}/>
    }
  }

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleDataProvider>
    <Routers />
  </GoogleDataProvider>
)

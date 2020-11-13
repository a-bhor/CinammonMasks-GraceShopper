import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Navbar} from './components'
import Routes from './routes'
import Home from './components/home'
import Footer from './components/footer'

const App = () => {
  return (
    <div id="main">
      <Routes />
      {/* <Home /> */}
      <Footer />
    </div>
  )
}

export default App

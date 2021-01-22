import React from 'react'
import Navbar from './components/navbar'
import Routes from './routes'
// import Footer from './components/footer'
import {StylesProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div id="main">
      <StylesProvider injectFirst>
        <CssBaseline />
        <>
          <Navbar />
          <Routes />
        </>
      </StylesProvider>
      {/* <Footer /> */}
    </div>
  )
}

export default App

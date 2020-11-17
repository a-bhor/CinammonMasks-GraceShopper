import React, {useState} from 'react'
import Navbar from './components/navbar'
import Routes from './routes'
import Footer from './components/footer'
import {StylesProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// const presets = {
//   createDefaultLayout: getDefaultScheme(),
//   createStandardLayout: getStandardScheme(),
//   createFixedLayout: getFixedScheme(),
//   createContentBasedLayout: getContentBasedScheme(),
//   createCozyLayout: getCozyScheme(),
//   createMuiTreasuryLayout: getMuiTreasuryScheme()
// }

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
      <Footer />
    </div>
  )
}

export default App

import React, {useState} from 'react'
import Navbar from './components/navbar'
import Routes from './routes'
import Footer from './components/footer'
import styled from 'styled-components'
import {StylesProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  Root,
  getHeader,
  getSidebarContent,
  getContent,
  getFooter
} from '@mui-treasury/layout'

import {
  getDefaultScheme,
  getStandardScheme,
  getFixedScheme,
  getContentBasedScheme,
  getCozyScheme,
  getMuiTreasuryScheme
} from '@mui-treasury/layout/presets'

const Header = getHeader(styled)
const SidebarContent = getSidebarContent(styled)
const Content = getContent(styled)
const NewFooter = getFooter(styled)

const presets = {
  createDefaultLayout: getDefaultScheme(),
  createStandardLayout: getStandardScheme(),
  createFixedLayout: getFixedScheme(),
  createContentBasedLayout: getContentBasedScheme(),
  createCozyLayout: getCozyScheme(),
  createMuiTreasuryLayout: getMuiTreasuryScheme()
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [preset, setPreset] = useState('createStandardLayout')
  const [data, setData] = useState({
    header: true,
    content: true,
    footer: true
  })
  return (
    <div id="main">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Root scheme={presets[preset]}>
          <>
            <Navbar />
            <Content>
              <Routes />
            </Content>
          </>
        </Root>
      </StylesProvider>
      <Footer />
    </div>
  )
}

export default App

import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import AllMasks from './components/all-masks'
import Navbar from './components/navbar'
import Routes from './routes'
import Footer from './components/footer'
import styled from 'styled-components'
import {StylesProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import {
  Root,
  getHeader,
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
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
const DrawerSidebar = getDrawerSidebar(styled)
const SidebarTrigger = getSidebarTrigger(styled)
const SidebarContent = getSidebarContent(styled)
const CollapseBtn = getCollapseBtn(styled)
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
    nav: true,
    content: true,
    footer: true
  })
  return (
    <div id="main">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Root scheme={presets[preset]}>
          {({state: {sidebar}}) => (
            <>
              {/* <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                {data.header}
              </Toolbar>
            </Header> */}
              <Navbar />
              {/* <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>
                <Navbar collapsed={sidebar.primarySidebar.collapsed} />
                {data.nav && <Navbar />}
              </SidebarContent>
              <CollapseBtn />
            </DrawerSidebar> */}
              <Content>
                {/* <ContentForm
                preset={preset}
                onChangePreset={val => {
                  setLoading(true);
                  setPreset(val);
                  setTimeout(() => setLoading(false), 500);
                }}
                data={data}
                onChangeData={setData}
              /> */}
                {data.content}
                <Routes />
              </Content>
            </>
          )}
        </Root>
      </StylesProvider>
      <Footer />
    </div>
  )
}

export default App

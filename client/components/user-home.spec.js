/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('NavBar', () => {
  let navBar

  beforeEach(() => {
    navBar = shallow(<Navbar firstName="Cody" />)
  })

  it('renders the email in an h3', () => {
    expect(navBar.find('h3').text()).to.be.equal('Welcome, Cody')
  })
})

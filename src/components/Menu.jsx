import React from 'react'
import Sidenav from './Sidenav'
import { Link } from 'react-router-dom'
import { Icon, Navbar } from 'react-materialize'

class Menu extends React.Component {
	constructor() {
		super()
		this.state = {
			name: null
		}
	}

	render() {
		return (
			<div>
				<Navbar
					id="navbar"
					style={{backgroundColor: '#212121', position: 'fixed', zIndex: 2, top: 0, opacity: 0.95, height: '80px', paddingTop: '7px'}}
					alignLinks="left"
					brand={<img draggable="false" className="logo-home" width="140px" alt="Marvel" src="images/logo.jpg" />}
					centerLogo
					menuIcon={<Icon className="hide">menu</Icon>}
				>
					<Link to='/'>
                        Home
					</Link>
					<Link to='/characters'>
                        Personagens
					</Link>
				</Navbar>
				<div className="hide-on-med-and-up">
					<Sidenav/>
				</div>
			</div>
		)
	}
}

export default Menu
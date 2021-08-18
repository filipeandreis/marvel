import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../../components/NavBar/NavBar.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import './default.css'

const Default = ({ children }) => {
	return (
		<div className="layout-pages">
			<Loader />
			<Menu />
			<main>
				<div className="center-align sticky-footer">
					{ children }
				</div>
			</main>
			<Footer />
		</div>
	)
}

Default.propTypes = {
	children: PropTypes.object
}

export default Default
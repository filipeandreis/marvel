import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../components/NavBar.jsx'
import Loader from '../components/Loader.jsx'
import Footer from '../components/Footer'

const Default = ({ children }) => {
	return (
		<div className="layout-pages">
			<Loader />
			<Menu />
			{ children }
			<Footer />
		</div>
	)
}

Default.propTypes = {
	children: PropTypes.object
}

export default Default
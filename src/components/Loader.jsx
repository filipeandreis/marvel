import React from 'react'
import { ProgressBar } from 'react-materialize'
import { Animated } from 'react-animated-css'

const Loader = () => {
	return (
		<div className="react-loader hide" id="loader">
			<Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={200} animationOutDuration={200}>
				<ProgressBar />
			</Animated>
		</div>
	)
}

export default Loader
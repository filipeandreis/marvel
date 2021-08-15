import React from 'react'
import { Footer } from 'react-materialize'

class FooterComp extends React.Component {
	render() {
		return (
			<Footer
				id="footer"
				copyrights="&copy 2021 Copyright Text"
				links={<ul><li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li></ul>}
				moreLinks={<a className="grey-text text-lighten-4 right" href="#!">More Links</a>}
				style={{ backgroundColor: '#212121' }}
			>
				<h5 className="white-text">
                Footer Content
				</h5>
				<p className="grey-text text-lighten-4">
                You can use rows and columns here to organize your footer content.
				</p>
			</Footer>
		)
	}
}

export default FooterComp
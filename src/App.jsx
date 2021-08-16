import React from 'react'
import Routes from './routes.jsx'
import { Provider } from 'react-redux'
import store from './store/index'

const App = () => 
	<Provider store={store}>
		<Routes/>
	</Provider>

export default App
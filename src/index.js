import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/'
import 'material-icons/'

import { registerServiceWorker } from './serviceWorker.js'
registerServiceWorker()

ReactDOM.render(<App />, document.getElementById('root'))
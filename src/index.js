import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Firebase from './Firebase.js'

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker()
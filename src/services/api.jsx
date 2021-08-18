import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY
const hash = process.env.REACT_APP_HASH
const ts = process.env.REACT_APP_TS

const api = axios.create({
	baseURL: apiUrl
})
    
api.interceptors.request.use((config) => {
	document.getElementById('loader').classList.remove('hide')

	if(config.url.substr(-1) === '?') {
		config.url = `${config.url}apikey=${apiKey}&hash=${hash}&ts=${ts}`
	} else {
		config.url = `${config.url}&apikey=${apiKey}&hash=${hash}&ts=${ts}`
	}

	return config
}, (error) => {
	document.getElementById('loader').classList.add('hide')

	return Promise.reject(error)
})

api.interceptors.response.use((response) => {
	document.getElementById('loader').classList.add('hide')

	return response
}, (error) => {
	document.getElementById('loader').classList.add('hide')

	return Promise.reject(error)
})

export default api
import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
      this.handleChange = this.handleChange.bind(this)
    }

    static propTypes = {
        handleUserChange: PropTypes.func.isRequired,
        handleMesChange: PropTypes.func.isRequired
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
        
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({ username: '', password: ''})
            this.props.handleUserChange(user)
    
        } catch(exception) {
            this.props.handleMesChange('käyttäjätunnus tai salasana virheellinen', 'error')
        }
    }

    render() {
        return (
            <div>
            <Togglable buttonLabel="show login form">
                <h2>Kirjaudu</h2>
                
                <form onSubmit={this.login}>
                <div>
                    username
                    <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    password
                    <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </div>
                <button type="submit">login</button>
                </form>
            </Togglable>
            </div>
        )
    }
}

export default Login
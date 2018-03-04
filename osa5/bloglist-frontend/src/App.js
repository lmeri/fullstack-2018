import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,
      notif: null,
      loginVisible: false
    }

    this.logoutButton = this.logoutButton.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleBlogUpdate = this.handleBlogUpdate.bind(this)
    this.handleBlogAdd = this.handleBlogAdd.bind(this)
    this.handleBlogDelete = this.handleBlogDelete.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort((a,b) => b.likes - a.likes) })
    )

    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user: user })
      blogService.setToken(user.token)
    }
  } 

  handleUserChange = (user) => {
    this.setState({ user: user })
  }

  handleMessageChange = (message, type) => {
    this.setState({
      [type]: message
    })
    setTimeout(() => {
        this.setState({ [type]: null })
    }, 5000)
  }

  handleBlogAdd = (blog) => {
    this.setState({ blogs: this.state.blogs.concat({ ...blog, user: this.state.user })})
    this.handleMessageChange('new blog ' + blog.title + ' by ' + blog.author + ' was added', 'notif')
    console.log(blog)
    console.log(this.state.blogs)
  }

  handleBlogUpdate = (blog) => {
    this.setState({ blogs: this.state.blogs.map(b => b.id !== blog._id ? b : blog) })
    this.handleMessageChange('blog ' + blog.title + ' by ' + blog.author + ' was updated', 'notif')
  }  

  handleBlogDelete = (blog) => {
    this.setState({ blogs: this.state.blogs.filter(b => b.id !== blog.id) })
    this.handleMessageChange('blog ' + blog.title + ' by ' + blog.author + ' was deleted', 'notif')
  } 

  logoutButton = () => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({ user: null })
    blogService.setToken(null)
  }

  render() {
    return (
      <div>
        <Notification 
          error={this.state.error}
          notif={this.state.notif}
        />

        {this.state.user === null ?
          <Login 
            handleUserChange={this.handleUserChange} 
            handleMesChange={this.handleMessageChange}
          /> :
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.logoutButton}>logout</button>
            <BlogForm 
              handleBlogAdd={this.handleBlogAdd} 
            />
            {this.state.blogs.map(blog => 
              <Blog 
                key={blog.id} 
                blog={blog} 
                handleBlogUpdate={this.handleBlogUpdate} 
                handleBlogDelete={this.handleBlogDelete} 
                user={this.state.user}
              />
            )}
          </div>
        }

      </div>
    )
  }
}

export default App;

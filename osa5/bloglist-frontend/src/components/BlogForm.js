import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        author: '',
        url: ''
      }

      this.handleChange = this.handleChange.bind(this)
    }

    static propTypes = {
      handleBlogAdd: PropTypes.func.isRequired
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    submitBlog = async (event) => {
      event.preventDefault()
      const blogObject = await blogService.create({...this.state })
      this.setState({ title: '', author: '', url: '' })
      this.props.handleBlogAdd(blogObject)
    }   

    render() {
      return (
        <div>
        <h2>add blog</h2>
    
        <form onSubmit={this.submitBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            /><br/>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            /><br/>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">add</button>
        </form>
        </div>
      )
    }
}

export default BlogForm
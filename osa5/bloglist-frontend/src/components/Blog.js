import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        show: false
      }

      this.handleShowChange = this.handleShowChange.bind(this)
    }

    handleShowChange = () => {
      this.setState({ show: !this.state.show })      
    } 

    largeView = () => {
      const adder =  this.props.blog.user === undefined ? 'anonymous' : this.props.blog.user.username
      return (
        <div className='long' id={this.state.show ? "additional" : "hide"}>
          <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
          likes: {this.props.blog.likes} <button onClick={this.submitLike}>like</button><br/>
          added by {adder}<br />
          {this.deleteButton()}
        </div>
      )
    }

    deleteButton = () => {
      if (!this.props.blog.user || this.props.blog.user.username === this.props.user.username) {
        return (
          <button onClick={this.submitDelete}>delete</button>
        )
      }
    }

    submitLike = async (event) => {
      event.preventDefault()
      this.props.blog.likes = this.props.blog.likes + 1
      const blogObject = await blogService.update(this.props.blog)
      this.props.handleBlogUpdate(blogObject)
    } 

    submitDelete = async (event) => {
      event.preventDefault()
      if (window.confirm("delete '" + this.props.blog.title + "' by " + this.props.blog.author + "?")) {
        await blogService.remove(this.props.blog)
        this.props.handleBlogDelete(this.props.blog)
      } 
    } 

    render() {
        return (
            <div className='cont'>
              <p className='short' onClick={this.handleShowChange}><b>{this.props.blog.title}</b> {this.props.blog.author} </p>
              {this.largeView()}
            </div>
        )
    }
}

export default Blog
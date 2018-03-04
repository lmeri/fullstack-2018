import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const simpleblog = {
      title: 'Simple Test Blog',
      author: 'Testaaja',
      url: 'www.testaus.fi',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleblog} />)
    const contentDiv = blogComponent.find('.header')
    const likesDiv = blogComponent.find('.likeview')
    expect(contentDiv.text()).toContain(simpleblog.title +" "+ simpleblog.author)
    expect(likesDiv.text()).toContain('blog has 3 likes')
  })

  it('clicking the button twice calls event handler twice', () => {
    const simpleblog = {
        title: 'Simple Test Blog',
        author: 'Testaaja',
        url: 'www.testaus.fi',
        likes: 3
    }
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
        <SimpleBlog blog={simpleblog} onClick={mockHandler} />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
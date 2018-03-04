import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blogComponent
    const blog = {
        title: 'Simple Test Blog',
        author: 'Testaaja',
        url: 'www.testaus.fi',
        likes: 3
    }

    beforeEach(() => {
        blogComponent = shallow(
            <Blog blog={blog} />
        )
    })

    it('at start the children are not displayed', () => {
        const nameDiv = blogComponent.find('.short')
        expect(nameDiv.text()).toContain(blog.title+" "+blog.author)
        expect(nameDiv.text()).not.toContain(blog.url)
        expect(nameDiv.text()).not.toContain('likes: 3')
    })
  
    it('after clicking the button, children are displayed', () => {
        const nameDiv = blogComponent.find('.short')
        nameDiv.simulate('click')

        const contentDiv = blogComponent.find('.long')
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain('likes: 3')
    })
})
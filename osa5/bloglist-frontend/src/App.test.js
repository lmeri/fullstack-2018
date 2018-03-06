import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
    
        it('render only login page and no blogs', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(0)
        })
    })
})
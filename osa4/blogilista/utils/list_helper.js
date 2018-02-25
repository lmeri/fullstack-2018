const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
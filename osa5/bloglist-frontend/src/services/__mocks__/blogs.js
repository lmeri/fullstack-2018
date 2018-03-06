let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "Blogi ykkönen",
    author: "Maikku Meikäläinen",
    url: "www.joku.fi",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "testi",
      name: "Testi Testinen"
    }
  },
  {
    id: "4b451df7st98224a31b5cdd",
    title: "Blogi kakkonen",
    author: "Maija Mehiläinen",
    url: "www.jaahas.fi",
    user: {
      _id: "y3s37a9e514ab7f168dd5567",
      username: "jucca",
      name: "Jukka Jokunen"
    }
  },
  {
    id: "11451d43e71c224a31b5we67",
    title: "Blogi kolmonen",
    author: "Marsalkka Meikäläinen",
    url: "www.nonnih.fi",
    user: {
      _id: "ert37a9e514ab7f168ddf123",
      username: "haamu",
      name: "Oscar Kummitus"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }

import React from 'react'
import { Container, Table, Grid, Image, Form, Button, Icon, List, Segment, Message } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

const Menu = () => {
  const active = {
    fontWeight: 'bold',
    textDecoration: 'none',
    background: 'LightBlue',
    padding: 10,
    color: 'white'
  }

  const menu = {
    background: 'AliceBlue',
    padding: 10,
    borderRadius: 5,
    letterSpacing: 2,
    fontSize: 14,
    width: 'fit-content',
    marginBottom: 7
  }

  return (
    <div style={menu}>   
      <NavLink exact to="/anecdotes" activeStyle={active}>anecdotes</NavLink>&nbsp;
      <NavLink exact to="/create" activeStyle={active}>create new</NavLink>&nbsp;
      <NavLink exact to="/about" activeStyle={active}>about</NavLink>&nbsp;
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2><Icon name='list' /> Anecdotes</h2>
    <Table color='teal'>
      {anecdotes.map(anecdote => 
        <Table.Row><Table.Cell><span key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </span></Table.Cell></Table.Row>)} 
    </Table> 
  </div>
)

const About = () => (
  <div>
    <h2><Icon name='info' /> About anecdote app</h2>
    <Grid columns={2} divided stackable>
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      <Grid.Row>
      <Grid.Column>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>
      </Grid.Column>
      <Grid.Column>
        <Image height='300' src='https://i.imgur.com/9JEWRXF.jpg' />
      </Grid.Column>
      </Grid.Row>    
    
    </Grid>
  </div>
)

const Footer = () => (
  <div style={{ marginTop: 20 }}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <Grid columns={2}>
        <Grid.Column>
        <h2><Icon name='edit' /> Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <Form.Input name='content' label='content' value={this.state.content} onChange={this.handleChange}  />
          </div>
          <div>
            <Form.Input name='author' label='author' value={this.state.author} onChange={this.handleChange}  />
          </div>
          <div>
            <Form.Input name='info' label='url for more info' value={this.state.info} onChange={this.handleChange}  />
          </div>
          <Button style={{marginTop: 10}} basic color='teal' content='Teal' type='submit'>create</Button>
        </Form>
        </Grid.Column>
      </Grid>  
    )

  }
}

const Anecdote = ({ anecdote }) => {
  return(
    <Segment>
      <List animated verticalAlign='middle'>
        <List.Item>
          <List.Header><Icon name='pencil' /> {anecdote.content}</List.Header></List.Item>
        <List.Item>
          <Icon name='user outline' />{anecdote.author}
        </List.Item>
        <List.Item>
          <a style={{color: 'black'}} href={anecdote.info}><Icon name='linkify'/> {anecdote.info}</a>
        </List.Item>
        <List.Item>
          <Icon name='like outline' />{anecdote.votes} votes
        </List.Item>
      </List>
    </Segment>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      notification: '',
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ]
    } 
  }

  setNotification = (content) => {
    this.setState({ notification: content })
    setTimeout(() => this.setState({notification: ''}), 10000)
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setNotification('a new anecdote "' + anecdote.content + '" was created')
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const notifStyle = {
      border: '1px solid green',
      padding: 5,
      paddingLeft: 10,
      color: 'green',
      borderRadius: 5,
      width: 'fit-content',
      marginTop: 5,
      textDecoration: 'uppercase',
      letterSpacing: 3,
      fontSize: 14
    }

    return (
      <Container>
        <Router>
        <div>
        <h1>Software anecdotes</h1>
          <Menu />
          { this.state.notification === '' ? <div></div>: <Message style={notifStyle}>{this.state.notification} </Message> }
          
          <Route exact path="/(anecdotes|)/" render={() => 
            <AnecdoteList anecdotes={this.state.anecdotes} />} 
          />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Route exact path="/about" render={() => 
            <About />} 
          />
          <Route exact path="/create" render={({history}) => 
            <CreateNew history={history} addNew={this.addNew} />} 
          />
        <Footer />
        </div>
        </Router>
      </Container>
    )
  }
}

export default App
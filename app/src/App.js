import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Movies from "./components/movies"
import NavBar from './components/navBar'
import Rentals from './components/rentals'
import Customers from './components/customers'
import NotFound from './components/notFound'
import MovieForm from './components/movieForm'
import LoginForm from './components/loginForm'
import registerForm from './components/registerForm'
import Logout from './components/logout'
import { getCurrentUser } from './services/authService'
import 'react-toastify/dist/ReactToastify'


class App extends Component {

    state = {

    }

    async componentDidMount() {
        const user = await getCurrentUser()
        this.setState({ user })    
    }
    render() {
        return (
            <Fragment>
                <ToastContainer />
                <NavBar user={ this.state.user }/>
                <main className='container'>
                    <Switch>
                        <Route path='/login' component={LoginForm} />
                        <Route path='/logout' component={Logout} />
                        <Route path='/register' component={registerForm} />
                        <Route path='/movies/:id' component={MovieForm} />
                        <Route path='/movies' component={Movies} />
                        <Route path='/customers' component={Customers} />
                        <Route path='/rentals' component={Rentals} />
                        <Route path='/not-found' component={NotFound} />
                        <Redirect from='/' exact to='/movies' />
                        <Redirect to='/not-found' />
                    </Switch>
                </main>
            </Fragment>
        )
    }
}

export default App;

import React, { Fragment } from 'react'
import Joi from 'joi-browser'
import Form from './common/form'

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {
            username: '',
            password: ''
        }
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = () => {
        // call the server

        console.log('Submitted!!!')
    }

    render() {

        return (
            <Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    { this.renderInput('username', 'Username') }
                    { this.renderInput('password', 'Password', 'password') }
                    { this.renderButton('Login') }
                </form>
            </Fragment>
        )
    }
}

export default LoginForm
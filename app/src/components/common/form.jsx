import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'

class Form extends Component {
    
    state = { 
        data: {},
        errors: {}
    }

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false })
        if (!error) return null

        const errors = {}

        for (let item of error.details) {
            errors[item.path[0]] = item.message
        }

        // console.log(errors)

        return errors

    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)

        return error ? error.details[0].message : null
    }

    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate()
        this.setState({ errors: errors || {} })

        if (errors) return

        this.doSubmit(this.state.data)

    }

    handleChange = ({ target }) => {
        const { name, value } = target

        const errorMessage = this.validateProperty(target)

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            },
            errors: {
                ...this.state.errors,
                [name]: errorMessage
            }
        })
    }

    renderButton(label){
        return (
            <button
                disabled={this.validate()}
                className="btn btn-primary"
            >{ label } </button>
        )
    }

    renderInput(name, label, type = 'text'){

        const { data, errors } = this.state

        return(
            <Input
                type={ type }
                name={ name }
                label={ label }
                onChange={ this.handleChange }
                value={ data[name] }
                error={ errors[name] }
            />
        )
    }

    renderSelect( name, label, options ){

        const { data, errors } = this.state
        
        return(
            <Select               
                name={ name }
                value={ data[name] }
                label={label}
                onChange={this.handleChange}
                options={ options }
                error={errors[name]}
            />
        )
    }
}

export default Form
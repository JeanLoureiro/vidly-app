import React, { Fragment } from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import { getMovie, saveMovie } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'

class MovieForm extends Form {

    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {
            title: '',
            genre: '',
            numberInStock: '',
            dailyRentalRate: ''
        }
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
    }

    
    
    componentDidMount(){
        const { match, history } = this.props
        
        const genres = getGenres()
        this.setState({ genres })
        
        const movieId = match.params.id
        if ( movieId === 'new') return
        
        const movie = getMovie(movieId)
        if ( !movie ) return history.replace('/not-found')
        
        this.setState({data: this.mapToViewModel(movie) })
        
    }
    
    mapToViewModel(movie){
        
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    
    doSubmit = () => {
        saveMovie( this.state.data )
        this.props.history.push('/movies')
    }

    render() {

        const { genres } = this.state

        return (
            <Fragment>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    { this.renderInput('title', 'Title') }
                    { this.renderSelect('genreId', 'Genre' , genres ) }
                    { this.renderInput('numberInStock', 'Number in Stock', 'number') }
                    { this.renderInput('dailyRentalRate', 'Rate') }
                    { this.renderButton('Save') }
                </form>
            </Fragment>
        )
    }
}

export default MovieForm
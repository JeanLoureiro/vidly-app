import React, { Component } from 'react'
import { getCurrentUser } from '../services/authService'
import { Link } from 'react-router-dom'
import Like from "./common/like"
import Table from './common/table'

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie._id)} /> }, 
    ]

    deleteColumn = { 
        key: 'delete', content: movie => 
            <button className='btn btn-danger btn-sm' onClick={() => this.props.onDelete(movie._id)} >
                Delete
            </button> 
    }

    constructor(){
        super()
        const user = getCurrentUser()
        
        if ( user && user.isAdmin ){
            this.columns.push(this.deleteColumn)
        }
    }

    render() { 
        const { movies, onSort, sortColumn } = this.props

        return <Table 
            columns={ this.columns }
            data={ movies }
            sortColumn={ sortColumn }
            onSort={ onSort }
        />
        
    }
}


export default MoviesTable;
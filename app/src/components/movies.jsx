import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMovies, deleteMovie } from "../services/movieService"
import MoviesTable from './moviesTable'
import Pagination from "./common/pagination"
import ListGroup from "./common/listGroup"
import { paginate } from '../utils/paginate'
import { getGenres } from '../services/genreService'
import _ from 'lodash'
import SearchBox from './searchBox'


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        searchQuery: '',
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    }

    async componentDidMount() {
        const { data } = await getGenres()
        const genres = [ { _id: '' ,name: 'All Genres'}, ...data ]

        const { data: movies } = await getMovies()
        
        this.setState({
            movies: movies,
            genres
        })
    }

    handleDelete = async movie => {

        const originalMovies = this.state.movies
        const movies = originalMovies.filter(m => m._id !== movie)
    
        this.setState({ movies })

        try {
            await deleteMovie(movie)
        }
        catch(ex) {
            if (ex.response && ex.response.status === 404){
                toast.error('This movie has already been deleted.')

                this.setState({ movies: originalMovies })
            }
        }

        
    }

    handleLike = id => {
        const movies = this.state.movies.map(movie =>
            movie._id === id
                ? { ...movie, liked: !movie.liked }
                : movie
        )

        this.setState({
            movies
        })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            searchQuery: "",
            currentPage: 1
        })
    }

    handleSearch = query => {
        this.setState({
            selectedGenre: null,
            searchQuery: query,
            currentPage: 1
        })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPagedData = () => {

        const { 
            movies: allMovies, 
            pageSize, 
            currentPage, 
            selectedGenre, 
            searchQuery,
            sortColumn 
        } = this.state

        let filtered = allMovies

        if (searchQuery){
            filtered = allMovies.filter( movie => 
                movie.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase() )
            )
        } else if( selectedGenre && selectedGenre._id ) {
            filtered = allMovies.filter( m => m.genre._id === selectedGenre._id )
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])    

        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
    }

    render() {

        const { 
            pageSize, 
            currentPage, 
            genres, 
            selectedGenre, 
            sortColumn,
            searchQuery
        } = this.state

        const { user } = this.props

        if (this.state.movies.length === 0) return <h2>There are no movies in the database</h2>

        const { totalCount, data: movies } = this.getPagedData()

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        items={genres} 
                        selectedItem={ selectedGenre }
                        onItemSelect={this.handleGenreSelect}
                        />
                </div>
                <div className="col">
                { user && <Link to='/movies/new' className='btn btn-primary' style={{ marginBottom: 20 }}> New Movie </Link> }
                    <h2>Showing {totalCount} movies in the database.</h2>
                    <SearchBox value={ searchQuery } onChange={ this.handleSearch } /> 
                    <MoviesTable 
                        movies={ movies } 
                        sortColumn={ sortColumn }
                        onDelete={ this.handleDelete }    
                        onLike={ this.handleLike }    
                        onSort={ this.handleSort }
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

export default Movies;
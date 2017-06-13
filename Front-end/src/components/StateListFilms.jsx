import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import funcAddMovies from './funcAddMovies.js';

export let idFilm;

class StateListFilms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filmsStore: [],
      yearFilter: '2017'
    }
  }

  componentDidUpdate() {
    if(this.props.yearFilter !== this.state.yearFilter) {
      this.setState({yearFilter: this.props.yearFilter, filmsStore: []});
      let yearFilter = `&year=${this.props.yearFilter}`;
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=47408bbb466e582d5e4e5d5cc2c95da1&sort_by=popularity.desc${yearFilter}`)
        .then(res => res.data)
        .then(movies => {
          funcAddMovies(movies.results)
            .then(filmsStore => this.setState({filmsStore}))
        })
        .catch(this.handleError)
      return false;
    }
  }

  componentDidMount() {
    this.setState({filmsStore: []});
    let yearFilter = `&year=${this.props.yearFilter}`;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=47408bbb466e582d5e4e5d5cc2c95da1&sort_by=popularity.desc${yearFilter}`)
      .then(res => res.data)
      .then(movies => {
        funcAddMovies(movies.results)
          .then(filmsStore => this.setState({filmsStore}))
      })
      .catch(this.handleError)
  }

  render() {
    return (
      <section className="exact-wrap">
        {
          this.state.filmsStore.map(film => {
            return (
              <div className="exact-Search" key={film.id}>
                <img src={film.image} alt="Alt" />
                <div className="es-descr-film">
                  <Link onClick={() => idFilm = film.idFilm} to={film.title}>{film.title}</Link>
                  <span>{film.date}</span>
                  <span>{film.runtime}</span>
                  <p>{film.overview}</p>
                </div>
              </div>
            )
          })
        }
      </section>
    )
  }
}

export default StateListFilms;

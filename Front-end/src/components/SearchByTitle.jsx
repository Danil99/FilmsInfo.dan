import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import funcAddMovies from './funcAddMovies.js';

export let idFilm2;
export let count = false;

class SearchByTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filmsStore: []
    }

  }

  componentDidMount() {
    if(this.props.nameFilm !== '') {
      let title = this.props.nameFilm;
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=47408bbb466e582d5e4e5d5cc2c95da1&query=${title}`)
        .then(res => res.data)
        .then(movies => {
          funcAddMovies(movies.results)
            .then((films) => this.setState({filmsStore: films}))
        })
        .catch(this.handleError)
    }
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
                  <Link onClick={() => {
                    return new Promise((resolve, reject) => {
                      idFilm2 = film.idFilm
                      count = true;
                      resolve();
                    }).then(() => count = false)
                  }} to={film.title}>{film.title}</Link>
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

export default SearchByTitle;

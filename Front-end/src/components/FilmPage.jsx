import React from 'react';
import axios from 'axios';

import Preloader from './Preloader.jsx';
import { idFilm } from './StateListFilms.jsx';
import { idFilm2, count } from './SearchByTitle.jsx';

class FilmPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      film: {}
    }

    this.addMovies = this.addMovies.bind(this);
    this.filmsRender = this.filmsRender.bind(this);
    this.infoItems = this.infoItems.bind(this);
  }

  componentDidMount() {
    // let title = this.props.match.params.title;
    let id;
    if(count) {
      id = idFilm2;
    } else id = idFilm;
    this.addMovies(id)
      .then(film => this.setState({film}))
      .catch(this.handleError)
  }

  addMovies(idMovie) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=47408bbb466e582d5e4e5d5cc2c95da1`)
        .then(res => res.data)
        .then(movie => {
          let image_size = 'w342'; // "w92", "w154", "w185", "w342", "w500", "w780", or "original"

          let image = `https://image.tmdb.org/t/p/${image_size}${movie.poster_path}`;
          let date = movie.release_date;
          date = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
          let overview = movie.overview;

          if(overview.length < 1) {
            overview = 'No description...';
          }

          let runtime = movie.runtime,
              runtimeHour = Math.floor(runtime / 60),
              runtimeMinutes = runtime - runtimeHour * 60;
          runtime = `${runtimeHour}h ${runtimeMinutes}min`;

          resolve({
            image,
            title: movie.title,
            date,
            overview,
            runtime,
            genres: movie.genres,
            budget: movie.budget,
            homePage: movie.homepage,
            countries: movie.production_countries,
            companies: movie.production_companies
          })
        })
    })
  }

  infoItems(items) {
    return (
      <div>
        {
          items.map((countrie, id) => {
            return <span key={id}>{id === items.length - 1 ? countrie.name : countrie.name + ','}</span>
          })
        }
      </div>
    )
  }

  filmsRender() {
    let film = this.state.film;
    return (
      <div className="filmPage">
        <div>
          <div className="cont-img">
            <img src={film.image} alt="Alt" />
          </div>
        </div>
        <div className="filmPage-info">
          <h1>{film.title}</h1>
          <div className="info-content">
            <div className="info-items">
              <h3>Release date:</h3>
              <span>{film.date}</span>
            </div>
            <div className="info-items">
              <h3>Genres:</h3>
              {this.infoItems(film.genres)}
            </div>
            <div className="info-items">
              <h3>Time:</h3>
              <span>{film.runtime}</span>
            </div>
            <div className="info-items">
              <h3>Budget:</h3>
              <span>{film.budget}</span>
            </div>
            <div className="info-items">
              <h3>Home page:</h3>
              <span><a href={film.homePage} target="_blank">{film.homePage}</a></span>
            </div>
            <div className="info-items">
              <h3>Countries:</h3>
              {this.infoItems(film.countries)}
            </div>
            <div className="info-items">
              <h3>Companies:</h3>
              {this.infoItems(film.companies)}
            </div>
          </div>
          <div className="overview-film">
            <h3>Overview "{film.title}":</h3>
            <p>{film.overview}</p>
          </div>
        </div>
      </div>
    )
  }

  handleError(error) {
    console.error(error);
  }

  render() {
    return (
      <section>
        {
          this.state.film.image !== undefined ?
            this.filmsRender()
            :
              <Preloader />
        }
      </section>
    )
  }
}

export default FilmPage;

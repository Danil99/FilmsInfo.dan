import axios from 'axios';

const funcAddMovies = (movies) => {
  let promises = [];
  movies.forEach(movie => {
    let promise = axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=47408bbb466e582d5e4e5d5cc2c95da1`);
    promises.push(promise);
  })
  return Promise.all(promises)
    .then(res => res.map(movie => movie.data))
    .then(movies => {
      let movieses = movies.map((movie, id) => {
        let image_size = 'w185'; // "w92", "w154", "w185", "w342", "w500", "w780", or "original"

        let date = movie.release_date;
        date = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
        let overview = movie.overview;

        if(overview !== null && overview.length > 280) {
          overview = `${overview.slice(0, 250)}...`
        } else if (overview === null || overview.length < 1) {
          overview = 'No description...'
        }

        let runtime = movie.runtime,
            runtimeHour = Math.floor(runtime / 60),
            runtimeMinutes = runtime - runtimeHour * 60;
        runtime = `${runtimeHour}h ${runtimeMinutes}min`;

        if(movie.title !== null && movie.poster_path !== null) {
          return {
            id: id + 1,
            image: `https://image.tmdb.org/t/p/${image_size}${movie.poster_path}`,
            title: movie.title,
            date,
            overview,
            runtime,
            idFilm: movie.id
          }
        }
      })
      return movieses.filter(movie => Boolean(movie));
    })
}

export default funcAddMovies;

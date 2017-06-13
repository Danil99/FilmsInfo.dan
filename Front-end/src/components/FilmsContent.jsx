import React from 'react';

import SearchByTitle from './SearchByTitle.jsx';
import StateListFilms from './StateListFilms.jsx';

class FilmsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      nameFilm: '',
      action: false,
      yearFilter: '2017',
      filtersToggle: false
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  handleSearch(event) {
    let title = event.target.value;
    this.setState({action: false, title});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({action: true, nameFilm: this.state.title});
  }

  onSelectChange(event) {
    let yearFilter = event.target.value;
    this.setState({yearFilter});
  }

  render() {
    return (
      <div>
        <div className="search-wrap">
          <div className="search">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleSearch} value={this.state.title} placeholder="Введите название фильма" />
              <div className="filters">
                <h2 onClick={() => this.setState({filtersToggle: !this.state.filtersToggle})}>Filters</h2>
                {
                  this.state.filtersToggle ?
                    <div className="filters-wrapper">
                      <div className="filter-items">
                        <span>Year:</span>
                        <select onChange={this.onSelectChange} value={this.state.value}>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                        </select>
                      </div>
                    </div>
                      :
                        false
                }
              </div>
              <button type="submit">Найти</button>
            </form>
          </div>
        </div>
        {
          this.state.action && this.state.nameFilm !== '' ?
            <SearchByTitle nameFilm={this.state.nameFilm} />
              :
                <StateListFilms yearFilter={this.state.yearFilter} />
        }
      </div>
    )
  }
}

export default FilmsContent;

// src/db/models/Movie.js

import Sequelize from 'sequelize'

const Movie = sequelize.define('movie', {
  title: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  rated: {
    type: Sequelize.STRING
  },
  release_date: {
    type: Sequelize.STRING
  },
  run_time: {
    type: Sequelize.STRING
  },
  directors: {
    type: Sequelize.ARRAY
  },
  writers: {
    type: Sequelize.ARRAY
  },
  actors: {
    type: Sequelize.ARRAY
  },
  plot: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING
  },
  logo: {
    type: Sequelize.STRING
  },
  poster: {
    type: Sequelize.STRING
  },
  ratings: {
    type: Sequelize.JSON
  }
}, {
  timestamps: true
})

export default Movie

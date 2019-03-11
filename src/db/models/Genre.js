// src/db/models/Genre.js

import Sequelize from 'sequelize'

const Genre = sequelize.define('genre', {
  name: {
    type: Sequelize.STRING
  },
  plural: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
})

export default Genre

// src/postgresDB/models/Genre.js

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

Genre.sync({ force: true })
  .then(() => {
    // Table Created
    return Genre.create({
      name: 'Action',
      plural: 'Actions',
      category: 'Action movies'
    })
  })
  .catch((error) => {
    console.error('Error in Genre migration', error)
  })

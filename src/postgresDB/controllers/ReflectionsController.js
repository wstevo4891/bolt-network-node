// src/postgresDB/controllers/ReflectionsController.js

// Imports
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import db from '../db'

const ReflectionsController = {
  /**
   * Get All Reflections
   * ==========================================================================
   * Function: index()
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  async index(req, res) {
    const findAllQuery = 'SELECT * FROM reflections';

    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });

    } catch(error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Create A Reflection
   * ==========================================================================
   * Function: create()
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      reflections(id, success, low_point, take_away, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;

    const values = [
      uuidv4(),
      req.body.success,
      req.body.low_point,
      req.body.take_away,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(text, values);
      console.log('SQL Reflections create')
      console.log(rows[0])
      return res.status(201).send(rows[0]);

    } catch(error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get A Reflection
   * ==========================================================================
   * Function: show()
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  async show(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1';

    try {
      const { rows } = await db.query(text, [req.params.id]);

      // Not found guard clause
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'reflection not found' });
      }

      return res.status(200).send(rows[0]);

    } catch(error) {
      return res.status(400).send(error)
    }
  },

  /**
   * Update A Reflection
   * ==========================================================================
   * Function: update()
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
    const updateOneQuery =`UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;

    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);

      // Not found guard clause
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }

      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);

      return res.status(200).send(response.rows[0]);

    } catch(err) {
      return res.status(400).send(err);
    }
  },

  /**
   * Delete A Reflection
   * ==========================================================================
   * Function: delete()
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';

    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);

      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }

      return res.status(204).send({ 'message': 'deleted' });

    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default ReflectionsController;

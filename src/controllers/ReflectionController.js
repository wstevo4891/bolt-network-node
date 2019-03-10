// src/controllers/ReflectionController.js

import Reflection from '../models/Reflection'

const ReflectionController = {
  /**
   * Function: create()
   * ==========================================================================
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  create(req, res) {
    // Incomplete fields guard clause
    if (!req.body.success && !req.body.lowPoint && !req.body.takeAway) {
      return res.status(400).send({ 'message': 'All fields are required' })
    }

    const reflection = Reflection.create(req.body)

    return res.status(201).send(reflection)
  },

  /**
   * Function: index()
   * ==========================================================================
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  index(req, res) {
    const reflections = Reflection.all()

    return res.status(200).send(reflections)
  },

  /**
   * Function: show()
   * ==========================================================================
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  show(req, res) {
    const reflection = Reflection.find(req.params.id)

    // Not found guard clause
    if (!reflection) {
      return res.status(404).send({ 'message': 'reflection not found' })
    }

    return res.status(200).send(reflection)
  },

  /**
   * Function: update()
   * ==========================================================================
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  update(req, res) {
    const reflection = Reflection.find(req.params.id)

    // Not found guard clause
    if (!reflection) {
      return res.status(404).send({ 'message': 'reflection not found' })
    }

    const updatedReflection = Reflection.update(req.params.id, req.body)

    return res.status(200).send(updatedReflection)
  },

  /**
   * Function: delete()
   * ==========================================================================
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const reflection = Reflection.find(req.params.id)

    // Not found guard clause
    if (!reflection) {
      return res.status(404).send({ 'message': 'reflection not found' })
    }

    const ref = Reflection.delete(req.params.id)

    return res.status(204).send(ref)
  }
}

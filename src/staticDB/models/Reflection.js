// src/models/Reflection.js

import moment from 'moment'
import uuid from 'uuid'

class Reflection {
  /**
   * class constructor
   * ==========================================================================
   * @param {object} data
   */
  constructor() {
    this.reflections = []
  }

  /**
   * Function: create()
   * ==========================================================================
   * @returns {object} reflection object
   */
  create(data) {
    const newReflection = {
      id: uuid.v4(),
      success: data.success || '',
      lowPoint: data.lowPoint || '',
      takeAway: data.takeAway || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
    }

    this.reflections.push(newReflection)
    return newReflection
  }

  /**
   * Function: find()
   * ==========================================================================
   * @param {uuid} id
   * @returns {object} reflection object
   */
  find(id) {
    return this.reflections.find(reflect => reflect.id === id);
  }

  /**
   * Function: all()
   * ==========================================================================
   * @returns {object} returns all reflection
   */
  all() {
    return this.reflections
  }

  /**
   * Function: update()
   * ==========================================================================
   * @param {uuid} id
   * @param {object} data
   * @returns {object} updated reflection
   */
  update(id, data) {
    const reflection = this.find(id)
    const index = this.reflections.indexOf(reflection)
    const record = this.reflections[index]

    record.success = data['success'] || reflection.success

    record.lowPoint = data['lowPoint'] || reflection.lowPoint

    record.takeAway = data['takeAway'] || reflection.takeAway

    record.modifiedDate = moment.now()

    return record
  }

  /**
   * Function: delete()
   * ==========================================================================
   * @param {uuid} id
   * @returns {object} deletion message
   */
  delete(id) {
    const reflection = this.find(id)
    const index = this.reflections.indexOf(reflection)

    this.reflections.splice(index, 1)

    return { 'message': 'Reflection was successfully deleted' }
  }
}

export default new Reflection()

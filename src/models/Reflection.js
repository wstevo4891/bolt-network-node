// src/models/Reflection.js

import moment from 'moment'
import uuid from 'uuid'

class Reflection {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.reflections = []
  }

  /**
   * create()
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
   * findOne()
   * @param {uuid} id
   * @returns {object} reflection object
   */
  findOne(id) {
    return this.reflections.find(reflect => reflect.id === id);
  }

  /**
   * findAll()
   * @returns {object} returns all reflection
   */
  findAll() {
    return this.reflections
  }

  /**
   * update()
   * @param {uuid} id
   * @param {object} data
   */
  update(id, data) {
    const reflection = this.findOne(id)
    const index = this.reflection.indexOf(reflection)
    const record = this.reflections[index]

    record.success = data['success'] || reflection.success

    record.lowPoint = data['lowPoint'] || reflection.lowPoint

    record.takeAway = data['takeAway'] || reflection.takeAway

    record.modifiedDate = moment.now()

    return record
  }

  /**
   * delete()
   * @param {uuid} id
   */
  delete() {
    const reflection = this.findOne(id)
    const index = this.reflections.indexOf(reflection)
    this.reflections.splice(index, 1)
    return {}
  }
}

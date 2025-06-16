const db = require('../db')

class ActivityModel{
    //make active true and generate code in controller
    static async createActivity({title, description, points}){
        const active =  true;
        return await db('activities')
        .insert({title, description, points, active })
        .returning('*');
    }

    static async findById(id){
      const activity = await db('activities').where({id}).first();
      return activity;
    }

  static async getAllActivities() {
    return db('activities').where({ active: true });
  }

  static async deactivate(id) {
    return db('activities')
      .where({ id })
      .update({ active: false });
  }

  static async deleteActivity(id){
        return db('activities')
        .where({id})
        .del();
    }

}

module.exports = ActivityModel;
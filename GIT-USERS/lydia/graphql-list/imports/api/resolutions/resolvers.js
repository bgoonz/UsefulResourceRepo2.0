import Resolutions from './resolutions';
import Goals from '../goals/goals';

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({userId}).fetch();
    }
  },

  Resolution: {
    goals: res => 
      Goals.find({
        resolutionId: res._id,
      }).fetch(),
    completed: res => {
      const goals = Goals.find({
        resolutionId: res._id,
      }).fetch()
      if (!goals.length) return false;
      const completedGoals = goals.filter(goal => goal.completed);
      return goals.length === completedGoals.length;
    }
  },
  
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      if (userId) {
        const resolutionId = Resolutions.insert({
          name,
          userId,
        });
        return Resolutions.findOne(resolutionId);
      }
      throw new Error('Unauthorized');
    }
  }
}
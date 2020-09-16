const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const ApiError = require('../../../utils/ApiError');
const { Task } = require('../models');
const { getQueryOptions } = require('../../../utils/service.util');

const createTask = async (taskBody, user) => {
  const task = await Task.create({ ...taskBody, owner: user._id });
  return task;
};

const getTask = async (taskId, user) => {
  const filter = {
    _id: taskId,
    ...(user.role !== 'admin' && { owner: user._id }),
  };
  const task = await Task.findOne(filter);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  return task;
};

const updateTask = async (taskId, updateBody, user) => {
  const task = await getTask(taskId, user);
  Object.assign(task, updateBody);
  // Object.keys(updateBody).forEach(update => (task[update] = updateBody[update]));
  await task.save();
  return task;
};

const deleteTask = async (taskId, user) => {
  const task = await getTask(taskId, user);
  await task.remove();
  return task;
};

const getTasks = async (query, user) => {
  const filter = pick(query, ['completed']);
  Object.assign(filter, user.role !== 'admin' ? { owner: user._id } : {});
  const options = getQueryOptions(query);

  const tasks = await Task.paginate(filter, options);
  return tasks;
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTasks,
};

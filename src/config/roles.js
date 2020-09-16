const roles = ['admin', 'user', 'supervisores', 'jefatura'];

const roleRights = new Map();
roleRights.set(roles[0], ['manageTasks']);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

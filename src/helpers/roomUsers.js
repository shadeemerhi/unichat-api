const removeUserFromRoom = function(users, userIdToRemove) {
  // return users.filter(u => u.user.uid !== userIdToRemove);
  return delete users[userIdToRemove];
}

module.exports = { removeUserFromRoom }
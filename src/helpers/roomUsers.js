const removeUserFromRoom = function(users, userIdToRemove) {
  return users.filter(u => u.user.uid !== userIdToRemove);
}

module.exports = { removeUserFromRoom }
module.exports = (db) => {

  const createMessage = (body) => {
    console.log('inside the function', body);
  }

  return { createMessage };
}
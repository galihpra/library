export const getAllBooks = (callback) => {
  const query = 'SELECT * FROM books WHERE status = "Available"';
  global.db.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }

    const bookQuantites = results.length;
    callback(null, {quantity:bookQuantites,books:results});
  });
};
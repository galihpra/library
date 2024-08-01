export const borrowBook = (userId, bookId, callback) => {
    global.db.beginTransaction((err) => {
        if (err) return callback(err);

        global.db.query('SELECT * FROM loans WHERE user_id = ? AND tanggal_dikembalikan IS NULL', [userId], (err, result) => {
            if (err) {
                return global.db.rollback(() => callback(err));
            }
            if (result.length >= 2) {
                const error = new Error('User has borrowed 2 books');
                error.statusCode = 400; 
                return global.db.rollback(() => callback(error));
            }

            global.db.query('SELECT status FROM books WHERE id = ?', [bookId], (err, result) => {
                if (err) {
                    return global.db.rollback(() => callback(err));
                }
                if (result[0].status === "Borrowed") {
                    const error = new Error('Book is not available');
                    error.statusCode = 400;
                    return global.db.rollback(() => callback(error));
                }

                global.db.query('SELECT * FROM penalty WHERE user_id = ? AND penalty_end > CURDATE()', [userId], (err, result) => {
                    if (err) {
                        return global.db.rollback(() => callback(err));
                    }
                    if (result.length > 0) {
                        const error = new Error('User is currently under penalty');
                        error.statusCode = 400;
                        return global.db.rollback(() => callback(error));
                    }
                    
                    global.db.query('UPDATE books SET status = "Borrowed" WHERE id = ?', [bookId], (err, result) => {
                        if (err) return global.db.rollback(() => callback(err));
            
                        global.db.query('INSERT INTO loans (user_id, book_id, tanggal_pinjam) VALUES (?, ?, NOW())', [userId, bookId], (err, result) => {
                            if (err) return global.db.rollback(() => callback(err));
            
                            global.db.commit((err) => {
                                if (err) return global.db.rollback(() => callback(err));
                                callback(null, result);
                            });
                        });
                    });
                });
            });
        });
    });
};

export const returnBook = (userId, bookId, callback) => {
    global.db.beginTransaction((err) => {
        if (err) return callback(err);

        global.db.query(
            'SELECT * FROM loans WHERE user_id = ? AND book_id = ? AND tanggal_dikembalikan IS NULL',
            [userId, bookId],
            (err, results) => {
                if (err) {
                    return global.db.rollback(() => callback(err));
                }
                if (results.length === 0) {
                    const error = new Error('No loan found for this user and book');
                    error.statusCode = 404; 
                    return global.db.rollback(() => callback(error));
                }

                const tanggalPinjam = new Date(results[0].tanggal_pinjam);
                const sevenDaysAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

                if (tanggalPinjam < sevenDaysAgo) {
                    global.db.query(
                        'INSERT INTO penalty (user_id, tanggal_penalty, penalty_end) VALUES (?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY))',
                        [userId],
                        (err, result) => {
                            if (err) {
                                return global.db.rollback(() => callback(err));
                            }
                        }
                    );

                    global.db.query(
                        'UPDATE books SET status = "Available" WHERE id = ?',
                        [bookId],
                        (err) => {
                            if (err) {
                                return global.db.rollback(() => callback(err));
                            }
    
                            global.db.query(
                                'UPDATE loans SET tanggal_dikembalikan = NOW() WHERE user_id = ? AND book_id = ? AND tanggal_dikembalikan IS NULL',
                                [userId, bookId],
                                (err) => {
                                    if (err) {
                                        return global.db.rollback(() => callback(err));
                                    }
    
                                    global.db.commit((err) => {
                                        if (err) {
                                            return global.db.rollback(() => callback(err));
                                        }
                                        callback(null, { message: 'Book returned successfully' });
                                    });
                                }
                            );
                        }
                    );
                }
            }
        );
    });
};
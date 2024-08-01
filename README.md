# Library

## Installation

Follow these steps to install and set up the Library API:

1. **Extract the zip file:**
   
    Extract the zip file to your desired location.

2. **Create a database** 

    Create a new MySQL database for the Invoice API.

    ``` CREATE DATABASE db_library; ```

3. **Insert sample data into your database**

    Copy the following SQL queries and run them in your database to insert sample data:

    ```sql
    CREATE DATABASE db_library;
    
    CREATE TABLE users (
    `code` VARCHAR(10) PRIMARY KEY NOT NULL,
    `name` VARCHAR(100) NOT NULL
    );

    INSERT INTO users (`code`,`name`) VALUES ('M001',  'Angga');
    INSERT INTO users (`code`,`name`) VALUES ('M002','Ferry');
    INSERT INTO users (`code`,`name`) VALUES ('M003','Putri');

    CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    `status` ENUM('Available', 'Borrowed') NOT NULL DEFAULT 'Available',
    stock INT NOT NULL,
    INDEX idx_status (`status`)
    );


    INSERT INTO books (`code`, title, author, stock) VALUES
    ('JK-45', 'Harry Potter', 'J.K Rowling', 1),
    ('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
    ('TW-11', 'Twilight', 'Stephenie Meyer', 1),
    ('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1),
    ('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1);


    CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    user_id VARCHAR(10),
    tanggal_pinjam DATE,
    tanggal_dikembalikan DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (user_id) REFERENCES users(`code`)
    );

    CREATE TABLE penalty(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(10),
    tanggal_penalty DATE,
    penalty_end DATE,
    FOREIGN KEY (user_id) REFERENCES users(`code`)
    );
    ```

## Running The Invoice API

1. **Start your database**

    Ensure your database server is running.

2. **Move to Invoice Folder**

    ```bash
    cd eigen-book
    ```
    
3. **Run Invoice API**

    ```bash
    npm start
    ```

## API Routes

Here are the available API routes:

### Loan Routes

- **Borrow Book**

    ```http
    POST localhost:3000/loans/borrow
    ```

- **Return Book**

    ```http
    POST localhost:3000/loans/return
    ```

### User Routes

- **Get All Members**

    ```http
    GET localhost:3000/users
    ```


### Book Routes

- **Get All Available Books**

    ```http
    GET localhost:3000/books
    ```


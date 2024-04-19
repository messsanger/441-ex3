console.log("I am xxx. my IP is xx Mac address is xxx. Ncc student ID is: xxxxX");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});


// user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// create the table if not exists
db.run('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title TEXT, author TEXT, ISBN TEXT, description TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Books Table created successfully');

    commandInterface();
});

function listBooks() {
    // list all books
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.ID}, Title: ${row.title}, Author: ${row.author}, ISBN: ${row.ISBN}, Description: ${row.description}`);
        });
    });
}
// queue -> task 1(callback)
function commandInterface() {
    readline.question('Enter book title: ', (title) => {
        readline.question('Enter book author: ', (author) => {
            readline.question('Enter book ISBN: ', (ISBN) => {
                readline.question('Enter book description: ', (description) => {
                    // insert the book into the database
                    db.run('INSERT INTO books (title, author, ISBN, description) VALUES (?, ?, ?, ?)', [title, author, ISBN, description], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        readline.question('Do you want to add another book? (yes/no): ', (answer) => {
                            if (answer === 'yes') {
                                commandInterface();
                            } else {
                                listBooks();
                                
                                readline.close();
                            }
                        });
                    });
                });
            });
        });
    });
    // callback hell
}
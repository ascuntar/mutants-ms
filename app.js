// Created By Eyder Ascuntar Rosales
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./express');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log(`Conecting database...`);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(connection => {
    // =========== EXCLUSIVE TO OBSERVER CHANGES
    // const client = mongoose.connection.client;
    // const db = client.db('construction_clients_db');
    // const collection = db.collection('Client');
    // const changeStream = collection.watch();
    // changeStream.on('change', next => {
    //   console.log(next);
    // });
    // =========== EXCLUSIVE TO OBSERVER CHANGES

    console.log(`Database conected`);
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
  });

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! ðŸ’¥ Shutting down...');
  console.log(err.name, err.message);
});

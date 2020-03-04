import express from 'express';

const app = express();
const server = app.listen(3005, () => {
  console.log('express server has started on port 3005');
})
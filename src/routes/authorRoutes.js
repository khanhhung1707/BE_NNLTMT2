import express from 'express';
import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController.js';

const authorRouter = express.Router();

authorRouter.get('/authors', getAllAuthors);
authorRouter.post('/authors', createAuthor);
authorRouter.put('/authors/:id', updateAuthor);
authorRouter.delete('/authors/:id', deleteAuthor);

export default authorRouter;

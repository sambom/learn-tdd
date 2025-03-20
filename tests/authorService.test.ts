import request from 'supertest';
import app from '../server';
import Author, { IAuthor } from "../models/author";

jest.mock('../models/Author');

describe('GET /authors', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a sorted list of authors by family name', async () => {
      const mockAuthors = [
        'Jane Austen : 1775-1817',
        'Ernest Hemingway : 1899-1961',
        'Mark Twain : 1835-1910'
      ];
  
      (Author.getAllAuthors as jest.Mock).mockResolvedValue(mockAuthors);
  
      const response = await request(app).get('/authors');
  
      expect(response.status).toBe(200);

      expect(response.body).toEqual(mockAuthors);
    });
  
    it('should return "No authors found" when no authors exist', async () => {
      
      (Author.getAllAuthors as jest.Mock).mockResolvedValue([]);
  
      const response = await request(app).get('/authors');
  
      expect(response.status).toBe(200);
      
      expect(response.text).toEqual("No authors found");
    });
  
    it('should return 500 if an error occurs', async () => {
      
      (Author.getAllAuthors as jest.Mock).mockRejectedValue(new Error('Database error'));
  
      const response = await request(app).get('/authors');
  
      expect(response.status).toBe(500);
      
      expect(response.text).toEqual("Internal Server Error");
    });
  });

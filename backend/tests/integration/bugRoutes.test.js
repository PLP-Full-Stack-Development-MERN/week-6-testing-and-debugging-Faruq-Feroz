const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, server } = require('../../server');
const Bug = require('../../models/Bug');

// Set up in-memory MongoDB for testing
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  server.close();
});

beforeEach(async () => {
  // Clear the database before each test
  await Bug.deleteMany({});
});

describe('Bug API Routes', () => {
  describe('GET /api/bugs', () => {
    test('should return empty array when no bugs exist', async () => {
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('should return all bugs', async () => {
      // Create test bugs
      await Bug.create([
        {
          title: 'Test Bug 1',
          description: 'Description 1',
          status: 'open',
          severity: 'medium',
        },
        {
          title: 'Test Bug 2',
          description: 'Description 2',
          status: 'in-progress',
          severity: 'high',
        },
      ]);
      
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty('title', 'Test Bug 1');
      expect(res.body[1]).toHaveProperty('title', 'Test Bug 2');
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const bugData = {
        title: 'New Bug',
        description: 'This is a new bug',
        status: 'open',
        severity: 'medium',
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(bugData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', 'New Bug');
      expect(res.body).toHaveProperty('status', 'open');
      
      // Verify it was saved to the database
      const bugsInDb = await Bug.find({});
      expect(bugsInDb.length).toBe(1);
    });

    test('should return 400 for invalid data', async () => {
      // Missing required fields
      const invalidData = {
        title: 'New Bug',
        // missing description
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(invalidData);
      
      expect(res.statusCode).toBe(400);
      
      // Verify nothing was saved
      const bugsInDb = await Bug.find({});
      expect(bugsInDb.length).toBe(0);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    test('should update a bug', async () => {
      // Create a test bug
      const bug = await Bug.create({
        title: 'Bug to Update',
        description: 'This will be updated',
        status: 'open',
        severity: 'medium',
      });
      
      const updateData = {
        status: 'in-progress',
        severity: 'high',
      };
      
      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send(updateData);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'in-progress');
      expect(res.body).toHaveProperty('severity', 'high');
      expect(res.body).toHaveProperty('title', 'Bug to Update'); // Unchanged field
    });

    test('should return 404 for non-existent bug', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .put(`/api/bugs/${fakeId}`)
        .send({ status: 'resolved' });
      
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    test('should delete a bug', async () => {
      // Create a test bug
      const bug = await Bug.create({
        title: 'Bug to Delete',
        description: 'This will be deleted',
        status: 'open',
        severity: 'medium',
      });
      
      const res = await request(app).delete(`/api/bugs/${bug._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', bug._id.toString());
      
      // Verify it was removed from the database
      const bugInDb = await Bug.findById(bug._id);
      expect(bugInDb).toBeNull();
    });

    test('should return 404 for non-existent bug', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app).delete(`/api/bugs/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
    });
  });
});
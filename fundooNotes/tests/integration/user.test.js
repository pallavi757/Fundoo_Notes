import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
// import dotenv from 'dotenv';
// dotenv.config();

import app from '../../src/index';

let loginToken = "";
let noteid;
//------------------> for clearing the collection
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });
  //For User Registration Test positive senario
  describe('post/userRegistration', () => {
    it('IT GIVEN USER DETAILS IN REGISTRATION SHOULD BE SAVED IN DATABASE', (done) => {
      const userReg = {
        firstName: "pallavi",
        lastName: "kinekar",
        email: "pallavik@gmail.com",
        password: "12347890"
      }
      request(app)
        .post('/api/v1/users/userRegistration')
        .send(userReg)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });
    //For User Registration Test Negative senario
  describe('post/userRegistration', () => {
    it('GIVEN WRONG USER DEATEILS SHOULD THROW ERROR', (done) => {
      const userReg = {
        firstname: "123",
        lastname: "1234",
        email: "1234@gmail.com",
        password: "123"
      }
      request(app)
        .post('/api/v1/users/userRegistration')
        .send(userReg)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
  //For login test Positive senario
  describe('post/login', () => {
    it('IT GIVEN USER LOGIN DEATAILS SHOULD MATCH WITH DATABASE', (done) => {
      const userLogin = {
        email: "pallavik@gmail.com",
        password: "12347890"

      }
      request(app)
        .post('/api/v1/users/login')
        .send(userLogin)
        .end((err, res) => {
          loginToken = res.body.data
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  //For login test Negative senario
  describe('post/login', () => {
    it('GIVEN USER UNSUCESSFULL LOGIN SHOULD THROW ERROR', (done) => {
      const userLogin = {
        email: "12334@gmail.com",
        password: "12347"

      }
      request(app)
        .post('/api/v1/users/login')
        .send(userLogin)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //For Notes Test
  /*  Create New Note For Positive senario*/
  describe('/note/addNote', () => {
    it('Create note should return status 201', (done) => {
      const userDetails = {
        Title: "Note1",
        Descreption: "This is a test description"

      }
      request(app)
        .post('/api/v1/note/addNote')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(userDetails)
        .end((err, res) => {
          noteid=res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  /*  Create New Note For Negative senario*/
  describe('/note', () => {
    it('Create New Note authentication failed  should return status 400', (done) => {
      const userDetails = {
        Title: "Note1",
        Descreption: "This is a test description"

      }
      request(app)
        .post('/api/v1/note/addNote')
        //.set('Authorization', `Bearer ${loginToken}`) 
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
  /* get all note for Positive senario */
  describe('/note/getAllNote', () => {
    it('given token should retrieve all the notes of the user', (done) => {
      request(app)
        .get('/api/v1/note/getAllNote')
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
         // noteid=res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
  /* get all note for Neative senario */
  describe('/note/getAllNote', () => {
    it('get all note authentication failed should return status 400', (done) => {
      request(app)
        .get('/api/v1/note/getAllNote')
        // .set('Authorization', `Bearer ${loginToken}`) 
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });

    });
  });
  // /* get single note Positive senario */
  describe('/note/_id', () => {
    it('get single note by id should return status 200 ', (done) => {
      request(app)
        .get(`/api/v1/note/${noteid}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          //noteid=res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);

        });
      done();
    });
  });

  /* get single note Negative senario */
  describe('/note/_id', () => {
    it('get single note by id should throw an error ', (done) => {
      request(app)
        .get(`/api/v1/note/${noteid}`)
        //.set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);

        });
      done();
    });
  });
/* update single note positive senario */
  describe('/note/_id', () => {
    it('given token should update the given note of the particular id ', (done) => {
      const userdetails = {
        Title: 'Note1',
        Descreption: 'Hello'
      };
      request(app)
        .put(`/api/v1/note/${noteid}`)
        .send(userdetails)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });

    });
  });
  /* update single note negative senario */
  describe('/note/_id', () => {
    it('note id is not found should throw an error ', (done) => {
      const userdetails = {
        Title: 'Note1',
        Descreption: 'Hello'
      };
      request(app)
        .put(`/api/v1/note/`)
        .send(userdetails)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(404);
          done();
        });

    });
  });
/* delete single note positive senario */
  describe('/note/_id', () => {
    it('Delete note by note id should return status 200 ', (done) => {
      // const userdetails = {
      // };
      request(app)
        .delete(`/api/v1/note/${noteid}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        });
      done();
    });
  });
  /* delete single note negative senario */
  describe('/note/_id', () => {
    it('note id is not found should throw an error ', (done) => {
      // const userdetails = {
      // };
      request(app)
        .delete(`/api/v1/note/`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(404);
        });
      done();
    });
  }); 
 /* Archive Note positive senario */
  describe('/note', () => {
    it('Archive Note by note id should return status 202 ', (done) => {
      request(app)
        .put(`/api/v1/note/${noteid}/isArchive`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
 /* Archive Note negative senario */
  describe('/note', () => {
    it('Archive Note authentication failed should return status 400', (done) => {
      request(app)
        .put(`/api/v1/note/${noteid}/isArchive`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
/* Transh Note positive senario */
  describe('/note', () => {
    it('Move to trash by note id should return status 200 ', (done) => {
      const userdetails = {};
      request(app)
        .put(`/api/v1/note/${noteid}/isDelete`)
        .set('Authorization', `Bearer ${loginToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
/* Transh Note negative senario */
  describe('/note', () => {
    it('Move to trash by note id authentication failed should return status 400', (done) => {
      const userdetails = {};
      request(app)
        .put(`/api/v1/note/${noteid}/isDelete`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
})
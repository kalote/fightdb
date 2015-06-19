var request = require('supertest');

describe('User (Model)', function() {
  before(function(done) {
    User.create({
      name: 'Johann BICH',
      nickname: 'kalote',
      gamertag: 'kalote',
      gender: 'Male',
      email: 'johannbich@gmail.com',
      encryptedPassword: 'password'
    }).exec(function(err, user) {
      if (err) done(err);
      done();
    });
  });
  it ('should encrypt password', function(done) {
    User.findOneByEmail('johannbich@gmail.com').exec(function(err, user) {
      user.encryptedPassword.should.not.be.eql('password');
      done(err);
    });
  });
  it ('should have a gravatar URL', function(done) {
    User.findOneByEmail('johannbich@gmail.com').exec(function(err, user) {
      user.gravatarUrl.should.not.be.empty;
      done(err);
    });
  });
});

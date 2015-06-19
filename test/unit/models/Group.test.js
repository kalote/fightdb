describe('Group (Model)', function() {
  it ('should not be empty', function(done) {
    Group.find().exec(function(err, groups) {
      groups.length.should.not.be.eql(0);
      done();
    });
  });
  it ('should have an array of members', function(done) {
    Group.findOne({name: 'Hong Kong'}).exec(function(err, group) {
      group.should.have.property('members');
      done();
    })
  });
});

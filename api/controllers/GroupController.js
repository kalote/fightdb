/**
 * GroupsController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Display the group of the user
  index: function (req,res){
    var output=[];
    Group.find()
    .populate('members')
    .exec(function (err, groups) {
      if (err) return res.negotiate(err);
      for (var i in groups){
        if (groups[i].members.indexOf(req.param('id'))>-1)
          output.push(groups[i]);
      }
      res.view('group/find', {
        layout: 'private',
        me: {
          id: req.param('id')
        },
        groups: groups
      });
    });
  },

  //Group subscription form
  edit: function (req, res) {
    Group.find()
    .populate('members')
    .exec(function (err, groups) {
      if (err) return res.negotiate(err);
      for (var i in groups){
        if (groups[i].members.indexOf(req.param('id'))>-1)
          groups[i].subscribed=true;
      }
      res.view('group/edit', {
        layout: 'private',
        me: {
          id: req.param('id')
        },
        groups: groups
      });
    });
  },

  //updateGroup action
  updategroup: function(req, res) {
    var uid = req.param("userId"),
        gid = req.param("groupId");

    Group.find(gid)
    .populate("members")
    .exec(function(err, g) {
      if (err) return res.negotiate(err);
      if (g[0].members && g[0].members.indexOf(uid)>-1) {
        g[0].members.remove(uid);
      } else {
        g[0].members.add(uid);
      }
      g[0].save(function(err,s){
        return res.ok();
      });
    });
  },

  // update user
  update: function(req, res) {
    return res.json({
      id: req.param('id')
    });
  }
};


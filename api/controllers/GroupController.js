/**
 * GroupsController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

_ = require("lodash");

module.exports = {
  //Display the group of the user
  index: function (req,res){
    var output=[];
    Group.find()
    .populate('members')
    .exec(function (err, groups) {
      if (err) return res.negotiate(err);
      for (var i in groups){
        if (_.find(groups[i].members, {id: req.param("id")}) !== undefined)
          output.push(groups[i]);
      }
      res.view('group/find', {
        layout: 'private',
        me: {
          id: req.param('id')
        },
        groups: output
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
        if (_.find(groups[i].members, {id: req.param("id")}) !== undefined)
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
      if (_.find(g[0].members, {id: uid}) !== undefined) {
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
  },

  // get all group ID for a specific user
  getgroups: function(req, res) {
    var out = [];
    User.findOne(req.param("id"))
    .populate("groups")
    .exec(function(err, u){
      if (err) return res.negotiate(err);

      for (var j in u.groups){
        if (u.groups[j].id !== undefined)
          out.push(u.groups[j].id);
      }
      return res.json({
        groups: out
      });
    });
  }
};


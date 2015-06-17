/**
 * GroupsController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Display the group of the user
  index: function (req,res){
    var groups=[];
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.negotiate(err);
      for (var i in user.groups){
        Group.findOne(user.groups[i]).exec(function (err, group) {
          if (err) return res.negotiate(err);
          groups.push(group);
        });
        res.view('group/find', {
          layout: 'private',
          pageName: 'Group',
          me: {
            id: req.param('id')
          },
          groups: groups
        });
      }
    });
  },

  //Group subscription form
  edit: function (req, res) {
    Group.find().exec(function (err, groups) {
      if (err) return res.negotiate(err);
      for (var i in groups){
        if (groups[i].members && groups[i].members.indexOf(req.param('id'))>-1)
          groups[i].subscribed=true;
      }

      res.view('group/edit', {
        layout: 'private',
        pageName: 'Group',
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

    Group.findOne(gid).exec(function(err, g) {
      if (err) return res.negotiate(err);
      if (g.members.indexOf(uid)>-1) {
        g.members.slice(g.members.indexOf(uid),1);
        Group.unsubscribe(req.socket,g);
        Group.publishUpdate(g.id, {members: g.members.length,action: "unsubscribe"});
      } else {
        g.members.push(uid);
        Group.subscribe(req.socket,g);
        Group.publishUpdate(g.id, {members: g.members.length,action: "subscribe"});
      }
      g.save(function(err,s){
        console.log(s);
      });
      return res.ok();
    });
  },

  // update user
  update: function(req, res) {
    var newGroups = req.param("group"),
        u = req.param("id");

    //we update the user with its group
    User.update(u, {groups: newGroups}).exec(function (err, user) {
      if (err) return res.negotiate(err);

      return res.json({
        id: u
      });
    });
  }
};


/**
 * StatisticsController
 *
 * @description :: Server-side logic for managing statistics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req,res){
    res.view('statistics/find', {
      layout: 'private',
      me: {
        id: req.param('id')
      }
    });
  }
}

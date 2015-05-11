/**
 * Usage:
 *
 * ```
 * res.nicknameInUse();
 * ```
 *
 */

module.exports = function nicknameInUse (){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(410, 'Nickname is already taken by another user.');
};

function PusherLowlaDBNotifier(pusher, options) {
  this._pusher = pusher;
  this._options = options || {};
}

PusherLowlaDBNotifier.prototype.notify = function(eventName, payload) {
  var channelName = this._options.channel || 'notifications';
  payload = payload || {};
  this._pusher.trigger(channelName, eventName, payload);
};

PusherLowlaDBNotifier.prototype.getNotifier = function() {
  return function(eventName, payload) {
    this.notify(eventName, payload);
  }.bind(this);
}
module.exports = PusherLowlaDBNotifier;

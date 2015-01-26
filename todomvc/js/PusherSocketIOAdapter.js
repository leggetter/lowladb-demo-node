// Socket.IO adapter hack
function PusherSocketIOAdapter(pusher, options) {
  this._pusher = pusher;
  this._options = options || {};
  
  var channelName = this._options.channel || 'notifications';
  this._channel = this._pusher.subscribe(channelName);
}

PusherSocketIOAdapter.prototype.connect = function() {
  return this;
};

PusherSocketIOAdapter.prototype.on = function(eventName, handler) {
  if(eventName === 'reconnect') {
    // TODO: should only trigger if reconnected
    this._pusher.connection.bind('connected', handler);
  }
  this._channel.bind(eventName, handler);
};

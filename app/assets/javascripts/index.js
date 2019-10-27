;(function (w, $) {
  
  function Chat() {
    this.$root = $('.chat');
    this.$header = this.$root.find('.chat-header');
    this.$body = this.$root.find('.chat-body');
    this.$footer = this.$root.find('.chat-footer');
    this.$input = this.$footer.find('.chat-footer-input');
    this.$sendBtn = this.$footer.find('.chat-footer-send-button');
  }
    
  Chat.prototype.subscribe = function () {
    var self = this;
    
    // visual block to send empty message
    self.$input.on('keyup', function (e) {
      var value = this.value;
      self.$sendBtn.prop('disabled', function (index, _btnValue) {
        return !(value && value.length && value.length > 0);
      });      
    });
    
    // subscribe on send message
    document.body.addEventListener('ajax:success', self._onMessageReceived.bind(self));
    document.body.addEventListener('ajax:error', self._onMessageError.bind(self));
  };
  
  
  Chat.prototype._onMessageReceived = function (event) {
    var self = this,
        detail = event.detail,
        data = detail[0], 
        status = detail[1], 
        xhr = detail[2];    
    this.$body.append(self._drawMessage(data.message));
    self.$input.val('');
    self.$sendBtn.prop('disabled', 'disabled');
  };
  
  
  Chat.prototype._onMessageError = function (event) {
    var self = this,
        detail = event.detail,
        statusText = detail[1];
    alert(statusText);
  };
  
  
  Chat.prototype._drawMessage = function (message) {
    var $message = $("<div/>", {
          "class": "chat-body-message",
          "text": message,
        });
    return $message;
  };
  
  
  w.Chat = Chat;

  
})(window, jQuery);

;(function (w, $) {
  
  function Chat() {
    this.$root = $('.chat');
    this.$chatHeader = this.$root.find('.chat-header');
    this.$chatBody = this.$root.find('.chat-body');
    this.$messages = this.$chatBody.find('.chat-body-messages');
    this.$chatFooter = this.$root.find('.chat-footer');
    this.$input = this.$chatFooter.find('.chat-footer-input');
    this.$sendBtn = this.$chatFooter.find('.chat-footer-send-button');
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
    document.body.addEventListener('ajax:beforeSend', self._onMessageBefore.bind(self));
    document.body.addEventListener('ajax:success', self._onMessageReceived.bind(self));
    document.body.addEventListener('ajax:error', self._onMessageError.bind(self));
  };
  
  
  Chat.prototype._onMessageBefore = function (event) {
    var self = this;
    this._addMessage(self.$input.val(), true);
  };
  
  
  Chat.prototype._onMessageReceived = function (event) {
    var self = this,
        detail = event.detail,
        data = detail[0], 
        status = detail[1], 
        xhr = detail[2];    
    this._addMessage(data.message);
    self.$input.val('');
    self.$sendBtn.prop('disabled', 'disabled');
    self.$chatBody.animate({scrollTop: self.$chatBody.prop('scrollHeight')}, 400)
  };
  
  
  Chat.prototype._onMessageError = function (event) {
    var self = this,
        detail = event.detail,
        statusText = detail[1];
    alert(statusText);
  };
  
  
  Chat.prototype._addMessage = function (message, isSend) {
    var $message = this._drawMessage(message, isSend);
    this.$messages.append($message);
  };
  
  
  Chat.prototype._drawMessage = function (message, isSend) {
    var $message = $("<div/>", {"class": "chat-body-message"}),
        $text = $("<span/>", {"class": "message-text", "text": message});
    $message.append($text);
    if (isSend === true) $message.addClass('send');
    return $message;
  };
  
  
  w.Chat = Chat;

  
})(window, jQuery);

;(function (w, $) {
  
  function Chat() {
    this.$root = $('.chat');
    this.$chatHeader = this.$root.find('.chat-header');
    this.$chatBody = this.$root.find('.chat-body');
    this.$messages = this.$chatBody.find('.chat-body-messages');
    this.$chatFooter = this.$root.find('.chat-footer');
    this.$input = this.$chatFooter.find('.chat-footer-input');
    this.$sendBtn = this.$chatFooter.find('.chat-footer-send-button');
    
    if (this._checkLocalStorage()) {
      try {
        this.history = JSON.parse(localStorage.getItem("history")) || []; 
      } catch (e) {
        this.history = [];
      }
      this._restoreFromHistory();
      this._scrollDown();
    } else {
      console.warn("No local storage supported");
    }
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
    self._scrollDown();
  };
  
  
  Chat.prototype._onMessageError = function (event) {
    var self = this,
        detail = event.detail,
        statusText = detail[1];
    alert(statusText);
  };
  
  
  Chat.prototype._addMessage = function (message, isSend) {
    this._drawMessage(message, isSend);
    this._pushToHistory(message, isSend);
  };
  
  
  Chat.prototype._drawMessage = function (message, isSend) {
    this.$messages.append(this._constructMessage(message, isSend));
  }
  
  
  Chat.prototype._constructMessage = function (message, isSend) {
    var $message = $("<div/>", {"class": "chat-body-message"}),
        $text = $("<span/>", {"class": "message-text", "text": message});
    $message.append($text);
    if (isSend === true) $message.addClass('send');
    return $message;
  };
  
  Chat.prototype._scrollDown = function () {
    var self = this;
    self.$chatBody.animate({scrollTop: self.$chatBody.prop('scrollHeight')}, 400);
  };
  
  
  Chat.prototype._checkLocalStorage = function () {
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  };
  
  
  Chat.prototype._pushToHistory = function (message, isSend) {
    this.history.push({message: message, isSend: !!isSend});
    localStorage.setItem("history", JSON.stringify(this.history));
  };
  
  
  Chat.prototype._restoreFromHistory = function () {
    if (Array.isArray(this.history) && (this.history.length > 0)) {
      for (var i = 0, l = this.history.length; i < l; i++) {
        this._drawMessage(this.history[i].message, this.history[i].isSend);
      }
    }
  };
  
  
  w.Chat = Chat;

  
})(window, jQuery);

// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


;(function (w, $) {
  
  function Chat() {
    this.$root = $('.chat');
    this.$footer = this.$root.find('.chat-header');
    this.$body = this.$root.find('.chat-body');
    this.$footer = this.$root.find('.chat-footer');
  }
    
  Chat.prototype.subscribe = function () {
    var self = this,
        $input = this.$footer.find('.chat-footer-input'),
        $sendBtn = this.$footer.find('.chat-footer-send-button');
    
    $input.on('keyup', function (e) {
      var value = this.value;
      
      $sendBtn.prop('disabled', function (index, _btnValue) {
        return !(value && value.length && value.length > 0);
      });      
    });
    
    
    $sendBtn.on("click", function (e) {
      self._send($input[0].value);
    })
    
    this._send("chat subscribed");
  };
  
  
  // PRIVATE METHODS
  
  Chat.prototype._send = function (message) {  
    console.group("%c Custom log:", "background: lightgreen; color: orange; font-size: 16px;");
    console.log(message);
    console.groupEnd();
  };
  
  w.Chat = Chat;

  
})(window, jQuery);

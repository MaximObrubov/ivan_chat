// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


;(function (w, $) {
  
  function Chat() {
    this.$root = $("body")
  }
    
  Chat.prototype.subscribe = function () {
    this.send("chat subscribed");
  };
  
  
  Chat.prototype.send = function (message) {  
    console.group("%c Custom log:", "background: lightgreen; color: orange; font-size: 16px;");
    console.log(message);
    console.groupEnd();
  };
  
  w.Chat = Chat;

  
})(window, jQuery);

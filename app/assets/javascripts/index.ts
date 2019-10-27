// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


class Chat {
  
  constructor() {
    
  }
  
  send(message: 'string') {
    console.group("%c Custom log:", "background: lightgreen; color: orange; font-size: 16px;");
    console.log("message was send: ${message}");
    console.groupEnd();
  }
  
}
var socket = io.connect('http://localhost:8080', { 'forceNew': true });
//Parte del cliente conectamos con localhost
//escuchamos el evento messages
// data tendr� el array de mensajes  que env�a el servidor
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})
let id_user;
// esta función se encarga de pintar en el HTML los mensajes
function render (data) {  
  var html = data.map(function(elem, index) {
      let color;
      if(elem.id != id_user){
        color = `alert alert-warning`
      }else{
        color = `alert alert-success`
      }
      return(`
      <div class="row">
        <div class="col-md-12 input-group container-fluid">
          <span class='input-group-addon'>
          <strong><input type="text" class='form-control text-right ${color}' value='${elem.author}:' readonly='readonly'></strong>
          </span>
          <input type="text" class='form-control w-75 ${color}' value='${elem.text}' readonly='readonly'">
        </div>
      </div>
      <br>`);
  }).join(" ");
 

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value,
    id: socket.id
  };
  id_user = message.id;
  socket.emit('new-message', message);
  return false;
}
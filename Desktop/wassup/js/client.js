
const socket = io.connect('http://localhost:8000');

const form = document.getElementById('send-msg-container');
const messageInput = document.getElementById('msginput');
const messageContainer = document.querySelector('.container');
var audio = new Audio('Ting.mp3');

const append = (message, position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
 if(position=='left-side'){
   audio.play();
 }
}



const name = prompt("Enter your name to join");
// var name = nameWithoutBold.bold();

socket.emit('new-user-joined', name);

socket.on('user-joined' ,  name =>{
  append(`${name} joined the chat` , 'right-side')
})

socket.on('receive' ,  data=>{
  append(`${data.name} : ${data.message}` , 'left-side' )
})

socket.on('left-side', name=>{
  append(`${name} left the chat` , 'left-side')
})

form.addEventListener('submit' ,(e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}` , 'right-side');
  socket.emit('send' ,  message);
  messageInput.value ='';
});

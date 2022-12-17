const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Websockets Chat',
     name: '',
     text: '',
     messages: [],
     socket: null
    },
    methods: {
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text,
       recieverId: '02QPWbaRkjS84TYzDgHTSVWg09t1'
      }
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    }
   },
    created() {
     this.socket = io( `http://localhost:3000?token=01asnonCi2SYsKTeaElvLk0BZw52`),
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })

   var socket = io("http://localhost", {
    extraHeaders: {
      Authorization: "Bearer authorization_token_here"
    }
});
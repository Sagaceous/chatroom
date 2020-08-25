//dom requeries
const chatList = document.querySelector('body > div > div.chat-window > ul');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch((err) => console.log(err));

})
//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset form
    newNameForm.reset();
    //show then hide the update message 
    updateMsg.innerText = `Your name was updated to ${newName}`;

    setTimeout(() => updateMsg.innerText ='', 3000);

})
//chat rooms update
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        const roomupdate = e.target.getAttribute('id');
        chatroom.updateRoom(roomupdate);
        chatroom.getChats(chat => chatUI.render(chat));
    }
});
//check local storage
const username = localStorage.username ? localStorage.username :'anonymous';

//class instance
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));
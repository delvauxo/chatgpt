const form = document.querySelector('#chatForm');
const input = document.querySelector('#chatInput');
const chatBox = document.querySelector('#chatBox');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.classList.add('show-spinner');

    // log user input in the chatbox
    const userInput = input.value;
    const userMessage = document.createElement('p');
    userMessage.classList.add('chat-message', 'user');
    userMessage.innerHTML = userInput;
    chatBox.appendChild(userMessage);

    // scroll to the bottom of the chat box right (request)
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
    // reset the prompt with the placeholder
    input.value = '';

    const response = await axios.post('/api/chatgpt', { text: userInput });
    const message = response.data.message.content;
    const formattedMessage = message.replace(/\n/g, '<br>');

    // create a new chat message element with the bot's response
    const chatMessage = document.createElement('p');
    chatMessage.classList.add('chat-message', 'bot');
    chatMessage.innerHTML = formattedMessage;

    // append the new chat message element to the chat box
    chatBox.appendChild(chatMessage);

    // scroll to the bottom of the chat box right (response)
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });

    form.classList.remove('show-spinner');
});


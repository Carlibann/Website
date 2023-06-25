
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = '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';

        document.getElementById('send-button').addEventListener('click', sendMessage);

        async function sendMessage() {
            const userInput = document.getElementById('user-input').value;
            if (userInput.trim() === '') return;

            appendMessage('user', userInput);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    'messages': [
                        {
                            'role': 'system',
                            'content': 'You are ChatGPT'
                        },
                        {
                            'role': 'user',
                            'content': userInput
                        }
                    ]
                })
            });

            const data = await response.json();

            const modelResponse = data.choices[0].message.content;

            appendMessage('chatbot', modelResponse);

            document.getElementById('user-input').value = '';
        }

        function appendMessage(role, content) {
            const chatLog = document.getElementById('chat-log');
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message', role);
            messageContainer.innerText = content;
            chatLog.appendChild(messageContainer);
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    

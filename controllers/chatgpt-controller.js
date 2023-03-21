const { Configuration, OpenAIApi } = require("openai");
const apiKey = require('dotenv-flow').config().parsed.OPENAI_API_KEY;
const oliver = require('../data/oliver');

// Getting User's properties as full string separated by commas.
let props = '';

for (const prop in oliver) {
    if (Object.hasOwnProperty.call(oliver, prop)) {
        const element = oliver[prop];
        props += ", " + element;
    }
}

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// Declare an array to store the messages
let messages = [];

// Modify the chatCompletion function to add the user's message to the array
const chatCompletion = async (req, res) => {
    try {
        if (oliver.dislike) {
            oliver.dislike += 'n\aime pas ';
        }

        // Add the user's message to the array
        messages.push({ role: "user", content: req.body.text });

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpful assistant that always answers in French." },
                { "role": "system", "content": "Always before answering, take into consideration these User's information : " + props + " !" },
                // Use the messages array to pass in all messages, including the user's message
                ...messages,
            ],
        });

        const message = completion.data.choices[0].message;

        // Add the chatBot's message to the array
        messages.push(message);

        res.status(200).json({ message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};


module.exports = { chatCompletion };


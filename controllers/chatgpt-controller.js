const { Configuration, OpenAIApi } = require("openai");
const apiKey = require('dotenv-flow').config().parsed.OPENAI_API_KEY;
const oliver = require('../data/oliver');


console.log(oliver);


// Getting User's properties as full string separated by commas.
let props = '';

for (const prop in oliver) {
    if (Object.hasOwnProperty.call(oliver, prop)) {
        const element = oliver[prop];
        props += ", " + element;
    }
}

console.log(props);

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const chatCompletion = async (req, res) => {
    try {
        if (oliver.dislike) {
            oliver.dislike += 'n\aime pas ';
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpful assistant that always answers in French." },
                { "role": "system", "content": "Always before answering, take into consideration these User's information : " + props + " !" },
                { role: "user", content: req.body.text }
            ],
        });
        const message = completion.data.choices[0].message;


        console.log(message);


        res.status(200).json({ message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { chatCompletion };


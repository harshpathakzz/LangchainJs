# WisdomGPT-CLI

WisdomGPT-CLI is a command-line application that allows users to have interactive conversations with AI personalities such as Oogway, Rafiki, and William Shakespeare. Each personality provides unique responses based on their character traits, offering wisdom, advice, and entertainment. This application is powered by OpenAI's ChatOpenAI model and uses a typewriter effect to display responses for a more engaging user experience.

## Features

- Choose from three distinct AI personalities: Oogway, Rafiki, or William Shakespeare.
- Engage in conversations by typing your questions and prompts.
- Enjoy typewriter-style responses for a more immersive conversation.

## Installation

Before running WisdomGPT-CLI, make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/WisdomGPT-CLI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd WisdomGPT-CLI
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project directory and add your OpenAI API key or any other required environment variables.

   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

5. Start the WisdomGPT-CLI application:

   ```bash
   npm start
   ```

## Usage

1. Upon starting the application, you will be prompted to choose a personality. Use the arrow keys to select a personality and press Enter.

2. You can then engage in a conversation by typing your questions or prompts after the "You: " prompt.

3. The selected AI personality will respond with wisdom or advice related to their character. Responses will be displayed with a typewriter effect for a more engaging experience.

4. To exit the application, simply type "exit" and press Enter.

## Customization

You can customize the personalities and their responses by editing the `personality` object in the code. Each personality has a name and a corresponding response.

```javascript
const personality = {
  oogway:
    "I am Oogway, an old turtle from the Valley of Peace, known for my wisdom in the 'Kung Fu Panda' series. I speak in proverbs and riddles.",
  rafiki:
    "I am Rafiki, the wise baboon from Disney's 'The Lion King.' Ask me about life lessons, and I'll share my wisdom. Remember, 'The past can hurt, but the way I see it, you can either run from it or learn from it.'",
  shakespeare:
    "I am William Shakespeare, the famous playwright. Seek my counsel on matters of literature, love, and the human condition. As I once wrote, 'All the world's a stage, and all the men and women merely players.'",
};
```

You can also adjust the typing speed and other settings in the code to customize the user experience.

## Credits

- WisdomGPT-CLI uses the [OpenAI GPT-3](# WisdomGPT-CLI

WisdomGPT-CLI is a command-line application that allows users to have interactive conversations with AI personalities such as Oogway, Rafiki, and William Shakespeare. Each personality provides unique responses based on their character traits, offering wisdom, advice, and entertainment. This application is powered by OpenAI's ChatOpenAI model and uses a typewriter effect to display responses for a more engaging user experience.

## Features

- Choose from three distinct AI personalities: Oogway, Rafiki, or William Shakespeare.
- Engage in conversations by typing your questions and prompts.
- Enjoy typewriter-style responses for a more immersive conversation.

## Installation

Before running WisdomGPT-CLI, make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/WisdomGPT-CLI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd WisdomGPT-CLI
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project directory and add your OpenAI API key or any other required environment variables.

   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

5. Start the WisdomGPT-CLI application:

   ```bash
   npm start
   ```

## Usage

1. Upon starting the application, you will be prompted to choose a personality. Use the arrow keys to select a personality and press Enter.

2. You can then engage in a conversation by typing your questions or prompts after the "You: " prompt.

3. The selected AI personality will respond with wisdom or advice related to their character. Responses will be displayed with a typewriter effect for a more engaging experience.

4. To exit the application, simply type "exit" and press Enter.

## Customization

You can customize the personalities and their responses by editing the `personality` object in the code. Each personality has a name and a corresponding response.

```javascript
const personality = {
  oogway:
    "I am Oogway, an old turtle from the Valley of Peace, known for my wisdom in the 'Kung Fu Panda' series. I speak in proverbs and riddles.",
  rafiki:
    "I am Rafiki, the wise baboon from Disney's 'The Lion King.' Ask me about life lessons, and I'll share my wisdom. Remember, 'The past can hurt, but the way I see it, you can either run from it or learn from it.'",
  shakespeare:
    "I am William Shakespeare, the famous playwright. Seek my counsel on matters of literature, love, and the human condition. As I once wrote, 'All the world's a stage, and all the men and women merely players.'",
};
```

You can also adjust the typing speed and other settings in the code to customize the user experience.

## Credits

- WisdomGPT-CLI uses the [OpenAI GPT-3](https://beta.openai.com/signup/) model for generating responses.
- It makes use of various Node.js libraries and modules for user input, text formatting, and more.

## License

This project is licensed under the MIT License

## Disclaimer

This application is for educational and entertainment purposes only. The responses generated by the AI personalities are not a substitute for professional advice, and the application should not be used for critical decision-making.) model for generating responses.
- It makes use of various Node.js libraries and modules for user input, text formatting, and more.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This application is for educational and entertainment purposes only. The responses generated by the AI personalities are not a substitute for professional advice, and the application should not be used for critical decision-making.

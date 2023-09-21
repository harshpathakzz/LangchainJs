// Import required modules and libraries
import { config } from "dotenv"; // Load environment variables from a .env file
config();

import { ConversationChain } from "langchain/chains"; // Import ConversationChain class
import { ChatOpenAI } from "langchain/chat_models/openai"; // Import ChatOpenAI class
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts"; // Import various templates for creating chat prompts

import { BufferMemory } from "langchain/memory"; // Import BufferMemory for conversation history
import chalk from "chalk"; // Import chalk for colorful console output
import inquirer from "inquirer"; // Import inquirer for user input

// Initialize the ChatOpenAI model with specific parameters
const chat = new ChatOpenAI({
  temperature: 0.9,
  maxTokens: 100,
  frequencyPenalty: 1,
  presencePenalty: 1,
});

// Define personalities and their associated responses
const personality = {
  oogway:
    "I am Oogway, an old turtle from the Valley of Peace, known for my wisdom in the 'Kung Fu Panda' series. I speak in proverbs and riddles.",
  rafiki:
    "I am Rafiki, the wise baboon from Disney's 'The Lion King.' Ask me about life lessons, and I'll share my wisdom. Remember, 'The past can hurt, but the way I see it, you can either run from it or learn from it.'",
  shakespeare:
    "I am William Shakespeare, the famous playwright. Seek my counsel on matters of literature, love, and the human condition. As I once wrote, 'All the world's a stage, and all the men and women merely players.'",
};

// Define colorful styles for console output
const colorfulStyles = {
  title: chalk.hex("#13b541"), // Title color
  userPrompt: chalk.hex("#00FFFF"), // User's input color
  characterName: chalk.hex("#00FFFF"), // Character's name color
  response: chalk.hex("#E2894B"), // Response color
};

// Function to create a chat prompt based on the selected personality
function createChatPrompt(personName) {
  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      colorfulStyles.characterName(personality[personName])
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate(
      colorfulStyles.userPrompt("{input}")
    ),
  ]);
}

// Function to display response with a typewriter effect
function displayResponseWithTypewriterEffect(response) {
  return new Promise((resolve) => {
    const responseText = colorfulStyles.response(response);
    const delay = 50; // Adjust the typing speed as needed

    let i = 0;

    const typeCharacter = () => {
      process.stdout.write(responseText[i]);
      i++;

      if (i < responseText.length) {
        setTimeout(typeCharacter, delay);
      } else {
        process.stdout.write("\n");
        resolve();
      }
    };

    typeCharacter();
  });
}

// Main function
async function main() {
  console.log(colorfulStyles.title("\nWisdomGPT\n")); // Display a title

  const selectedPersonality = await choosePersonality(); // Allow the user to choose a personality

  // Create a ConversationChain with memory, prompt, and the ChatOpenAI model
  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: createChatPrompt(selectedPersonality),
    llm: chat,
  });

  let input;

  do {
    input = await askQuestion(); // Ask the user for input

    const wait = waitAnimation(); // Start a loading animation

    const response = await chain.call({ input }); // Make a conversation call to the model

    wait.stop(); // Stop the loading animation

    // Display the character's name with typewriter effect
    process.stdout.write(
      colorfulStyles.characterName(`${selectedPersonality}: `)
    );

    // Display the response with a typewriter effect
    const cleanedResponse = postProcessResponse(response.response);
    await displayResponseWithTypewriterEffect(cleanedResponse);
  } while (input !== "exit"); // Continue the loop until the user types "exit"
}

// Function to create a loading animation
function waitAnimation() {
  let interval;
  const frames = ["-", "\\", "|", "/"];
  let i = 0;

  interval = setInterval(() => {
    process.stdout.write(`\r${frames[i++]}`);
    i &= 3;
  }, 250);

  return {
    stop() {
      clearInterval(interval);
      process.stdout.write("\n");
    },
  };
}

// Function to ask the user for input
async function askQuestion() {
  const { userInput } = await inquirer.prompt([
    {
      type: "input",
      name: "userInput",
      message: colorfulStyles.userPrompt("You: "), // Prompt the user with "You: "
    },
  ]);
  return userInput;
}

// Function to allow the user to choose a personality
async function choosePersonality() {
  const personalityChoices = Object.keys(personality);
  const { selectedPersonality } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedPersonality",
      message: colorfulStyles.userPrompt("Choose a personality:"), // Prompt the user to choose a personality
      choices: personalityChoices,
    },
  ]);
  return selectedPersonality;
}

// Function to post-process the model's response
function postProcessResponse(response) {
  // Split the response into sentences
  const sentences = response.split(/[.!?]/);

  // Filter out incomplete sentences
  const completeSentences = sentences.filter((sentence) => {
    // Check if the sentence is not empty and doesn't end with a space (indicating it's incomplete)
    return sentence.trim().length > 0 && !/\s$/.test(sentence);
  });

  // Rebuild the cleaned response by joining complete sentences with their original punctuation
  const cleanedResponse = completeSentences
    .map((sentence, index) => {
      const punctuation = response.match(/[.!?]/g)[index] || ""; // Get the original punctuation
      return sentence.trim() + punctuation;
    })
    .join(" ");

  return cleanedResponse;
}

main(); // Call the main function to start the program

import { config } from "dotenv";
config();

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";

import { BufferMemory } from "langchain/memory";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = new ChatOpenAI({
  temperature: 0.7,
  maxTokens: 50,
  frequencyPenalty: 1,
  presencePenalty: 1,
});

// Define personality object with references to movies and literature
const personality = {
  oogway:
    "I am Oogway, an old turtle from the Valley of Peace, known for my wisdom in the 'Kung Fu Panda' series. I speak in proverbs and riddles.",
  rafiki:
    "I am Rafiki, the wise baboon from Disney's 'The Lion King.' Ask me about life lessons, and I'll share my wisdom. Remember, 'The past can hurt, but the way I see it, you can either run from it or learn from it.'",
  shakespeare:
    "I am William Shakespeare, the famous playwright. Seek my counsel on matters of literature, love, and the human condition. As I once wrote, 'All the world's a stage, and all the men and women merely players.'",
  // Add more personalities with references and prompts here
};

// Function to create a chat prompt from a personality
function createChatPrompt(personName) {
  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(personality[personName]),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
}

const chatPrompt = createChatPrompt("shakespeare"); // Use the personality by default

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

async function main() {
  console.log(chalk.bold.green("\nCharacter Chatbot\n"));

  let input;

  do {
    input = await askQuestion();

    const wait = waitAnimation();

    const response = await chain.call({ input });

    wait.stop();

    console.log(chalk.bold.yellow(`Character: ${response.response}`));
  } while (input !== "exit");
}

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

async function askQuestion() {
  const question = chalk.cyan("You: ");
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      resolve(input);
    });
  });
}

main();

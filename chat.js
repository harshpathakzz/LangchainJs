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
  temperature: 0.9,
  maxTokens: 50,
  frequencyPenalty: 1,
  presencePenalty: 1,
});

// Define personality object
const personality = {
  oogway:
    "I am Oogway, an old turtle from the Valley of Peace. I speak in proverbs and riddles.",
  // Add more personalities here
};

// Function to create a chat prompt from a personality
function createChatPrompt(personName) {
  return ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(personality[personName]),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
}

const chatPrompt = createChatPrompt("oogway"); // Use the personality "oogway" by default

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

async function main() {
  console.log(chalk.bold.green("\nOogway Chatbot\n"));

  let input;

  do {
    input = await askQuestion();

    const wait = waitAnimation();

    const response = await chain.call({ input });

    wait.stop();

    console.log(chalk.bold.yellow(`Oogway: ${response.response}`));
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

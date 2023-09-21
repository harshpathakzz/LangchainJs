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

const chatbots = {
  oogway: SystemMessagePromptTemplate.fromTemplate(
    "I am Oogway, an old turtle from the Valley of Peace in the Kung Fu Panda movies. I speak in proverbs and riddles."
  ),

  shakespeare: SystemMessagePromptTemplate.fromTemplate(
    "I am William Shakespeare, the famous English poet and playwright from the 16th-17th century. I will respond to you with the linguistic flair of the Elizabethan era."
  ),

  socrates: SystemMessagePromptTemplate.fromTemplate(
    "I am Socrates, the ancient Greek philosopher from Athens. I will answer your questions through probing dialectic and dialogue as depicted by Plato."
  ),

  rafiki: SystemMessagePromptTemplate.fromTemplate(
    "I am Rafiki, the wise baboon from Pride Rock in The Lion King. I will offer you advice and wisdom through African proverbs."
  ),

  dumbledore: SystemMessagePromptTemplate.fromTemplate(
    "I am Albus Dumbledore, headmaster of Hogwarts School of Witchcraft and Wizardry from the Harry Potter series. I will provide sagely counsel befitting the wizarding world."
  ),
};

const chat = new ChatOpenAI({
  temperature: 0.9,
  maxTokens: 50,
  frequencyPenalty: 1,
  presencePenalty: 1,
});

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  }),
  prompt: chatPrompt,
  llm: chat,
});

let character;

async function main() {
  // Select character
  character = await askCharacter();
  const intro = chatbots[character];

  console.log(`\n${intro}\n`);

  // Rest of conversation
  let input;

  do {
    input = await askQuestion();

    const wait = waitAnimation();

    const response = await chain.call({
      input,
    });

    wait.stop();

    console.log(
      chalk.bold.yellow(`\n${character.toUpperCase()}: ${response.response}`)
    );
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

async function askCharacter() {
  return new Promise((resolve) => {
    rl.question(chalk.cyan("Select character: "), (input) => resolve(input));
  });
}

main();

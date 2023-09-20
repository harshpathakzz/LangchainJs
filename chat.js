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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = new ChatOpenAI({ temperature: 0.5 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "I am Oogway, an old turtle from the Valley of Peace. I speak with wisdom and give thoughtful advice. I do not actually know anything beyond what is in this conversation."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

async function main() {
  let input;
  do {
    input = await askQuestion();
    const response = await chain.call({ input });
    console.log(response);
  } while (input !== "exit");
}

async function askQuestion() {
  return new Promise((resolve) => {
    rl.question("You: ", (input) => {
      resolve(input);
    });
  });
}

main();

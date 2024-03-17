import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { getPrompt } from "@/data/prompts";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { role, company, description, resume } = await req.json();
  const letter = await generateLetter(role, company, description, resume);

  return NextResponse.json(letter);
}

async function generateLetter(
  role: string,
  company: string,
  description: string,
  resume: string
) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: getPrompt(0),
    },
    {
      role: "user",
      content: getPrompt(1, { description }),
    },
  ];

  const completion_1 = await openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    top_p: 0.9,
  });

  messages.push(completion_1.choices[0].message);
  messages.push({
    role: "user",
    content: getPrompt(2, { role, company }),
  });

  const completion_2 = await openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    top_p: 0.9,
  });

  messages.push(completion_2.choices[0].message);
  messages.push({
    role: "user",
    content: getPrompt(3, {
      role,
      company,
      resume,
      AIResponse: completion_2.choices[0].message.content,
    }),
  });

  const finalCompletion = await openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    top_p: 0.9,
  });

  return finalCompletion.choices[0].message.content;
}

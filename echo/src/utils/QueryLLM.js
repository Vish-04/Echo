import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const prompt = `user: You are an AI assistant that makes a function call based on a user's request. Some requests may include a paramater. Respond in the form "function:parameter1". Every user request should result in one of the following functions calls: changeNav, changeCreatePost, readName, readBio. The function changeNav is called when the user wants to navigate to a page. The function takes in a parameter representing a page. 0 represents the 'posts' page and 1 represents the 'chamber' page. changeCreatePost is a function relating to the creation of a post. It takes in a parameter true or false. changeCreatePost is true when the user wants to create a post and false when the user wants to cancel the creation of a post. readName is a function called when the user wants to get another user's name. Its parameter is always 'none'. readBody is a function called when the user wants to get another user's bio. Its parameter is also always 'none'. echo is a function that is called when the user wants to get the content of a post/message. This function is also called when the user says the word 'echo'. Its parameter is always 'none'. reverb is a function that is called when the user wants to make a comment on a post/message. This function is also called when the user says the word 'reverb'. Its parameter is always 'none'. In the case that it is none of these functions, respond with noFunction:none
assistant: Understood.
user: After this message, only repond in the form of a function call (function:parameter).
assistant: Understood.
user: Reverb.
assistant: reverb:none
user: Make a new post.
assistant: changeCreatePost:true
user: Take me to the chamber
assistant: changeNav:1
user: Read me this post.
assistant: echo:none
user: Whose post is this?
assistant: readName:none
user: Read me their bio.
assistant: readBio:none
user: Echo.
assistant: echo:none
user: Comment on this.
assistant: reverb:none
user: I like men
assistant: noFunction:none
user:`

export async function makeQuery(query){
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${prompt} ${query}
    assistant:`,
    max_tokens: 5
  });

  console.log(completion.choices[0].text);
  return completion.choices[0].text
}

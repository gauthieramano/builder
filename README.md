# Builder

Minimal "Lovable-style" tool that transforms natural-language prompts into client-only.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The latest version of the application is deployed here via Vercel:
https://builder.proj9ct.com

A 5 minute **Loom** presentation is available here:
https://www.loom.com/share/f8386c5e81bf48b4aba86d245a3db7f0

## Quick start

First, you have to install the project with `Node.js 18.18` or later:

```sh
npm i
```

Then, it is recommanded to build the application and run it in Production mode _(for a better user experience)_:

```sh
npm run build
npm run start
```

But instead, you can also run the development server:

```sh
npm run dev
```

In both cases, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Notes:**
- The project also works with PNPM, Yarn and Bun.
- In Development mode, you can edit any file of the project _(for instance, you can set a different LLM editing `/app/api/chat/route.ts`)_. The application auto-updates as you edit the file.

## API Key

On the homepage, you will have to copy & paste an Open AI API key. The API key will be masked for security reasons and stored in the localStorage. As far as you don't clear the localStorage or delete the `llmApiKey` key manually, the input field will be automatically filled after the first time you sign in by clicking on `Save and vibe code`.

The input field loses the focus on purpose once the value is modified as there is no point to enter a such long string character by character. And to avoid any mistake, the field is cleared on focus. That doesn't mean that the API key is removed from the localStorage. The way to get it back without having to copy & paste it again is to click on the `Reload` button.

The application uses a backend route (`/api/chat`) to consume an Open AI model via the AI SDK adapter. The application is set with `gpt-5-nano-2025-08-07`. In order to change this hard-coded value to another Open AI model, edit the line 7 of this file: `/app/api/chat/route.ts`.

There are 2 ways to log out and remove your API key from the localStorage using the application:
- on the homepage, copy & paste any string with a length in the range of 10 to 256 characters and save it
- or on the vibe-coding page, click on the close button on the top right to clear the localStorage

If you save an invalid Open AI API key, you will access the vibe-coding page (`/vibecoding`), but once you will send a prompt, you will get an error message via a toast notification. Consequently, you will have to sign out by clicking on the close button and sign in with a proper API key. And if you want to access to the vide-coding page with no stored API key by putting the URL manually in the browser, you will automatically be redireccted to the homepage.

_Note: If you enter any other path, you will get a 404 error page, except for `/api/chat`. In this case, you will be redirected to the homepage._

## Few features

- The application will make its best to generate a React application, but it can detect if the user tries to fool it with a certain degree of confidence _(more or less good)_. Therefore, there will be 2 kinds of response:
  - a JSX file to generate the application
  - a regular text to give the reason why he can't proceed the resquest and to suggest a useful alternative to guide the user with goodwill

- The application allows to undo and redo any step of a conversation, so we can start a new conversation by going back to the inital "Hello, world!" page in order not to be affected by any previous context. Of course, we can achieve the same goal by signing out and signing in again

- The user can see the project in the Cloud via Codesandbox like a developer would do locally with all the files he needs to set and run the generated application locally. Moreover Codesandbox generates a URL for the preview, so the user can visualize the application in full by copying & pasting it in a new the browser tab/window.

## Limitations

- Ccurrently, the application just supports Open AI LLMs. Thanks to the AI SDK, implementing other ones would fast forward thanks to [thier generous amount of providers](https://ai-sdk.dev/providers/ai-sdk-providers) _(for Grok, Anthropic, DeepSeek and much more)_

- The preview of the generated application generally responds pretty fast, but it can take few seconds to be displayed _(Codesandbox can lag)_, giving the impression nothing is happening. Also, if we navigate too fast in the history, the wrong 

- No conversation is stored in the localStorage or remotely (in a database for instance), so once the browser window/tab is closed, there is no way to get a conversation back

- The project is using Tailwind CSS for styling via a CDN. It's not the most performant solution, but it's the most simple one for the user if he wants to bootstrap a project with the generated JSX file with a minimal configuration

## Deploy on Vercel

No environment variable is used to deploy this application.

As this application is a Next.js one, the easiest way to deploy it is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Linting with Biome

To check if all the files are correctly linted, run this command:

```sh
npm run lint
```

To format all the files, run this command:

```sh
npm run format
```

## Technologies

This project uses:

- `TypeScript` _(v5)_
- `React` _(v19)_
- `Next.js` _(v15.5)_
- `AI SDK by Vercel` _(v5)_ with `@ai-sdk/openai`
- `Tailwind CSS` _(v4)_
- `Shadcn/ui`
- `AI Elements`
- `React Hook Form` _(v7)_
- `useHooks` _(2.4)_
- `Zod` _(v4)_
- `Biome` _(v2.2)_


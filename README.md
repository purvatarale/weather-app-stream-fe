# 🌤️ Weather Agent Chat Interface

A modern **chat interface** built with **Next.js** that connects to a weather agent API, enabling users to ask
weather-related queries in real time.

This project emphasizes **clean UI, smooth UX, and robust API integration**, using a thoughtfully chosen stack:

- ⚡ **Next.js 15** (Pages Router) – framework & routing
- 🎨 **Tailwind CSS** – utility-first styling
- 🪄 **shadcn/ui** – accessible, themeable UI components
- 🗂️ **Zustand** – lightweight state management
- 📦 **Yarn** – dependency management

---

## ✨ Features

- **Real-time chat UI**
    - User messages (right-aligned)
    - Agent responses (left-aligned)
    - Auto-scroll to latest message

- **API Integration**
    - Connects to the provided **weather agent streaming API**
    - Handles loading states and errors gracefully

- **State Management**
    - Powered by **Zustand** for lightweight and predictable store handling

- **UI & UX**
    - Fully responsive (mobile-first design)
    - Smooth animations and transitions
    - Clean modern interface built with **shadcn/ui + Tailwind**
    - Timestamps for messages
    - Error and loading indicators

- **Extra polish**
    - Keyboard shortcuts (Enter to send)
    - Clear chat functionality
    - Dark/light theme ready

---

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Package Manager:** [Yarn](https://yarnpkg.com/)

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/weather-agent-chat.git
cd weather-agent-chat
yarn install
````

Run the development server:

```bash
yarn dev
```

The app should now be running at **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 🔑 API Integration

The app connects to the **Weather Agent API**:

```
POST https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream
```

> ⚠️ Make sure to replace `YOUR_COLLEGE_ROLL_NUMBER` in the request body’s `threadId` field.

Example payload:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "What's the weather in London?"
    }
  ],
  "runId": "weatherAgent",
  "maxRetries": 2,
  "maxSteps": 5,
  "temperature": 0.5,
  "topP": 1,
  "runtimeContext": {},
  "threadId": "YOUR_COLLEGE_ROLL_NUMBER",
  "resourceId": "weatherAgent"
}
```

---

## 📂 Project Structure

```bash
.
├── pages/                # Next.js app router pages & layouts
├── components/         # Reusable UI components (shadcn based)
├── layouts/              # Custom layouts
├── store/              # Zustand state store
├── lib/             # Utils
└── README.md
```

---

## 🧪 Test Cases

Try the following queries:

1. **Basic Interaction**

    * “What’s the weather in London?”
    * ✅ Should return agent’s response

2. **Error Handling**

    * Disconnect internet and send a message
    * ✅ Should display error state

3. **Multiple Messages**

    * Send multiple queries back-to-back
    * ✅ Should maintain chat history properly

---

## 🚀 Deployment

Easily deployable to **Vercel**.

```bash
yarn build
yarn start
```

---

## 📖 Documentation

* Built with **clean, modular components**
* Follows **mobile-first responsive design**
* State handled with **Zustand** for simplicity
* Styled using **Tailwind + shadcn** for consistency and themeability

---

## 🌟 Future Enhancements

* 🔍 Message search
* 📤 Export chat history
* 🌗 Dark/Light theme toggle
* 👀 Typing indicators
* 🧑‍🤝‍🧑 Message reactions

---

## 👨‍💻 Author

Developed with ❤️ using Next.js, Tailwind, shadcn, and Zustand.

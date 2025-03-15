# Modern Todo Application

A modern, feature-rich todo application built with Next.js, TypeScript, Material-UI, and Redux Toolkit. This application allows users to manage tasks through collections, with support for subtasks, due dates, and real-time updates.

## Features

### Collections

- Create, edit, and delete collections
- Mark collections as favorites
- Visual organization with custom collection icons
- Grid view of all collections

### Tasks

- Create, edit, and delete tasks
- Create subtasks (nested tasks)
- Set due dates for tasks
- Mark tasks as complete/incomplete
- Organize tasks within collections
- Real-time task updates

### User Interface

- Modern, responsive design
- Dark/Light mode toggle
- Sidebar navigation for collections
- User account management
- Clean and intuitive task management interface

### Authentication

- User registration and login
- Secure authentication system
- Protected routes
- User-specific collections and tasks

## Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: MUI Theme + Emotion
- **Authentication**: JWT-based authentication
- **Date Handling**: Day.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

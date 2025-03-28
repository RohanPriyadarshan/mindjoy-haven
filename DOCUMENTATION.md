
# Solace AI - Mental Health App Documentation

## Overview
Solace AI is a mental health application designed to provide emotional support and mood tracking. The app includes features for tracking moods, chatting with an AI assistant, completing assessments, earning rewards, and more.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on Radix UI primitives
- **React Router**: Routing library for React
- **React Query**: Data fetching and state management library
- **Recharts**: Charting library for visualizing data

### Backend
- **Supabase**: Backend-as-a-Service platform providing:
  - Authentication
  - PostgreSQL database
  - Edge Functions for serverless computing
  - Realtime subscriptions

### APIs
- **OpenAI**: Used through Supabase Edge Functions for AI chat responses

## Key Features

1. **User Authentication**
   - Registration and login
   - Profile management

2. **Mood Tracking**
   - Daily mood logging
   - Mood history visualization
   - Streak tracking

3. **AI Chat Assistant**
   - Conversational support
   - Context-aware responses
   - Feedback collection

4. **Self-Assessment**
   - Mental health questionnaires
   - Results analysis
   - Progress tracking

5. **Rewards System**
   - Points for consistent app usage
   - Virtual rewards store
   - Achievement tracking

## Application Workflow

```
┌─────────────────┐         ┌───────────────┐         ┌─────────────────┐
│                 │         │               │         │                 │
│  Registration   │────────▶│  User Login   │────────▶│  Home Dashboard │
│                 │         │               │         │                 │
└─────────────────┘         └───────────────┘         └────────┬────────┘
                                                               │
                                                               │
                                                               ▼
┌─────────────────┐         ┌───────────────┐         ┌─────────────────┐
│                 │         │               │         │                 │
│  Achievements   │◀───────▶│  Store/Rewards│◀───────▶│  Profile        │
│                 │         │               │         │                 │
└─────────────────┘         └───────────────┘         └─────────────────┘
       ▲                            ▲                          ▲
       │                            │                          │
       │                            │                          │
       │                            │                          │
┌──────┴────────┐         ┌────────┴──────┐         ┌─────────┴─────┐
│               │         │               │         │               │
│  Assessment   │         │  Mood Tracker │         │  AI Chat      │
│               │         │               │         │               │
└───────────────┘         └───────────────┘         └───────────────┘
```

## ChatBot Workflow

```
┌─────────────────┐      ┌───────────────────┐      ┌─────────────────┐
│                 │      │                   │      │                 │
│  User Input     │─────▶│  Message Sent     │─────▶│  Save to DB     │
│                 │      │                   │      │                 │
└─────────────────┘      └───────────────────┘      └────────┬────────┘
                                                              │
                                                              │
                                                              ▼
┌─────────────────┐      ┌───────────────────┐      ┌─────────────────┐
│                 │      │                   │      │                 │
│  Display        │◀─────│  Save Bot Response│◀─────│  Get AI Response│
│  Response       │      │  to DB            │      │  (Edge Function)│
│                 │      │                   │      │                 │
└─────────────────┘      └───────────────────┘      └─────────────────┘
       │
       │
       ▼
┌─────────────────┐
│                 │
│  Optional       │
│  Feedback Form  │
│                 │
└─────────────────┘
```

## ChatBot Algorithm

The chatbot uses a multi-step algorithm to process and respond to user messages:

1. **Input Processing**
   - User messages are captured through the chat interface
   - Messages are stored in the database if the user is logged in
   - Real-time feedback is shown with a typing indicator

2. **Context Management**
   - The system maintains context of the conversation
   - Last 5 messages are used to provide continuity

3. **Response Generation**
   - The user message and conversation context are sent to a Supabase Edge Function
   - The Edge Function calls OpenAI's API (using gpt-4o-mini model)
   - A system prompt ensures responses are focused on mental health support
   - Temperature parameter (0.7) ensures a balance of consistency and creativity

4. **Response Handling**
   - The AI response is received and displayed to the user
   - The response is stored in the database if the user is logged in
   - Error handling provides fallback responses if the AI service is unavailable

5. **User Engagement**
   - After every 3rd bot message, a feedback form is shown to logged-in users
   - User feedback is collected to improve the system

6. **Local Fallback Mechanism**
   - If the AI service is unavailable, a local utility (`getAdvancedResponse`) provides pattern-matched responses
   - Responses are categorized by emotional patterns (e.g., sad, anxious, happy)

The chatbot is designed to be supportive, empathetic, and provide general wellness advice without attempting to diagnose medical conditions.

## Database Schema

The app uses several Supabase tables:

1. **profiles** - User profile information
2. **user_stats** - Tracks user streaks, points, and activity
3. **mood_entries** - Records user mood data
4. **chat_messages** - Stores conversation history
5. **store_items** - Available rewards in the store
6. **user_purchases** - Records of items users have purchased

## Authentication Flow

The app uses Supabase Authentication with email/password:

1. User registers with email, password, and name
2. On registration, database triggers create profile and stats records
3. Login validates credentials and provides JWT token
4. AuthGuard component protects routes requiring authentication
5. User session is maintained via Supabase session handling

## Points and Rewards System

Users earn points through:
1. Daily mood logging (15 points per day)
2. Consecutive day streaks (bonus points based on streak length)
3. Multiple entries in one day (5 points per additional entry)

Points can be spent in the rewards store on virtual items.


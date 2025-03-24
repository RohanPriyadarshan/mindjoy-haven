
import React from 'react';
import { AssessmentType } from './types';

export const assessmentTypes: AssessmentType[] = [
  {
    id: 'anxiety',
    title: 'Anxiety Assessment',
    description: 'Evaluate symptoms of anxiety with this clinically-informed assessment',
    icon: <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    questions: [
      {
        id: 1,
        text: 'How often do you feel restless or on edge?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 2,
        text: 'How often do you have trouble relaxing?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 3,
        text: 'How often do you worry too much about different things?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 4,
        text: 'How often do you have trouble concentrating?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 5,
        text: 'How often do you feel afraid something awful might happen?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
    ],
  },
  {
    id: 'mood',
    title: 'Mood Assessment',
    description: 'Evaluate symptoms of depression with this clinically-informed assessment',
    icon: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
    questions: [
      {
        id: 1,
        text: 'How often do you feel little interest or pleasure in doing things?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 2,
        text: 'How often do you feel down, depressed, or hopeless?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 3,
        text: 'How often do you have trouble falling or staying asleep, or sleeping too much?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 4,
        text: 'How often do you feel tired or have little energy?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
      {
        id: 5,
        text: 'How often do you have poor appetite or overeating?',
        options: [
          { text: 'Not at all', value: 0 },
          { text: 'Several days', value: 1 },
          { text: 'More than half the days', value: 2 },
          { text: 'Nearly every day', value: 3 },
        ]
      },
    ],
  },
  {
    id: 'wellbeing',
    title: 'Well-being Check',
    description: 'Assess your overall psychological well-being',
    icon: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    questions: [
      {
        id: 1,
        text: "I've been feeling optimistic about the future",
        options: [
          { text: 'None of the time', value: 0 },
          { text: 'Rarely', value: 1 },
          { text: 'Some of the time', value: 2 },
          { text: 'Often', value: 3 },
          { text: 'All of the time', value: 4 },
        ]
      },
      {
        id: 2,
        text: "I've been feeling useful",
        options: [
          { text: 'None of the time', value: 0 },
          { text: 'Rarely', value: 1 },
          { text: 'Some of the time', value: 2 },
          { text: 'Often', value: 3 },
          { text: 'All of the time', value: 4 },
        ]
      },
      {
        id: 3,
        text: "I've been feeling relaxed",
        options: [
          { text: 'None of the time', value: 0 },
          { text: 'Rarely', value: 1 },
          { text: 'Some of the time', value: 2 },
          { text: 'Often', value: 3 },
          { text: 'All of the time', value: 4 },
        ]
      },
      {
        id: 4,
        text: "I've been dealing with problems well",
        options: [
          { text: 'None of the time', value: 0 },
          { text: 'Rarely', value: 1 },
          { text: 'Some of the time', value: 2 },
          { text: 'Often', value: 3 },
          { text: 'All of the time', value: 4 },
        ]
      },
      {
        id: 5,
        text: "I've been thinking clearly",
        options: [
          { text: 'None of the time', value: 0 },
          { text: 'Rarely', value: 1 },
          { text: 'Some of the time', value: 2 },
          { text: 'Often', value: 3 },
          { text: 'All of the time', value: 4 },
        ]
      },
    ],
  },
];

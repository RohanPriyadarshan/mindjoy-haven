
import React from 'react';
import Layout from '@/components/Layout';
import MoodTracker from '@/components/MoodTracker';

const Mood = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Mood Tracker</h1>
      <MoodTracker />
    </Layout>
  );
};

export default Mood;

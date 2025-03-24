
import React from 'react';
import Layout from '@/components/Layout';
import AchievementsComponent from '@/components/Achievements';

const Achievements = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <AchievementsComponent />
    </Layout>
  );
};

export default Achievements;

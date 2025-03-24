
import React from 'react';
import Layout from '@/components/Layout';
import SelfAssessment from '@/components/SelfAssessment';

const Assessment = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Self-Assessment</h1>
      <SelfAssessment />
    </Layout>
  );
};

export default Assessment;

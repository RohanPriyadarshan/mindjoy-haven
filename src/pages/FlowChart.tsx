
import React from 'react';
import Layout from '@/components/Layout';
import ChatbotFlowchart from '@/components/ChatbotFlowchart';

const FlowChart = () => {
  return (
    <Layout className="p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Chatbot Interaction Flow</h1>
        <p className="text-muted-foreground mb-8">
          This flowchart illustrates the complete interaction cycle between users and our AI chatbot,
          from initial input to response generation and feedback collection.
        </p>
        <ChatbotFlowchart />
      </div>
    </Layout>
  );
};

export default FlowChart;

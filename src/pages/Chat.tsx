
import React from 'react';
import Layout from '@/components/Layout';
import ChatBot from '@/components/ChatBot';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Chat = () => {
  return (
    <Layout className="p-0 md:py-6">
      <div className="w-full mb-4 px-4">
        <Link to="/flowchart" className="inline-flex items-center text-sm text-primary hover:underline">
          <ExternalLink size={14} className="mr-1" />
          View Chatbot Interaction Flowchart
        </Link>
      </div>
      <ChatBot />
    </Layout>
  );
};

export default Chat;

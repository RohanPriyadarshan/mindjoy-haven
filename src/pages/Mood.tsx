
import React from 'react';
import Layout from '@/components/Layout';
import MoodTracker from '@/components/MoodTracker';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Mood = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
        <Link to="/store">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>Rewards Store</span>
          </Button>
        </Link>
      </div>
      <MoodTracker />
    </Layout>
  );
};

export default Mood;

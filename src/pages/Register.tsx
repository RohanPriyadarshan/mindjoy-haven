
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
    navigate('/login');
  };

  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="glass dark:glass-dark card-shadow rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Join Solace AI</h1>
            <p className="text-muted-foreground mt-2">Create your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

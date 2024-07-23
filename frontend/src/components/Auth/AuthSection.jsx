import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const AuthSection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (action) => {
    setError('');
    setMessage('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const endpoint = action === 'login' ? '/authenticate' : '/register';

    try {
      // This is a placeholder for the actual API call
      // Replace this with your actual API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(action === 'login' ? 'Login successful!' : 'Registration successful!');
        // Here you would typically save the user's token or update your app's auth state
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
      <Card className="p-2 border border-gray-300 shadow-md">
        <CardBody>
          <CardTitle tag="h2" className="text-xl font-bold mb-4">
            Authentication
          </CardTitle>
          <div className="mb-4">
            <p>Sign in or register to access the following features:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Track your game scores</li>
              <li>More controls to customize your game</li>
              <li>See how you rank up with archers around the world!</li>
            </ul>
          </div>
          {error && <Alert color="danger">{error}</Alert>}
          {message && <Alert color="success">{message}</Alert>}
          <Form>
            <FormGroup className="mb-4">
              <Label for="username" className="text-white">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </FormGroup>
            <FormGroup className="mb-6">
              <Label for="password" className="text-white">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </FormGroup>
            <div className="flex justify-between mt-6">
              <Button color="primary" onClick={() => handleSubmit('login')} className="w-[48%]">
                Login
              </Button>
              <Button color="secondary" onClick={() => handleSubmit('register')} className="w-[48%]">
                Register
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
  );
};

export default AuthSection;
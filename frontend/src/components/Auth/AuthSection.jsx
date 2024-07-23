import  { React, useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import Cookies from 'js-cookie';

const AuthSection = ({ loggedInUser, setLoggedInUser }) => {
  //Managed state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Hook to handle auth requests
  const { error, message, handleAuth } = useAuth();



  //Effect to update the logged in user
  useEffect(() => {
    const username = Cookies.get('username');
    if(username) {
        setLoggedInUser(username);
    }else {
        setLoggedInUser(null);
    }
      
  }, [message]);


  const handleSubmit = async (action) => {
    handleAuth(username, password, action);
  };

  return (
      <Card className="p-2 border border-gray-300 shadow-md">
        <CardBody>
          {loggedInUser ? (
            <div>
            <CardTitle tag="h2" className="text-xl font-bold mb-4">
              Archer: {loggedInUser}
            </CardTitle>
            <CardBody>
              <p>Currently has 0 games</p>
              <p>Average score: 0</p>
            </CardBody>
            <Button onClick={() => handleSubmit('logout')} className="py-2 px-3 bg-slate-500 text-white rounded-sm w-full">Logout</Button>
            </div>
          ) : (
          <>
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
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
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
                className="mt-1 block w-full rounded-md"
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
                className="mt-1 block w-full rounded-md"
              />
            </FormGroup>
            <div className="flex justify-between mt-6">
              <Button onClick={() => handleSubmit('login')} className="py-2 px-3 bg-slate-500 text-white rounded-sm w-[48%]">
                Login
              </Button>
              <Button onClick={() => handleSubmit('register')} className="py-2 px-3 bg-slate-500 text-white rounded-sm w-[48%]">
                Register
              </Button>
            </div>
          </Form>
          </> 
        )}
        </CardBody>
      </Card>
  );
};

export default AuthSection;
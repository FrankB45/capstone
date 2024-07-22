import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

const About = () => {
  return (
    <Card className="p-2 border border-gray-300 shadow-md">
      <CardBody>
        <CardTitle tag="h2" className="text-xl font-bold mb-4">
          About Arch Shot
        </CardTitle>
        <div className="mb-4">
          <p>Arch Shot is a web app based on the popular desktop app (archeryclock.com) providing additional features for logged in users.</p>
        </div>
        <p className="mb-4">
          Created by Frank Baiata
        </p>
        <p className="mb-6">
          Check me out on GitHub!
        </p>
        <div className="flex justify-center">
        <a href="https://github.com/FrankB45" target="_blank" rel="noopener noreferrer">
          <Button color="primary" className="w-full">
            GitHub
          </Button>
        </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default About;
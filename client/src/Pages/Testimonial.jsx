import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonial = ({ name, graduation, quote }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <blockquote className="text-gray-600 italic mb-4">"{quote}"</blockquote>
        <div className="font-bold">{name}</div>
        <div className="text-sm text-gray-500">{graduation}</div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;

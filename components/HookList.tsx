import React from 'react';
import { HookCard } from './HookCard';

interface HookListProps {
  hooks: string[];
}

export const HookList: React.FC<HookListProps> = ({ hooks }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {hooks.map((hook, index) => (
        <HookCard key={index} text={hook} index={index} />
      ))}
    </div>
  );
};
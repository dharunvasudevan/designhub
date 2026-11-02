import React from 'react';
import {
  LayoutGrid,
  PenTool,
  Sparkles,
  Paintbrush,
  GitFork,
  AppWindow,
  Box,
  Layers,
} from 'lucide-react';

interface DisciplineIconProps {
  name: string;
  className?: string;
}

export const DisciplineIcon: React.FC<DisciplineIconProps> = ({ name, className = 'w-5 h-5 text-slate-700' }) => {
  switch (name) {
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'PenTool':
      return <PenTool className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Brush':
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'GitFork':
      return <GitFork className={className} />;
    case 'AppWindow':
      return <AppWindow className={className} />;
    case 'Box':
      return <Box className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    default:
      return <LayoutGrid className={className} />;
  }
};

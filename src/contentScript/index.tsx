import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { CommandPalette } from '../popup/components/CommandPalette';
import '../popup/index.css';

const ContentApp: React.FC = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpened(true);
      } else if (e.key === 'Escape') {
        setOpened(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <MantineProvider withGlobalStyles={false} withNormalizeCSS={true}>
      <CommandPalette opened={opened} onClose={() => setOpened(false)} />
    </MantineProvider>
  );
};

const container = document.createElement('div');
container.id = 'altkbar-root';
document.documentElement.appendChild(container);
ReactDOM.createRoot(container).render(<ContentApp />);


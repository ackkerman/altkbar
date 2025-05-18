import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { CommandPalette } from '../popup/components/CommandPalette';
import '../popup/index.css';

const containerId = 'moskeyto-command-palette-container';
let container = document.getElementById(containerId);
if (!container) {
  container = document.createElement('div');
  container.id = containerId;
  container.style.zIndex = '2147483647';
  document.body.appendChild(container);
}
const root = ReactDOM.createRoot(container!);

const App = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'k') {
        setOpened(true);
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setOpened(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <MantineProvider withGlobalStyles={false} withNormalizeCSS={true}>
      <CommandPalette opened={opened} onClose={() => setOpened(false)} />
    </MantineProvider>
  );
};

root.render(<App />);


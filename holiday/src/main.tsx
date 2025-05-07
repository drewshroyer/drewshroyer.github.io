
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Primary Tailwind directives
import './styles/globals.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/theme.css'

createRoot(document.getElementById("root")!).render(<App />);

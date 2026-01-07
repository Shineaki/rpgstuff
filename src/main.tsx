import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import { Notes } from "@/routes/shadowdark/notes.tsx";
import { CharacterGenerator } from "@/routes/shadowdark/character-generator.tsx";
import MyNavBar from "@/MyNavBar"
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <div className='flex flex-col items-center'>
        <MyNavBar />
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shadowdark" element={<Notes />} />
        <Route path="/shadowdark/notes" element={<Notes />} />
        <Route path="/shadowdark/character-generator" element={<CharacterGenerator />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

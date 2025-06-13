import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-dark-primary dark:to-dark-secondary transition-colors duration-300">
        <ThemeToggle />
        <Navbar isHomePage={true} />
        <main>
          <Home />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 
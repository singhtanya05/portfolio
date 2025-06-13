import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import VisitCounter from './components/VisitCounter';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-dark-primary dark:to-dark-secondary transition-colors duration-300">
        <ThemeToggle />
        <Navbar isHomePage={true} />
        <main className="relative">
          <Home />
          <VisitCounter />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 
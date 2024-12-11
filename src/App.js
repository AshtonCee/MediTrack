import './App.css';
import ChoosePlatform from './components/choose-platform.jsx';
import { PlatformProvider } from './components/platformContext';
import GameSearch from './components/search';
import PopulateAchievements from './components/populate-achievements.jsx';

function App() {
  return (
    <div className="App">
      <h1>Achievement Tracker</h1>
      <PlatformProvider>
        <ChoosePlatform />
        <GameSearch />
      </PlatformProvider>
      <h2>List of achievements</h2>
      <PopulateAchievements />
    </div>
  );
}

export default App;
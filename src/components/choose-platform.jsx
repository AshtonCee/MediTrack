import { useContext } from 'react';
import { PlatformContext } from './platformContext';

// used to select the platform of the game
function ChoosePlatform() {
    const { selectedPlatform, setSelectedPlatform } = useContext(PlatformContext);
  
    const handlePlatformChange = (event) => {
      setSelectedPlatform(event.target.value);
    };
    
    return (
        <div>
        <select value={selectedPlatform} onChange={handlePlatformChange}>
          <option>Select a platform</option>
          <option value="steam">Steam</option>
          <option value="xbox">Xbox</option>
          <option value="playstation">Playstation</option>
          <option value="nintendo">Nintendo</option>
        </select>
      </div>
    );
}
export default ChoosePlatform;
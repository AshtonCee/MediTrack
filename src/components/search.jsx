import { useState, useContext } from 'react';
import { PlatformContext } from './platformContext';
import PopulateAchievements from './populate-achievements';

// Search for the inputted game
function GameSearch() {
    const [searchGame, setSearchGame] = useState('');
    const [url, setUrl] = useState(''); // State for storing the generated URL
    const { selectedPlatform } = useContext(PlatformContext);

    const handleSearch = (event) => {
        setSearchGame(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Replace white space with correct characters for the generated URL
        const searchGameWithHyphens = searchGame.replace(/\s/g, "-");
        const searchGameWithUnderscores = searchGame.replace(/\s/g, "_");
        let generatedUrl;

        if (selectedPlatform === 'steam') {
            generatedUrl = `https://truesteamachievements.com/game/${searchGameWithHyphens}/achievements`;
        } else if (selectedPlatform === 'xbox') {
            generatedUrl = `https://www.trueachievements.com/game/${searchGameWithHyphens}/achievements`;
        } else if (selectedPlatform === 'playstation') {
            generatedUrl = `https://www.truetrophies.com/game/${searchGameWithHyphens}/trophies`;
        } else if (selectedPlatform === 'nintendo') {
            generatedUrl = `https://nintendo.fandom.com/wiki/${searchGameWithUnderscores}`;
        }

        console.log('Searching for:', searchGameWithHyphens);
        setUrl(generatedUrl); // Store the generated URL in state
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchGame} onChange={handleSearch} placeholder='Enter game'/>
                <button type="submit">Search</button>
            </form>
            {url && (
                <PopulateAchievements // Make URL usable in other components
                    url={url}
                />
            )}
        </div>
    );
}

export default GameSearch;

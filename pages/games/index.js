import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then(setGames);
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <article className="games">
      <Button className="mt-3" onClick={() => router.push('/games/new')}>
        Register new game
      </Button>
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} id={game.id} onUpdate={getAllGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;

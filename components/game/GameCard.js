import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  id,
  onUpdate,
}) => {
  const router = useRouter();
  const deleteThisGame = () => {
    if (window.confirm('Delete game?')) {
      deleteGame(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Card.Text>
          <Button variant="success" onClick={() => router.push(`/games/edit/${id}`)}>Edit</Button>
          <Button variant="danger" onClick={deleteThisGame}>Delete</Button>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;

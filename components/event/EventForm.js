import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  gameId: '',
  description: '',
  date: '',
  time: '',
};

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: Number(currentEvent.gameId),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="gameId"
            value={currentEvent.gameId}
            onChange={handleChange}
            required
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >{game.title}
              </option>
            ))}
          </Form.Select>

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '75px' }}
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
            required
          />

          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
            required
          />

          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;

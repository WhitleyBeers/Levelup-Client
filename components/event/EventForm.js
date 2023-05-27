import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  gameId: '',
  description: '',
  date: '',
  time: '',
  id: null,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.id) {
      setCurrentEvent({
        gameId: obj.game.id,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        id: obj.id,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.id) {
      const eventUpdate = {
        game: Number(currentEvent.gameId),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
        id: obj.id,
      };
      updateEvent(eventUpdate).then(router.push('/events'));
    } else {
      const event = {
        game: Number(currentEvent.gameId),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };
      createEvent(event).then(() => router.push('/events'));
    }
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
  obj: PropTypes.shape({
    gameId: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

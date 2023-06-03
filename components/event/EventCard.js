import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  game,
  description,
  date,
  time,
  id,
  onUpdate,
  joined,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const deleteThisEvent = () => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const join = () => {
    joinEvent(id, user.uid).then(() => onUpdate());
  };

  const leave = () => {
    leaveEvent(id, user.uid).then(() => onUpdate());
  };

  return (
    <Card className="text-center">
      <Card.Header>
        <Card.Title>
          Event for {game.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <Button variant="success" onClick={() => router.push(`/events/edit/${id}`)}>Edit</Button>
          <Button variant="danger" onClick={deleteThisEvent}>Delete</Button>
          {joined ? <Button variant="warning" onClick={leave}>Leave Event</Button> : <Button variant="primary" onClick={join}>Join Event</Button>}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{date} at {time}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;

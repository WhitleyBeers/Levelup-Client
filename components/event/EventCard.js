import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  game,
  description,
  date,
  time,
  id,
  onUpdate,
}) => {
  const router = useRouter();
  const deleteThisEvent = () => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
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
};

export default EventCard;

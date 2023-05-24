import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  game,
  description,
  date,
  time,
}) => (
  <Card className="text-center">
    <Card.Header>
      <Card.Title>
        Event for {game.title}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer>{date} at {time}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <article className="events">
      <Button className="mt-3" onClick={() => router.push('/events/new')}>
        Register new event
      </Button>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game} description={event.description} date={event.date} time={event.time} id={event.id} onUpdate={getAllEvents} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default Home;

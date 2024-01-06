import React from 'react';
import { useTournaments } from '../store/tournaments';
import CardTournament from './CardTournament';

const ListTournaments: React.FC = () => {

    const tournaments = useTournaments((state) => state.tournaments);


  return (
    <ul>
        {
            tournaments.map((t) => <CardTournament key={t.id} tournament={t}/>)
        }
    </ul>
  );
};

export default ListTournaments
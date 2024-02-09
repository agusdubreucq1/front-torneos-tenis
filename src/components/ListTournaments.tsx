import React, { useEffect } from 'react';
import { useTournaments } from '../store/tournaments';
import CardTournament from './CardTournament';
import styles from '../styles/listTournaments.module.css'
import { Tournament } from '../vite-env';
import Search from 'antd/es/input/Search';
import { ConfigProvider, Result, Select, Spin } from 'antd';
import { ESTADOS_TORNEOS } from '../constantes';

type Filters = {
  name: string
  state: string
}

interface Props {
  tournaments: Tournament[],
  loading?: boolean,
  error?: string | null
}

const ListTournaments: React.FC<Props> = ({ tournaments, loading = false, error = null}) => {

  // const [tournaments, error, loading] = useTournaments((state) => [state.tournaments, state.error, state.loading]);
  const [filteredTournaments, setFilteredTournaments] = React.useState<Tournament[]>(tournaments);
  const [filters, setFilters] = React.useState<Filters>({
    name: '',
    state: ''
  })

  useEffect(() => {
    let newTournaments = tournaments;
    newTournaments = newTournaments.filter((t) => {
      if (filters.name !== '') {
        return t.nombre.toLowerCase().includes(filters.name.toLowerCase());
      } else {
        return true;
      }
    })
    newTournaments = newTournaments.filter((t) => {
      if (filters.state !== '') {
        return t.estado === filters.state;
      } else {
        return true;
      }
    })
    setFilteredTournaments(newTournaments);
  }, [tournaments, filters])

  const handleSearch = (value: string) => {
    setFilters({ ...filters, name: value })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value })
  }


  return (
    <>
      <div className={styles.container_filters}>
        <div className={styles.filters}>
        <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#1677ff',
                            fontSizeLG: 16
                        },
                    }}
                >
          <Search value={filters.name} enterButton placeholder="Nombre" allowClear onSearch={handleSearch} onChange={handleChange}  />
          <Select value={filters.state} placeholder="Estado" onChange={(value) => setFilters({ ...filters, state: value })}  
            options={[
              { value: ESTADOS_TORNEOS.EN_CURSO, label: 'Disponible' },
              { value: ESTADOS_TORNEOS.FINALIZADO, label: 'Finalizado' },
              { value: ESTADOS_TORNEOS.SUSPENDIDO, label: 'Suspendido' },
              { value: '', label: 'Todos'},
            ]} />
            </ConfigProvider>
        </div>
      </div>

      <div className={styles.container}>
        {
          error
            ? <Result status="error" title="Error" subTitle={error} />
            : 
            (loading 
              ? <Spin></Spin>
              : <ul className={styles.ul}>{filteredTournaments.map((t) => <CardTournament key={t.id} tournament={t} />)}</ul>
            )
        }
      </div>
    </>
  );
};

export default ListTournaments
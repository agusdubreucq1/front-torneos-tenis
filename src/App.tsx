import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Index from './pages'
import { useEffect } from 'react'
import { useTournaments } from './store/tournaments'
import { useUser } from './store/user'
import Header from './components/Header'
import Login from './pages/Login'
import CreateTournament from './pages/createTournament'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Tournament from './pages/tournament'
import Jugadores from './pages/Jugadores'
import CreateJugador from './pages/createJugador'
import Jugador from './pages/jugador'

function App() {

  const getTournaments = useTournaments((state) => state.getTournaments)
  const [getUser, getToken] = useUser((state) => [state.getUser, state.getToken])

  useEffect(() => {
    getTournaments()
    getUser()
    getToken()
  }, [])

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Index />} ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/jugadores' element={<Jugadores />}></Route>
        <Route path='/jugador/:id' element={<Jugador />}></Route>
        <Route path='/create/jugador' element={<CreateJugador />}></Route>
        <Route path='/tournament/:id' element={<Tournament />}></Route>
        <Route element={<ProtectedRoute canNavigate={true} />}>
          <Route path='/create/tournament' element={<CreateTournament></CreateTournament>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

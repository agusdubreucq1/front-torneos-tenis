import React from "react"
import styles_draw from "../styles/drawTournament.module.css"
import { Match } from "../vite-env"

import styles from '../styles/cardMatch.module.css'

import tick from '/icons/tick.svg'


const CardMatch: React.FC<{ p: Match }> = ({ p }) => {
    return (
        <div className={styles_draw.container_match}>
            <div key={p.id} className={styles.match}>
                <div className={styles.jugadores}>
                    <div className={styles.jugador}>
                        <p>{p.Pareja1.user.apellido + '.' + p.Pareja1.user.nombre.slice(0, 1).toUpperCase()}</p>
                        {p.ganador == 1 && <img src={tick}></img>}
                    </div>
                    <div className={styles.jugador}>
                        <p>{p.Pareja2.user.apellido + '.' + p.Pareja2.user.nombre.slice(0, 1).toUpperCase()}</p>
                        {p.ganador == 2 && <img src={tick}></img>}
                    </div>
                </div>
                <div className={styles.resultado}>
                    <p>{p.resultado ? p.resultado : '-'}</p>
                </div>
            </div>
        </div>
    )
}

export default CardMatch
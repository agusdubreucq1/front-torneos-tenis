import React from "react"
import styles from "../styles/drawTournament.module.css"
import { Partido } from "../vite-env"


const CardPartido: React.FC<{ p: Partido }> = ({ p }) => {
    return (
        <div className={styles.container_partido}>
            <div key={p.id} className={styles.partido}>
                <div className={styles.jugadores}>
                    <p>{p.Pareja1.user.apellido + '.' + p.Pareja1.user.nombre.slice(0, 1).toUpperCase()}</p>
                    <p>{p.Pareja2.user.apellido + '.' + p.Pareja2.user.nombre.slice(0, 1).toUpperCase()}</p>
                </div>
                <div className={styles.resultado}>
                    <p>{p.resultado}</p>
                </div>
            </div>
        </div>
    )
}

export default CardPartido
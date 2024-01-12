import React from "react"
import styles from "../styles/drawTournament.module.css"

const CardPartidoVacio: React.FC = () => {
    return (
        <div className={styles.container_partido}>
            <div className={styles.partido}>
                <div className={styles.jugadores}>
                    <p>-</p>
                    <p>-</p>
                </div>
                <div className={styles.resultado}>
                    <p>-</p>
                </div>
            </div>
        </div>

    )
}

export default CardPartidoVacio


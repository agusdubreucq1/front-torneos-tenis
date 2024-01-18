import React from "react"
import styles from "../styles/drawTournament.module.css"

interface Props {
    children?: React.ReactNode,

}
const CardPartidoVacio: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.container_partido}>

            <div className={styles.partido}>
                {children ? children :
                    <>
                        <div className={styles.jugadores}>
                            <p>-</p>
                            <p>-</p>
                        </div>
                        <div className={styles.resultado}>
                            <p>-</p>
                        </div>
                    </>
                }
            </div>
        </div>

    )
}

export default CardPartidoVacio


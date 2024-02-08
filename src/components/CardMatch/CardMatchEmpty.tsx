import React from "react"
import styles_draw from "../../styles/drawTournament.module.css"
import styles from '../../styles/cardMatch.module.css'
import useCreateMatch from "../../hooks/useCreateMatch"

interface Props {
    idTorneo: string | number,
    jugadoresXRonda: number,
    orden: number,
    isAdmin?: boolean
}
const CardMatchEmpty: React.FC<Props> = ({ idTorneo, jugadoresXRonda, orden, isAdmin }) => {

    const { contextHolder, modal, handleOpenModal, setAdditionalValues } = useCreateMatch(String(idTorneo))

    return (
        <>
            {contextHolder}
            {modal}
            <div className={styles_draw.container_match}>
                <div className={styles.match}>
                    {
                        isAdmin
                            ? <button className={styles.button} onClick={
                                () => {
                                    setAdditionalValues({ orden: orden, jugadoresXRonda: jugadoresXRonda })
                                    handleOpenModal();
                                }
                            } >+ Partido</button>
                            : <>
                                <div className={styles.jugadores}>
                                    <div className={styles.jugador}>
                                        <p>-</p>
                                    </div>
                                    <div className={styles.jugador}>
                                        <p >-</p>
                                    </div>
                                </div>
                                <div className={styles.resultado}>
                                    <p>-</p>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default CardMatchEmpty


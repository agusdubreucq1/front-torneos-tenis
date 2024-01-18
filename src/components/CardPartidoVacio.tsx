import React from "react"
import styles from "../styles/drawTournament.module.css"
import useModalCreatePartido from "../hooks/useModalCreatePartido"

interface Props {
    idTorneo: string | number,
    jugadoresXRonda: number,
    orden: number,
    isAdmin?: boolean
}
const CardPartidoVacio: React.FC<Props> = ({ idTorneo, jugadoresXRonda, orden, isAdmin }) => {

    const { handleOpenModal, modal, contextHolder } = useModalCreatePartido({ id: idTorneo })

    return (
        <>
            {contextHolder}
            {modal}
            <div className={styles.container_partido}>
                <div className={styles.partido}>
                    {
                        isAdmin
                            ? <button onClick={() => handleOpenModal({ orden, jugadoresXRonda })} >+ Partido</button>
                            : <>
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
        </>
    )
}

export default CardPartidoVacio


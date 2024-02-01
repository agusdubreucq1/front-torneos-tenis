import React from "react"
import styles_draw from "../styles/drawTournament.module.css"
import { Match } from "../vite-env"

import styles from '../styles/cardMatch.module.css'

import tick from '/icons/tick.svg'
import { message } from "antd"
import { useUser } from "../store/user"
import { useMatches } from "../store/matches"
import useModalMatch from "../hooks/useModalMatch"
import { updateMatch } from "../services/partido"



const CardMatch: React.FC<{ p: Match }> = ({ p }) => {
    const [messageAPI, contextHolder] = message.useMessage();
    const token = useUser((state) => state.token);
    const getMatches = useMatches((state) => state.getMatches);
    const match = p


    const handleOk = async () => {
        setError(null);
        try {
            const values = await form.validateFields();
            setLoading(true);
            form.resetFields();
            const body = { ...p, ...values };
            await updateMatch(String(match?.id), body, token!);
            messageAPI.success('Partido modificado con exito');
            getMatches(p.torneoId);
            handleCloseModal();
        } catch (error) {
            setError('Error al modificar el partido');
            console.log('Validate Failed:', error);
        } finally {
            setLoading(false);
        }
    };



    const { modal, form, handleOpenModal, setLoading, setError, handleCloseModal } = useModalMatch(handleOk, p);

    return (
        <>
            {contextHolder}
            {modal}
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
                    
                    <div className={styles.edit}>
                        <button className={styles.button} onClick={() => { handleOpenModal() }}>Editar</button>
                        <button className={styles.button}>Eliminar</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CardMatch
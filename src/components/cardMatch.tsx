import React from "react"
import styles_draw from "../styles/drawTournament.module.css"
import { Match } from "../vite-env"

import styles from '../styles/cardMatch.module.css'

import tick from '/icons/tick.svg'
import { Modal, message } from "antd"
import { useUser } from "../store/user"
import { useMatches } from "../store/matches"
import useModalMatch from "../hooks/useModalMatch"
import { deleteMatch, updateMatch } from "../services/partido"
import IconEdit from "./IconEdit"
import IconDelete from "./IconDelete"



const CardMatch: React.FC<{ match: Match }> = ({ match }) => {
    const [messageAPI, contextHolder] = message.useMessage();
    const token = useUser((state) => state.token);
    const getMatches = useMatches((state) => state.getMatches);

    const [openModalDelete, setOpenModalDelete] = React.useState(false);


    const handleOk = async () => {
        setError(null);
        try {
            const values = await form.validateFields();
            setLoading(true);
            form.resetFields();
            const body = { ...match, ...values };
            await updateMatch(String(match?.id), body, token!);
            messageAPI.success('Partido modificado con exito');
            getMatches(match.torneoId);
            handleCloseModal();
        } catch (error) {
            setError('Error al modificar el partido');
            console.log('Validate Failed:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async () => {
        try {
            await deleteMatch(match.id, token!);
            messageAPI.success('Partido eliminado con exito');
            getMatches(match.torneoId);
        }
        catch (error) {
            messageAPI.error('Error al eliminar el partido');
        }
    }

    const handleOpenModalDelete = () => {
        setOpenModalDelete(true);
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    }

    



    const { modal, form, handleOpenModal, setLoading, setError, handleCloseModal } = useModalMatch(handleOk, match);

    return (
        <>
            {contextHolder}
            {modal}
            <Modal title="Eliminar partido" open={openModalDelete} okText="Confirmar" onOk={handleDelete} onCancel={handleCloseModalDelete}>
                <p>¿Desea eliminar el partido?</p>
            </Modal>
            <div className={styles_draw.container_match}>
                <div key={match?.id} className={styles.match}>
                    <div className={styles.jugadores}>
                        <div className={styles.jugador}>
                            <p>{match?.Pareja1.user.apellido + '.' + match?.Pareja1.user.nombre.slice(0, 1).toUpperCase()}</p>
                            {match?.ganador == 1 && <img src={tick}></img>}
                        </div>
                        <div className={styles.jugador}>
                            <p>{match?.Pareja2.user.apellido + '.' + match?.Pareja2.user.nombre.slice(0, 1).toUpperCase()}</p>
                            {match?.ganador == 2 && <img src={tick}></img>}
                        </div>
                    </div>
                    <div className={styles.resultado}>
                        <p>{match?.resultado ? match?.resultado : '-'}</p>
                    </div>

                    <div className={styles.edit}>
                        <button className={styles.button} onClick={() => { handleOpenModal() }}><IconEdit/></button>
                        <button className={styles.button} onClick={handleOpenModalDelete}><IconDelete /></button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CardMatch
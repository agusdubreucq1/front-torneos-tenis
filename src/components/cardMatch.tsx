import React from "react"
import styles_draw from "../styles/drawTournament.module.css"
import { Match } from "../vite-env"

import styles from '../styles/cardMatch.module.css'

// import tick from '/icons/tick.svg'
import { Modal, message } from "antd"
import { useUser } from "../store/user"
import { useMatches } from "../store/matches"
import useModalMatch from "../hooks/useModalMatch"
import { deleteMatch, updateMatch } from "../services/partido"
import IconEdit from "./icons/IconEdit"
import IconDelete from "./icons/IconDelete"
import InfoMatch from "./InfoMatch"



const CardMatch: React.FC<{ match: Match, isAdmin?: boolean }> = ({ match, isAdmin = false }) => {
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

    console.log(isAdmin)
    return (
        <>
            {isAdmin && contextHolder}
            {isAdmin && modal}
            {isAdmin &&
                <Modal title="Eliminar partido" open={openModalDelete} okText="Confirmar" onOk={handleDelete} onCancel={handleCloseModalDelete}>
                    <p>¿Desea eliminar el partido?</p>
                </Modal>}
            <div className={styles_draw.container_match}>
                <div className={styles.card}>
                    <InfoMatch match={match} />
                    {isAdmin &&
                        <div className={styles.edit}>
                            <button className={styles.button} onClick={() => { handleOpenModal() }}><IconEdit /></button>
                            <button className={styles.button} onClick={handleOpenModalDelete}><IconDelete /></button>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default CardMatch
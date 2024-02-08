import React from 'react';
import { useUser } from '../store/user';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import { Modal, message } from 'antd';
import { autoDesinscrirse } from '../services/inscripciones';

interface Props{
    id: number | string,
    // fetchPlayers?: () => void
}

type Function = (props: Props) =>{
    modal: JSX.Element | null,
    handleOpenModal: () => void,
    contextHolder: JSX.Element
}
const useAutoDesinscribirse: Function = ({id}) => {
    const token = useUser((state) => state.token);
    const getJugadoresInscriptos = useJugadoresInscriptos((state) => state.getJugadoresInscriptos);
    const [openModal, setOpenModal] = React.useState(false);
    const [messageAPI, contextHolder] = message.useMessage();

    const inscribirse = async () => {
        try{
            await autoDesinscrirse(id ?? 0, token ?? 'token')
            setOpenModal(false)
            messageAPI.open({
                type: 'success',
                content: 'has eliminado la inscripcion',
                key: 'inscribirse',
            })
            getJugadoresInscriptos(id)
        } catch (error){
            console.log(error)
            messageAPI.error({
                type: 'error',
                content: 'Error al inscribirse',
                key: 'inscribirse',
            })
            setOpenModal(false)
        }
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

  const modal = (
      <Modal
        open={openModal}
        onOk={inscribirse}
        okText="desinscribirse"
        onCancel={() => setOpenModal(false)}>
            <p>¿Deseas desinscribirte?</p>
      </Modal>
  )

  return ({
    modal,
    handleOpenModal,
    contextHolder
  })
};

export default useAutoDesinscribirse
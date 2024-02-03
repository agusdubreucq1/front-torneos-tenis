import React from 'react';
import { autoInscribirse } from '../services/inscripciones';
import { useUser } from '../store/user';
import { Modal, message } from 'antd';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';

interface Props{
    id: number | string,
    // fetchPlayers?: () => void
}

type Function = (props: Props) =>{
    modal: JSX.Element | null,
    handleOpenModal: () => void,
    contextHolder: JSX.Element
}

const useAutoInscripcion: Function = ({id}) => {

    const token = useUser((state) => state.token);
    const getJugadoresInscriptos = useJugadoresInscriptos((state) => state.getJugadoresInscriptos);
    const [openModal, setOpenModal] = React.useState(false);
    const [messageAPI, contextHolder] = message.useMessage();

    console.log('token:',token)

    const inscribirse = async () => {
        try{
            await autoInscribirse(id ?? 0, token ?? 'token')
            setOpenModal(false)
            messageAPI.success('Inscripcion exitosa')
            getJugadoresInscriptos(id)
        } catch (error){
            console.log(error)
            messageAPI.error('Error al inscribirse')
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
        okText="Inscribirme"
        onCancel={() => setOpenModal(false)}>
            <p>¿Deseas inscribirte?</p>
      </Modal>
  )

  return ({
    modal,
    handleOpenModal,
    contextHolder
  })
};

export default useAutoInscripcion
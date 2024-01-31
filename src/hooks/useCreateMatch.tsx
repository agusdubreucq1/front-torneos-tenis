import React from 'react';
import useModalMatch from './useModalMatch';
import { createPartido } from '../services/partido';
import { useUser } from '../store/user';
import { useMatches } from '../store/matches';
import { message } from 'antd';

type UseCreateMatch = (id: string)=>{
    modal: JSX.Element | null,
    handleOpenModal: () => void,
    contextHolder: JSX.Element,
    setAdditionalValues: React.Dispatch<React.SetStateAction<any>>
}

type AdditionalValues = {
    orden: number,
    jugadoresXRonda: number
}

const useCreateMatch: UseCreateMatch = (id) => {

    const token = useUser((state) => state.token);
    const getMatches = useMatches((state) => state.getMatches);
    const [messageAPI, contextHolder] = message.useMessage();
    const [additionalValues, setAdditionalValues] = React.useState<AdditionalValues | null>(null);
    const handleOk = async () => {
        setError(null);
        try {
            const values = await form.validateFields();
            setLoading(true);
            form.resetFields();
            const body = { ...values, ...additionalValues };
            await createPartido(body, token!, id);
            messageAPI.success('Partido creado con exito');
            getMatches(id);
            handleCloseModal();
        } catch (error) {
            setError('Error al crear el partido');
            console.log('Validate Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const {modal, form, handleOpenModal, setLoading, setError, handleCloseModal} = useModalMatch(handleOk)

  return ({
    modal, handleOpenModal, contextHolder, setAdditionalValues
  })
};

export default useCreateMatch
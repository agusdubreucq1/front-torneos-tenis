import React from 'react';
import { updateMatch } from '../services/partido';
import useModalMatch from './useModalMatch';
import { message } from 'antd';
import { useUser } from '../store/user';
import { useMatches } from '../store/matches';


type UseUpdateMatch = (idTorneo: string) => {
    modal: JSX.Element | null,
    handleOpenModal: () => void,
    contextHolder: JSX.Element,
    setMatchId: React.Dispatch<React.SetStateAction<number | null | undefined>>,
}

const useUpdateMatch: UseUpdateMatch = (idTorneo) => {

    const [matchId, setMatchId] = React.useState<number | null>();
    const [messageAPI, contextHolder] = message.useMessage();
    const token = useUser((state) => state.token);
    const [getMatches, matches] = useMatches((state) =>[ state.getMatches, state.matches]);
    const match = matches.find((m) => m.id === matchId);


    const handleOk = async () => {
        setError(null);
        try {
            const values = await form.validateFields();
            setLoading(true);
            form.resetFields();
            const body = { ...match, ...values  };
            await updateMatch(String(match?.id), body, token!);
            messageAPI.success('Partido modificado con exito');
            getMatches(idTorneo);
            handleCloseModal();
        } catch (error) {
            setError('Error al modificar el partido');
            console.log('Validate Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const { modal, form, handleOpenModal, setLoading, setError, handleCloseModal } = useModalMatch(handleOk, match);

    return ({
        modal, handleOpenModal, contextHolder, setMatchId
    })
};

export default useUpdateMatch



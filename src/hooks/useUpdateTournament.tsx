
import React, { useEffect } from 'react';
import { useUser } from '../store/user';
import { updateTournament } from '../services/tournament';
import { Alert, Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { useTournaments } from '../store/tournaments';
import { useTournament } from './useTournament';
import dayjs from 'dayjs';

interface Props {
    id: string | number,
}

type Function = (props: Props) => {
    error: null | String,
    loading: boolean,
    handleSubmit: (body: any) => void,
    contextHolder: JSX.Element,
    modal: JSX.Element
    handleOpenModal: () => void
}

const useUpdateTournament: Function = ({ id }) => {
    const [token, getToken] = useUser((state) => [state.token, state.getToken])
    const [error, setError] = React.useState<null | String>(null);
    const [loading, setLoading] = React.useState(false);
    // message.config({ key: 'updateTournament' })
    const [messageAPI, contextHolder] = message.useMessage();
    const [openModal, setOpenModal] = React.useState(false);
    const [form] = Form.useForm();
    const getTournaments = useTournaments((state) => state.getTournaments);
    const {tournament} = useTournament({id})

    const handleOpenModal = () => {
        setOpenModal(true)
    }


    useEffect(() => {
        getToken();
    }, [])

    const handleSubmit = async (body: any) => {
        setError(null)
        try {
            await form.validateFields()
            const values = await form.getFieldsValue();
            setLoading(true)
            await updateTournament(id, values, token!)
            // messageAPI.success('Torneo editado con exito');
            messageAPI.open({
                type: 'success',
                content: 'Torneo editado con exito',
                key: 'updateTournament',
            })
            setOpenModal(false)
            getTournaments()
        }
        catch (e: any) {
            console.log(e)
            if (e.name === 'Error') {
                setError(e.message)
            } else {
                setError('Error de conexion')
            }
        } finally {
            setLoading(false)
        }
    }

    const modal = (
        <Modal
            style={{ width: 500, padding: 30, background: '#dfdfdf', borderRadius: 20 }}
            open={openModal}
            title="Editar Torneo"
            okText="Confirmar"
            onOk={handleSubmit}
            onCancel={() => setOpenModal(false)}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                layout="horizontal"
                autoComplete='off'
            >
                {error &&
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
                    </div>
                }

                <Form.Item
                    rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                    name={'nombre'}
                    initialValue={tournament?.nombre}
                    label="Nombre">
                    <Input name='nombre' ></Input>
                </Form.Item>

                <Form.Item
                    label="Descripción"
                    initialValue={tournament?.descripcion}
                    name={'descripcion'}>
                    <Input name='descripcion' ></Input>
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, message: 'Ingresa la fecha!' }]}
                    label="Fecha"
                    initialValue={tournament?.fecha && dayjs(tournament?.fecha, 'YYYY-MM-DD')}
                    name={'fecha'}>
                    <DatePicker name='fecha'></DatePicker>
                </Form.Item>

                <Form.Item
                    label="Lugar"
                    initialValue={tournament?.lugar}
                    name={'lugar'}>
                    <Input name='lugar' ></Input>
                </Form.Item>

                <Form.Item
                    rules={[{ required: true, message: 'Ingresa la categoria!' }]}
                    name={'categoria'}
                    initialValue={tournament?.categoria}
                    label="Categoria">
                    <Input name='categoria' ></Input>
                </Form.Item>

                <Form.Item
                    label="Jugadores"
                    initialValue={tournament?.cant_jugadores}
                    name={'cant_jugadores'}>
                    <Select options={[
                        {
                            value: 0,
                            label: 'seleccionar mas tarde',
                            selected: true
                        },
                        {
                            value: 32,
                            label: '32'
                        },
                        {
                            value: 16,
                            label: '16'
                        },
                        {
                            value: 8,
                            label: '8'
                        }
                    ]} />
                </Form.Item>
            </Form>
        </Modal>
    )



    return {
        error,
        loading,
        handleSubmit,
        contextHolder,
        modal,
        handleOpenModal
    }
};

export default useUpdateTournament
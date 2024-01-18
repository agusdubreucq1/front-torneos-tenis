import { Modal, Select, Form, Input, DatePicker, Alert, message } from 'antd';
import React from 'react';
// import useJugadores from './useJugadores';
import useJugadoresFromTournament from './useJugadoresFromTournament';
import { createPartido } from '../services/createPartido';
import { useUser } from '../store/user';

interface ValuesPartido {
    orden: number | null,
    jugadoresXRonda: number | null,
}

const useModalForm = ({ id, fetchPartidos }: { id: string | number , fetchPartidos?: () => void }) => {

    const [form] = Form.useForm()
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(false)
    const [messageAPI, contextHolder] = message.useMessage();

    const { jugadores } = useJugadoresFromTournament({ id })
    const token = useUser((state) => state.token)

    const [openModal, setOpenModal] = React.useState(false);
    const [valuesPartido, setValuesPartido] = React.useState<ValuesPartido>(
        { orden: null, jugadoresXRonda: null }
    );
    const handleCloseModal = () => {
        setOpenModal(false)
        form.resetFields()
        setError(null)};
    const handleOpenModal: ({ jugadoresXRonda, orden }: ValuesPartido) => void = ({ jugadoresXRonda, orden }) => {
        setValuesPartido({ jugadoresXRonda, orden });
        setOpenModal(true);
    }

    const handleOk = () => {
        setError(null)
        form
            .validateFields()
            .then((values) => {
                setLoading(true)
                form.resetFields();
                let body = { ...values, ...valuesPartido }
                console.log(body)
                createPartido(body, token!, id)
                    .then(() => {
                        messageAPI.success('Partido creado con exito')
                        if (fetchPartidos) {
                            fetchPartidos()
                        }
                    })
                setOpenModal(false)
            })
            .catch((info) => {
                setError('Error al crear el partido')
                console.log('Validate Failed:', info);
            })
            .finally(() => {
                // setOpenModal(false);
                setLoading(false)
            });
    }

    const modal = (
        <Modal
            onCancel={handleCloseModal}
            okText='Crear'
            open={openModal}
            onOk={handleOk}
            confirmLoading={loading}
        >
            {error &&
                <Form.Item>
                    <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
                </Form.Item>}

            <Form
                form={form}>
                <Form.Item
                    label={'Jugador 1'}
                    name={'pareja1'}
                    rules={[{ required: true, message: 'Ingresa el jugador 1!' }]}>
                    <Select
                        options={jugadores?.map(j => ({ label: `${j.user?.nombre} ${j.user?.apellido}`, value: j.id }))}
                    />

                </Form.Item>

                <Form.Item
                    label={'Jugador 2'}
                    name={'pareja2'}
                    rules={[{ required: true, message: 'Ingresa el jugador 2!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (getFieldValue('pareja1') === value) {
                              return Promise.reject(new Error('Jugadores no pueden ser iguales!'));
                            }
                            return Promise.resolve();
                        },
                      }),]}>
                    <Select
                        options={jugadores?.map(j => ({ label: `${j.user?.nombre} ${j.user?.apellido}`, value: j.id }))}
                    />

                </Form.Item>

                <Form.Item
                    label={'Resultado'}
                    name={'resultado'}
                >
                    <Input placeholder='ej: 6-3'></Input>

                </Form.Item>

                <Form.Item
                    label={'Fecha'}
                    name={'fecha'}>
                    <DatePicker></DatePicker>
                </Form.Item>

                <Form.Item
                    label={'Ganador'}
                    name={'ganador'}>
                    <Select options={[{ label: 'Jugador 1', value: '1' }, { label: 'Jugador 2', value: '2' }]}></Select>
                </Form.Item>

            </Form>
        </Modal>
    )

    return {
        openModal,
        handleCloseModal,
        handleOpenModal,
        modal,
        contextHolder
    }
}

export default useModalForm
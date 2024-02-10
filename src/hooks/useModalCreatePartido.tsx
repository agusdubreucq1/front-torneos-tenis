import { Modal, Select, Form, DatePicker, Alert, message } from 'antd';
import React from 'react';
import { createPartido } from '../services/partido';
import { useUser } from '../store/user';
import { useMatches } from '../store/matches';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';

interface ValuesPartido {
    orden: number | null,
    jugadoresXRonda: number | null,
}

const useModalCreatePartido = ({ id }: { id: string | number }) => {
    const [form] = Form.useForm();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [messageAPI, contextHolder] = message.useMessage();

    const jugadores = useJugadoresInscriptos((state) => state.jugadoresInscriptos);

    const token = useUser((state) => state.token);
    const getMatches = useMatches((state) => state.getMatches);

    const [openModal, setOpenModal] = React.useState(false);
    const [valuesPartido, setValuesPartido] = React.useState<ValuesPartido>({
        orden: null,
        jugadoresXRonda: null,
    });

    const handleCloseModal = () => {
        setError(null);
        setOpenModal(false);
        form.resetFields();

    };

    const handleOpenModal = ({ jugadoresXRonda, orden }: ValuesPartido) => {
        setValuesPartido({ jugadoresXRonda, orden });
        setOpenModal(true);
    };

    const handleOk = async () => {
        setError(null);
        try {
            const values = await form.validateFields();
            setLoading(true);
            form.resetFields();
            const body = { ...values, ...valuesPartido };
            await createPartido(body, token!, id);
            messageAPI.success('Partido creado con exito');
            getMatches(id);
            setOpenModal(false);
        } catch (error) {
            setError('Error al crear el partido');
            console.log('Validate Failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const modal = (
        <Modal
            onCancel={handleCloseModal}
            okText='Crear'
            open={openModal}
            onOk={handleOk}
            confirmLoading={loading}
        >
            {error && (
                <Form.Item>
                    <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
                </Form.Item>
            )}

            <Form form={form}>
                <Form.Item
                    label={'Jugador 1'}
                    name={'pareja1'}
                    rules={[{ required: true, message: 'Ingresa el jugador 1!' }]}
                >
                    <Select
                        options={jugadores?.map((j) => ({
                            label: `${j.user?.nombre} ${j.user?.apellido}`,
                            value: j.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label={'Jugador 2'}
                    name={'pareja2'}
                    rules={[
                        { required: true, message: 'Ingresa el jugador 2!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('pareja1') === value) {
                                    return Promise.reject(new Error('Jugadores no pueden ser iguales!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Select
                        options={jugadores?.map((j) => ({
                            label: `${j.user?.nombre} ${j.user?.apellido}`,
                            value: j.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item label={'Resultado'} name={'resultado'}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('ganador') && !value) {
                                    return Promise.reject(new Error('Si pones un ganador debes poner el resultado!'));
                                }
                                return Promise.resolve();
                            },
                        }),]}>
                    {/* <Input placeholder='ej: 6-3'></Input> */}
                    <Select
                        options={[
                            { label: '6-0', value: '6-0' },
                            { label: '6-1', value: '6-1' },
                            { label: '6-2', value: '6-2' },
                            { label: '6-3', value: '6-3' },
                            { label: '6-4', value: '6-4' },
                            { label: '7-5', value: '7-5' },
                            { label: '7-6', value: '7-6' },
                        ]
                        }
                    />
                </Form.Item>

                <Form.Item label={'Fecha'} name={'fecha'}>
                    <DatePicker></DatePicker>
                </Form.Item>

                <Form.Item label={'Ganador'} name={'ganador'}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('resultado') && !value) {
                                    return Promise.reject(new Error('Si pones un resultado debes poner un ganador!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}>
                    <Select
                        allowClear
                        options={[
                            { label: 'Jugador 1', value: 1 },
                            { label: 'Jugador 2', value: 2 },
                        ]}
                    ></Select>
                </Form.Item>
            </Form>
        </Modal>
    );

    return {
        handleOpenModal,
        modal,
        contextHolder,
    };
};

export default useModalCreatePartido;
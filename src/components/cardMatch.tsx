import React, { useEffect } from "react"
import styles_draw from "../styles/drawTournament.module.css"
import { Match } from "../vite-env"

import styles from '../styles/cardMatch.module.css'

import tick from '/icons/tick.svg'
// import useUpdateMatch from "../hooks/useUpdateMatch"
import { Alert, DatePicker, Form, Input, Modal, Select, message } from "antd"
import { useUser } from "../store/user"
import { useMatches } from "../store/matches"
import useModalMatch from "../hooks/useModalMatch"
import { updateMatch } from "../services/partido"
import { useJugadoresInscriptos } from "../store/jugadoresInscriptos"
import dayjs from "dayjs"


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

    const [form] = Form.useForm();
    const jugadores = useJugadoresInscriptos((state) => state.jugadoresInscriptos);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modal, setModal] = React.useState<JSX.Element | null>(null);
    const [matchString, setMatchString] = React.useState<string | null>(null);

    const handleCloseModal = () => {
        setError(null);
        setOpenModal(false);
        form.resetFields();
    };

    const handleOpenModal = () => {
        form.resetFields();
        setOpenModal(true);
    };


    useEffect(() => {
        const newModal = (
            <Modal
                forceRender
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
                        initialValue={match?.Pareja1?.id}
                        name={'pareja1'}
                        rules={[{ required: true, message: 'Ingresa el jugador 1!' }]}
                    >
                        <Select
                            // defaultValue={match?.Pareja1?.id}
                            options={jugadores?.map((j) => ({
                                label: `${j.user?.nombre} ${j.user?.apellido}`,
                                value: j.id,
                                // Selected:  match?.Pareja1?.id === j.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label={'Jugador 2'}
                        name={'pareja2'}
                        initialValue={match?.Pareja2?.id}
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
                            // defaultValue={match?.Pareja2?.id}
                            options={jugadores?.map((j) => ({
                                label: `${j.user?.nombre} ${j.user?.apellido}`,
                                value: j.id,
                                Selected: match?.Pareja2?.id === j.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item label={'Resultado'} name={'resultado'}
                        initialValue={p?.resultado}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue('ganador') && !value) {
                                        return Promise.reject(new Error('Si pones un ganador debes poner el resultado!'));
                                    }
                                    return Promise.resolve();
                                },
                            }),]}>
                        <Input placeholder='ej: 6-3'></Input>
                    </Form.Item>

                    <Form.Item label={'Fecha'} name={'fecha'}
                        initialValue={p?.fecha && dayjs(match?.fecha, 'YYYY/MM/DD')}>
                        <DatePicker format={'YYYY/MM/DD'}></DatePicker>
                    </Form.Item>

                    <Form.Item label={'Ganador'} name={'ganador'}
                        initialValue={p?.ganador}
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
        setModal(newModal)
        // console.log('newModal', newModal.props.children[1].props.children[2].props)
        console.log('se actualizo el partido', p)
    }, [p, openModal]);

    useEffect(() => {
        console.log('newModal', modal?.props.children[1].props.children[2].props)
    }, [modal])

    // const { modal, form, handleOpenModal, setLoading, setError, handleCloseModal, matchString } = useModalMatch(handleOk, p);

    return (
        <>
            {/* <p>{matchString}</p> */}
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
                </div>
                <div>
                    <button className={styles.button} onClick={() => { handleOpenModal() }}>Editar</button>
                    <button className={styles.button}>Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default CardMatch
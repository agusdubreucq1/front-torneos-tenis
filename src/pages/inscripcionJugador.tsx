import React from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles/inscripcionJugador.module.css'
import { Alert, Button, Form, Select } from 'antd';
import useInscripcion from '../hooks/useInscripcion';

const InscripcionJugador: React.FC = () => {
    const { id } = useParams()

    const [form] = Form.useForm()

    const { loading, error, handleFinish, contextHolder, jugadoresNoInscriptos } = useInscripcion({ id: id ?? '', form })

    return (
        <section className={styles.section}>
            {contextHolder}
            <div className={styles.container_form}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical" className={styles.form}
                >
                    {error && <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />}

                    <Form.Item
                        label="Elige un jugador"
                        name="id_jugador"
                        rules={[{ required: true, message: 'selecciona un jugador!' }]}
                    >
                        <Select
                            style={{borderRadius: 0, height: 40, marginBottom: 10}}
                            placeholder="Selecciona el jugador a inscribir"
                            allowClear={true}
                            options={jugadoresNoInscriptos.map((jugador) => ({
                                value: jugador.id,
                                label: `${jugador.user?.nombre} ${jugador.user?.apellido}`,
                                key: jugador.user?.dni
                            }))}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' loading={loading} htmlType="submit" className={styles.btn}>Inscribir</Button>
                    </Form.Item>
                </Form>
            </div>

        </section>
    );
};

export default InscripcionJugador;
import React from 'react';
import useJugadores from '../hooks/useJugadores';
import { useParams } from 'react-router-dom';

import styles from '../styles/inscripcionJugador.module.css'
import { Alert, Button, Form, Select } from 'antd';
import useInscripcion from '../hooks/useInscripcion';

const InscripcionJugador: React.FC = () => {
    const { id_torneo } = useParams()
    const { jugadores } = useJugadores()

    const { loading, error, handleFinish, contextHolder } = useInscripcion({ id: id_torneo! })
    return (
        <section className={styles.section}>
            {contextHolder}
            <Form
                onFinish={handleFinish}
                layout="vertical" className={styles.form}
            >
                {error && <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />}

                <Form.Item
                    label="Elige un jugador"
                    name="jugador"
                    rules={[{ required: true, message: 'selecciona un jugador!' }]}
                >
                    <Select
                        placeholder="Selecciona el jugador a inscribir"
                        options={jugadores.map((jugador) => ({
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
        </section>
    );
};

export default InscripcionJugador;
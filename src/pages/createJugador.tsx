import React from 'react';
import styles from '../styles/createPlayer.module.css'
import styleForm from '../styles/form.module.css'
import { Alert, Form, Input, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import dni_img from '/icons/dni.svg'
import useCreateJugador from '../hooks/useCreateJugador';
import { Helmet } from 'react-helmet-async';

const CreateJugador: React.FC = () => {

    const { onFinish, error, loading, contextHolder } = useCreateJugador()
    return (
        <>
        <Helmet>
            <title>Crear jugador | MisTorneos</title>
            <meta name="description" content="Crea un nuevo jugador para inscribirlo a tus torneos" />
        </Helmet>
        <main className={styles.main}>
            <section className={styles.section}>

                {contextHolder}
                <div className={styleForm.container_form}>
                    <Form
                        name="normal_login"
                        className={styleForm.form}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        {loading &&
                            <div style={{ textAlign: 'center', marginBottom: 10 }}>
                                <Spin />
                            </div>
                        }
                        <h1 className={styles.title}>Crear jugador</h1>
                        {error && <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />}
                        <Form.Item
                            name="nombre"
                            rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                        >
                            <Input className={styleForm.input} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />
                        </Form.Item>

                        <Form.Item
                            name="apellido"
                            rules={[{ required: true, message: 'Ingresa el apellido!' }]}
                        >
                            <Input className={styleForm.input} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Apellido" />
                        </Form.Item>

                        <Form.Item
                            tooltip="Ingresa el dni"
                            name="dni"
                            rules={[{ required: true, message: 'Ingresa el dni!' },
                            { min: 0, max: 99999999, message: 'DNI no valido' }]}
                        >
                            <Input className={styleForm.input}
                                prefix={
                                    <img src={dni_img} style={{ width: 20, height: 20 }} alt="icono de dni" />
                                }
                                type="number"
                                placeholder="DNI"
                            />


                        </Form.Item>
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" className={styleForm.btn}>Crear</button>
                        </div>
                    </Form>
                </div>

            </section>
        </main>
        </>
    );
};

export default CreateJugador
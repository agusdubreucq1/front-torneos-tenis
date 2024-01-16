import React from 'react';
import styles from '../styles/createJugador.module.css'
import { URLBACK } from '../constantes';
import { useUser } from '../store/user';
import { Alert, message, Form, Input, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import dni_img from '/icons/dni.svg'

const CreateJugador: React.FC = () => {

    const [messageAPI, contextHolder] = message.useMessage();

    const token = useUser((state) => state.token);
    const [error, setError] = React.useState<null | string>(null);
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (body: any) => {
        setError(null);
        try {
            setLoading(true);
            const response = await fetch(URLBACK + '/admin/jugador', {
                headers: {
                    Authorization: token!,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)

            })
            if (!response.ok) {
                let json = await response.json();
                setError(json.error)
            } else {
                messageAPI.success('Jugador creado con exito');
            }
        } catch (e) {
            console.log(e);
            setError('Error de conexion');
        } finally {
            setLoading(false);
        }

    }
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Crear jugador</h1>
                {contextHolder}
                <Form
                    style={{ backgroundColor: "#dfdfdf", padding: 30, width: 400, borderRadius: 10 }}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    {loading &&
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <Spin />
                        </div>
                    }
                    {error && <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />}
                    <Form.Item
                        name="nombre"
                        rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />
                    </Form.Item>

                    <Form.Item
                        name="apellido"
                        rules={[{ required: true, message: 'Ingresa el apellido!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Apellido" />
                    </Form.Item>

                    <Form.Item
                        tooltip="Ingresa el dni"
                        name="dni"
                        rules={[{ required: true, message: 'Ingresa el dni!' },
                        { min: 0, max: 99999999, message: 'DNI no valido' }]}
                    >
                        <Input
                            prefix={
                                // <LockOutlined className="site-form-item-icon" />
                                <img src={dni_img} style={{ width: 20, height: 20 }} alt="dni" />
                            }
                            type="number"
                            placeholder="DNI"
                        />


                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        <input type="submit" value={'Crear'} className={styles.btn}></input>
                    </div>
                </Form>
            </section>
        </main>
    );
};

export default CreateJugador
import React from 'react';
import styles from '../styles/register.module.css'
import { Alert, Button, Form, Input, Switch } from 'antd';
import useRegister from '../hooks/useRegister';

const Register: React.FC = () => {

    const { error, loading, newUser, handleChange, handleSubmit, handleChangeSwitch } = useRegister();

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.container_form}>
                    <Form className={styles.form} layout='vertical' onFinish={handleSubmit}
                        labelCol={{ span: 7 }}>
                        {error &&
                            <Form.Item>
                                <Alert message={error} type="error" showIcon />
                            </Form.Item>}

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                            name={"nombre"}
                            label="Nombre" >
                            <Input className={styles.input} name='nombre' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el apellido!' }]}
                            name={"apellido"}
                            label="Apellido" >
                            <Input className={styles.input} name='apellido' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el dni!' }]}
                            name={"dni"}
                            label="DNI" >
                            <Input className={styles.input} name='dni' type='number' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa la contraseña!' }]}
                            name={"password"}
                            label="Password" >
                            <Input.Password className={styles.input} name='password' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Confirma la contraseña!' }]}
                            name={"confirmPassword"}
                            label="Confirm Password" >
                            <Input.Password className={styles.input} name='confirmPassword' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            tooltip="Ser administrador significa que no eres un jugador"
                            name={"isAdmin"}
                            label="Administrador"
                            initialValue={true}>
                            <Switch checked={newUser.isAdmin} onChange={handleChangeSwitch} />
                        </Form.Item>

                        <Form.Item>
                            <Button className={styles.btn} style={{padding: 20}} htmlType="submit" loading={loading}>
                                Registrarse
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </section>
        </main>
    );
};

export default Register
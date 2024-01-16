import React from 'react';
import styles from '../styles/register.module.css'
import { Alert, Button,  Form, Input, Switch } from 'antd';
import useRegister from '../hooks/useRegister';

const Register: React.FC = () => {

    const { error, loading, newUser, handleChange, handleSubmit, handleChangeSwitch} = useRegister();

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <Form style={{ width: 500, padding: 30, background: '#dfdfdf', borderRadius: 20 }} onFinish={handleSubmit}
                    labelCol={{ span: 7 }}>
                    {error &&
                        <Form.Item>
                            <Alert message={error} type="error" showIcon />
                        </Form.Item>}

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                        name={"nombre"}
                        label="Nombre" >
                        <Input name='nombre' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa el apellido!' }]}
                        name={"apellido"}
                        label="Apellido" >
                        <Input name='apellido' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa el dni!' }]}
                        name={"dni"}
                        label="DNI" >
                        <Input name='dni' type='number' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa la contraseña!' }]}
                        name={"password"}
                        label="Password" >
                        <Input.Password name='password' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Confirma la contraseña!' }]}
                        name={"confirmPassword"}
                        label="Confirm Password" >
                        <Input.Password name='confirmPassword' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        tooltip="Ser administrador significa que no eres un jugador"
                        name={"isAdmin"}
                        label="Administrador"
                        initialValue={true}>
                        <Switch checked={newUser.isAdmin} onChange={handleChangeSwitch} />
                    </Form.Item>

                    <Form.Item>
                        <Button className={styles.btn} htmlType="submit" loading={loading}>
                            Registrarse
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </main>
    );
};

export default Register
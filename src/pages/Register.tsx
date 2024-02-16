import React from 'react';
import styles from '../styles/register.module.css'
import styleForm from '../styles/form.module.css'
import { Alert, Button, Form, Input, InputNumber, Switch } from 'antd';
import useRegister from '../hooks/useRegister';
import { Helmet } from 'react-helmet-async';

const Register: React.FC = () => {

    const { error, loading, newUser, handleChange, handleChangeDNI, handleSubmit, handleChangeSwitch } = useRegister();

    return (
        <>
        <Helmet>
            <title>Register | MisTorneos</title>
            <meta name="description" content="Registrate para acceder, podras registrarte como administrador de torneos o como jugador" />
        </Helmet>
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styleForm.container_form}>
                    <Form className={styleForm.form} layout='vertical' onFinish={handleSubmit}
                        labelCol={{ span: 7 }}>
                        {error &&
                            <Form.Item>
                                <Alert message={error} type="error" showIcon />
                            </Form.Item>}

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                            name={"nombre"}
                            label="Nombre" >
                            <Input className={styleForm.input} name='nombre' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el apellido!' }]}
                            name={"apellido"}
                            label="Apellido" >
                            <Input className={styleForm.input} name='apellido' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa el dni!' }]}
                            name={"dni"}
                            label="DNI" >
                            <InputNumber className={styleForm.input} max={99999999} min={10000000} style={{ width: '100%', display: 'flex', alignItems: 'center' }} name='dni' type='number' onChange={handleChangeDNI} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Ingresa la contraseña!' }]}
                            name={"password"}
                            label="Password" >
                            <Input.Password className={styleForm.input} name='password' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Confirma la contraseña!' }]}
                            name={"confirmPassword"}
                            label="Confirm Password" >
                            <Input.Password className={styleForm.input} name='confirmPassword' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            tooltip="Ser administrador significa que no eres un jugador"
                            name={"isAdmin"}
                            label="Administrador"
                            initialValue={true}>
                            <Switch checked={newUser.isAdmin} onChange={handleChangeSwitch} />
                        </Form.Item>

                        <Form.Item>
                            <Button className={styleForm.btn} style={{padding: 20}} htmlType="submit" loading={loading}>
                                Registrarse
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </section>
        </main>
        </>
    );
};

export default Register
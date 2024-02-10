import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/login.module.css';
import styleForm from '../styles/form.module.css'

import userImg from '/icons/user.svg'
import padlock from '/icons/padlock.svg'
import { Alert, Button, Form, Input, InputNumber } from 'antd';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
    const { handleSubmit, error, loading } = useLogin();
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styleForm.container_form}>
                    <Form
                        className={styleForm.form}
                        onFinish={handleSubmit}
                        layout='vertical'
                    >
                        {error &&
                            <Form.Item>
                                <Alert message={error} type="error" showIcon />
                            </Form.Item>}
                        <Form.Item
                            label="DNI"
                            rules={[{ required: true, message: 'Ingresa el dni!' }]}
                            name={'dni'}>
                            <InputNumber style={{ width: '100%', display: 'flex', alignItems: 'center' }} className={styleForm.input} name='dni' type='number' prefix={<img style={{ width: 20, height: 20 }} src={userImg}></img>}></InputNumber>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            rules={[{ required: true, message: 'Ingresa la contraseña!' }]}
                            name={'password'}>
                            <Input.Password name='password' className={styleForm.input} prefix={<img style={{ width: 20, height: 20 }} src={padlock}></img>}></Input.Password>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" className={styleForm.btn} style={{padding: 20}} loading={loading}>
                                Log in
                            </Button>
                            O <Link to={'/register'}>registrarse</Link>
                        </Form.Item>
                    </Form>
                </div>

            </section>
        </main>
    );
};

export default Login
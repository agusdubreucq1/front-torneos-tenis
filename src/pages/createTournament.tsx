import React from 'react';
import styles from '../styles/createTournament.module.css'
import styleForm from '../styles/form.module.css'
import useCreateTournament from '../hooks/useCreateTournament';
import { Alert, Button, DatePicker, Form, Input, Select } from 'antd';
import { getRondas } from '../constantes';
import { Helmet } from 'react-helmet-async';


const CreateTournament: React.FC = () => {

    const { error, loading, handleSubmit, contextHolder } = useCreateTournament()

    return (
        <>
            <Helmet>
                <title>Crear torneo | MisTorneos</title>
                <meta name="description" content="Crea un nuevo torneo donde podras inscribir a tus jugadores y crear sus partidos" />
            </Helmet>
            <main className={styles.main}>
                <section className={styles.section}>

                    {contextHolder}
                    <div className={styleForm.container_form}>
                        <Form
                            className={styleForm.form}
                            labelCol={{ span: 4 }}
                            layout="vertical"
                            onFinish={handleSubmit}
                            autoComplete='off'
                        >
                            {error &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
                                </div>
                            }
                            <h1 className={styles.title}>Crear torneo</h1>
                            <Form.Item
                                rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                                name={'nombre'}
                                label="Nombre">
                                <Input name='nombre' className={styleForm.input}  ></Input>
                            </Form.Item>



                            <Form.Item
                                rules={[{ required: true, message: 'Ingresa la fecha!' }]}
                                label="Fecha"
                                name={'fecha'}>
                                <DatePicker name='fecha' className={styleForm.input} ></DatePicker>
                            </Form.Item>

                            <Form.Item
                                rules={[{ required: true, message: 'Ingresa la categoria!' }]}
                                name={'categoria'}
                                label="Categoria">
                                <Input name='categoria' className={styleForm.input}  ></Input>
                            </Form.Item>


                            <Form.Item
                                label="Descripción"
                                name={'descripcion'}>
                                <Input name='descripcion' className={styleForm.input} ></Input>
                            </Form.Item>

                            <Form.Item
                                label="Lugar"
                                name={'lugar'}>
                                <Input name='lugar' className={styleForm.input}  ></Input>
                            </Form.Item>

                            <Form.Item
                                label="Rondas"
                                name={'cant_jugadores'}>
                                <Select style={{ borderRadius: 0 }} className={styleForm.input} options={[
                                    {
                                        value: 0,
                                        label: 'seleccionar mas tarde',
                                        selected: true
                                    },
                                    {
                                        value: 32,
                                        label: getRondas(32)
                                    },
                                    {
                                        value: 16,
                                        label: getRondas(16)
                                    },
                                    {
                                        value: 8,
                                        label: getRondas(8)
                                    }
                                ]} />
                            </Form.Item>
                            <Button size='large' style={{ borderRadius: 5, padding: 10, height: 60 }} htmlType="submit" loading={loading} className={styleForm.btn} >Crear Torneo</Button>
                        </Form>
                    </div>

                </section>
            </main>
        </>
    );
};

export default CreateTournament;
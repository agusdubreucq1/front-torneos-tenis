import React from 'react';
import styles from '../styles/createTournament.module.css'
import useCreateTournament from '../hooks/useCreateTournament';
import { Alert, Button, DatePicker, Form, Input, Select} from 'antd';


const CreateTournament: React.FC = () => {

    const { error, loading, handleSubmit, contextHolder} = useCreateTournament()

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <h1 className={styles.title}>Crear torneo</h1>
                {contextHolder}
                <Form
                    style={{ width: 500, padding: 30, background: '#dfdfdf', borderRadius: 20 }}
                    labelCol={{ span: 4 }}
                    layout="horizontal"
                    onFinish={handleSubmit}
                    autoComplete='off'
                >
                    {error &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
                        </div>
                    }

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa el nombre!' }]}
                        name={'nombre'}
                        label="Nombre">
                        <Input name='nombre' ></Input>
                    </Form.Item>

                    <Form.Item
                        label="Descripción"
                        name={'descripcion'}>
                        <Input name='descripcion' ></Input>
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa la fecha!' }]}
                        label="Fecha"
                        name={'fecha'}>
                        <DatePicker name='fecha'></DatePicker>
                    </Form.Item>

                    <Form.Item
                        label="Lugar"
                        name={'lugar'}>
                        <Input name='lugar' ></Input>
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Ingresa la categoria!' }]}
                        name={'categoria'}
                        label="Categoria">
                        <Input name='categoria' ></Input>
                    </Form.Item>

                    <Form.Item
                        label="Jugadores"
                        name={'cant_jugadores'}>
                        <Select options={[
                            {
                                value: 0,
                                label: 'seleccionar mas tarde',
                                selected: true
                            },
                            {
                                value: 32,
                                label: '32'
                            },
                            {
                                value: 16,
                                label: '16'
                            },
                            {
                                value: 8,
                                label: '8'
                            }
                        ]} />
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size='large' htmlType="submit" loading={loading} className={styles.btn} >Crear Torneo</Button>
                    </div>
                </Form>
            </section>
        </main>
    );
};

export default CreateTournament;
import { Alert, DatePicker, Form, FormInstance, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { useJugadoresInscriptos } from '../store/jugadoresInscriptos';
import { Match } from '../vite-env';
import dayjs from 'dayjs';

type UseModalMatch = (handleOk: () => void, match?: Match) => {
  modal: JSX.Element | null,
  form: FormInstance<any>,
  handleOpenModal: () => void,
  handleCloseModal: () => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const useModalMatch: UseModalMatch = (handleOk, match) => {
  const [form] = Form.useForm();
  const jugadores = useJugadoresInscriptos((state) => state.jugadoresInscriptos);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [modal, setModal] = React.useState<JSX.Element | null>(null);

  const handleCloseModal = () => {
    setError(null);
    setOpenModal(false);
    form.resetFields();
  };

  const handleOpenModal = () => {
    form.resetFields();
    setOpenModal(true);
  };


  useEffect(() => {
    const newModal = (
      <Modal
        forceRender
        onCancel={handleCloseModal}
        okText='Crear'
        open={openModal}
        onOk={handleOk}
        confirmLoading={loading}
      >
        {error && (
          <Form.Item>
            <Alert style={{ marginBottom: 10 }} message={error} type="error" showIcon />
          </Form.Item>
        )}

        <Form form={form}>
          <Form.Item
            label={'Jugador 1'}
            initialValue={match?.Pareja1?.id}
            name={'pareja1'}
            rules={[{ required: true, message: 'Ingresa el jugador 1!' }]}
          >
            <Select
              options={jugadores?.map((j) => ({
                label: `${j.user?.nombre} ${j.user?.apellido}`,
                value: j.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label={'Jugador 2'}
            name={'pareja2'}
            initialValue={match?.Pareja2?.id}
            rules={[
              { required: true, message: 'Ingresa el jugador 2!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('pareja1') === value) {
                    return Promise.reject(new Error('Jugadores no pueden ser iguales!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              options={jugadores?.map((j) => ({
                label: `${j.user?.nombre} ${j.user?.apellido}`,
                value: j.id,
                Selected: match?.Pareja2?.id === j.id
              }))}
            />
          </Form.Item>

          <Form.Item label={'Resultado'} name={'resultado'}
            initialValue={match?.resultado}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('ganador') && !value) {
                    return Promise.reject(new Error('Si pones un ganador debes poner el resultado!'));
                  }
                  return Promise.resolve();
                },
              }),]}>
            <Input placeholder='ej: 6-3'></Input>
          </Form.Item>

          <Form.Item label={'Fecha'} name={'fecha'}
            initialValue={match?.fecha && dayjs(match?.fecha, dateFormat)}>
            <DatePicker format={dateFormat}></DatePicker>
          </Form.Item>

          <Form.Item label={'Ganador'} name={'ganador'}
            initialValue={match?.ganador}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('resultado') && !value) {
                    return Promise.reject(new Error('Si pones un resultado debes poner un ganador!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}>
            <Select
              allowClear
              options={[
                { label: 'Jugador 1', value: 1 },
                { label: 'Jugador 2', value: 2 },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    );
    setModal(newModal);
    console.log('new match: ', match);
  }, [match, openModal, error]);


  const dateFormat = 'YYYY/MM/DD';

  return {
    modal,
    form,
    handleOpenModal,
    setError,
    handleCloseModal,
    setLoading,
  }
};

export default useModalMatch
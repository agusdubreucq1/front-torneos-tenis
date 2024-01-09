import React from 'react';
import styles from '../styles/register.module.css'
import { URLBACK } from '../constantes';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {

    const navigate = useNavigate();

    const [error, setError] = React.useState<null | String>(null);
    const [newUser, setNewUser] = React.useState({
        nombre: '',
        apellido: '',
        dni: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            setError(null)
            const response = await fetch(URLBACK + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            const data = await response.json();
            if(!response.ok){
                setError(data.error)
            }
            console.log(data);
            navigate('/login');

        }catch(e){
            console.log(e);
            setError('Error de conexion');
        }

    }
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div>
                        <label>Nombre</label>
                        <input type="text" placeholder="nombre" name='nombre' value={newUser.nombre} onChange={handleChange} />
                    </div>
                    
                    <div>
                        <label>Apellido</label>
                        <input type="text" placeholder="apellido" name='apellido' value={newUser.apellido} onChange={handleChange} />
                    </div>

                    <div>
                        <label>DNI</label>
                        <input type="text" placeholder="DNI" name='dni' value={newUser.dni} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Password" name='password' value={newUser.password} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" name='confirmPassword' value={newUser.confirmPassword} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Is damin</label>
                        <input type="checkbox" name='isAdmin' checked={newUser.isAdmin} onChange={(event) => setNewUser({ ...newUser, isAdmin: event.target.checked })} />
                    </div>
                    <input type="submit" value="Register" className={styles.btn}/>
                </form>
            </section>
        </main>
    );
};

export default Register
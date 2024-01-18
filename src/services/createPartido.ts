import { URLBACK } from "../constantes";

export const createPartido = async (body: any, token: string, id: string | number) => {
    const response = await fetch(URLBACK + '/admin/torneo/' + id + '/partidos', {
        headers: {
            Authorization: token!,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
        throw new Error('Error al crear el partido');
    }
    
    return data;
}
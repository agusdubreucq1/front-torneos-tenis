export const URLBACK = "https://api-torneos-tenis.vercel.app";

export const ESTADOS_TORNEOS = {
    EN_CURSO: "ABIERTO",
    FINALIZADO: "COMPLETADO",
    SUSPENDIDO: "SUSPENDIDO"
}

export const RONDAS = {
    '32': '32vos',
    '16': '16vos',
    '8': 'Octavos',
    '4': 'Cuartos',
    '2': 'Semifinal',
    '1': 'Final'
}

export function getRondas(ronda: number) {
    if (ronda == 1) return 'Final';
    if (ronda == 2) return 'Semifinal';
    if (ronda == 4) return 'Cuartos';
    if (ronda == 8) return 'Octavos';
    if (ronda == 16) return '16vos';
    if (ronda == 32) return '32vos';

    return '-';
}
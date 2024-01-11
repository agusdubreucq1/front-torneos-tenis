// Crear una función que devuelva un array con las potencias de 2 menores que un número
export function potenciasDe2(numero: number) {
    let array = [];
    let exponente = 0;
    let potencia = Math.pow(2, exponente); // Calcular 2 elevado a exponente
    while (potencia <= numero) { // Mientras la potencia sea menor o igual que el número
      array.push(potencia); // Añadir la potencia al array
      exponente++; // Incrementar el exponente
      potencia = Math.pow(2, exponente); // Calcular la siguiente potencia
    }
    return array.reverse(); // Devolver el array invertido
  }
  
  // Usar la función para crear un array con las potencias de 2 menores que 16
  let array = potenciasDe2(16);
  console.log(array); // [16, 8, 4, 2, 1]
  
export const arrayDeNumbers = (number: number) => {
    return Array.from({ length: number }, (_, i) => i + 1)
}
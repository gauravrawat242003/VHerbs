export const formattedDate = (date) => {
    const fullDate = new Date(date);
    const day = fullDate.getDay().toString().padStart(2, '0');
    const month = fullDate.getMonth().toString().padStart(2, '0');
    const year = fullDate.getFullYear();

    return `${day}/${month}/${year}`;
}
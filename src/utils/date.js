export function dateDifference(start, end) {
    const date_to_ms = {
        day: 86400000,
        month: 2629746000,
        year: 31556952000,
    }

    let start_date = start != '' ? new Date(start) : Date.now();
    let end_date = end != '' ? new Date(end) : Date.now()

    let years = Math.floor((end_date - start_date) / date_to_ms.year);
    let months = Math.floor((end_date - start_date) / date_to_ms.month);
    let days = Math.floor((end_date - start_date) / date_to_ms.day);

    if (years >= 1) {
        return `${years} tahun`;
    }

    if (months >= 1) {
        return `${months} bulan`;
    }

    return `${days} hari`;
}

export function formatDate(input) {
    const date = new Date(input);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
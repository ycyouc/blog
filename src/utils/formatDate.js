export default function formatDate(timestamp, showTime = false) {
    const date = new Date(+timestamp)
    let str = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate()}`
    if (showTime) {
        const hour = date
            .getHours()
            .toString()
            .padStart(2, "0");
        const minute = date
            .getMinutes()
            .toString()
            .padStart(2, "0");
        const second = date
            .getSeconds()
            .toString()
            .padStart(2, "0");
        str += ` ${hour}:${minute}:${second}`;
    }
    return str
}
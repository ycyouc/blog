export default function(fn, duration=300) {
    let timer
    return (...args)=>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, duration);
    }
}
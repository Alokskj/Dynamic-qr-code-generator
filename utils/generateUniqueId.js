const generateUniqueId = () =>{
    const digits = '0123456789';
    const idLength = 8
    let id = ''
    for(let i=0; i< idLength; i++){
        id += digits[Math.floor(Math.random() * digits.length)]
    }
    return id
}
export default generateUniqueId
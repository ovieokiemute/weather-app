const weatherForm = document.querySelector('form');
const address = document.getElementById('address');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let city = address.value
    messageOne.innerHTML = 'loading'
    messageTwo.innerHTML = ''
    fetch (`/weather?address=${city}`)

    .then(response => {
        return response.json()
    })
    .then(data => {
        if(data.error){
            messageOne.innerHTML = data.error;
            messageTwo.innerHTML = '';
        }else {
            messageOne.innerHTML = ''
            messageTwo.innerHTML += `
            <p>Location: ${data.location}</p>
            <p>Forecast: ${data.forecast}</p>
        `;
        }
        
    })
    .catch(error => {
        console.log(`Error: ${error}`)
    })


});





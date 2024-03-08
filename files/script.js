function translateText() {
    const input = document.querySelector('#input-text')
    const valueText = input.value;

    const select = document.querySelector('#select-lan')
    const valueSelect = select.value;

    fetch('http://localhost:5000/translate', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({valueText, valueSelect}),
        method: 'post'
    })
    .then(res => res.json())
    .then(res => {
        const result = document.querySelector('#result')
        result.innerHTML = res.message;
    })
}

function handleInputChange() {
    const input = document.querySelector('#input-text')
    const textLength = document.querySelector('#textLength')
    textLength.innerHTML = input.value.length;
}
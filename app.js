let searchInput = document.querySelector('#searchInput');
let getDataBtn = document.querySelector('button');
let userList = document.querySelector('#userList');
let loader = document.querySelector('.loader');
let allUserData = [];
async function getData() {
    try {
        if (allUserData.length == 0) {
            loader.style.display = 'block';
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();
            loader.style.display = 'none';
            allUserData = result;
            return result;
        } else {
            return allUserData
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}
getDataBtn.addEventListener('click', () => {
    getData()
        .then(data => {
            userList.innerHTML = '';
            data.forEach(item => {
                const newItem = document.createElement('li');
                newItem.classList.add('userItem');
                newItem.innerHTML = `<span>ID: ${item.id}</span> <span>Name: ${item.name}</span>`;
                userList.appendChild(newItem);
            });
        })
        .catch(err => console.error(err));
});
searchInput.addEventListener('input', function () {
    const searchVal = searchInput.value.toLowerCase();
    const filteredData = allUserData.filter(user =>
        user.name.toLowerCase().includes(searchVal)
    );
    displayFilteredResults(filteredData);
});

function displayFilteredResults(filteredData) {
    userList.innerHTML = '';
    filteredData.forEach(item => {
        const newItem = document.createElement('li');
        newItem.classList.add('userItem');
        newItem.innerHTML = `<span>ID: ${item.id}</span> <span>Name: ${item.name}</span>`;
        userList.appendChild(newItem);
    });
}
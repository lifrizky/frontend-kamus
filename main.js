const tbody = document.querySelector('tbody');
const searchForm = document.getElementById('search');
let usersData = [];

const loadData = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/kamus');
        const result = await response.json();

        usersData = Array.isArray(result.data) ? result.data : [result.data];

        loadUserData(usersData);
    } catch (err) {
        console.log(err);
    }
}

const loadUserData = (data) => {
    const output = data.map((le) => {
        return `
                    <tr>
                        <td>${le.istilah}</td>
                        <td>${le.penjelasan}</td>
                    </tr>
                    `;
    }).join('');
    tbody.innerHTML = output;
}

searchForm.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    const input = usersData.filter((data) => {
        return (
            data.istilah.toLowerCase().includes(value)
        )
    })
    loadUserData(input)
})

loadData();
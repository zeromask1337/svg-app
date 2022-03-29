const input = document.querySelector("#text");
const sandbox = document.querySelector(".sandbox");
const databaseList = document.querySelector(".database-list");
const form = document.querySelector("#form");


input.addEventListener("input", (e) => sandbox.innerHTML = e.target.value);

async function handleSubmit() {
    const {text, group, label} = document.forms.form.elements;

    const rawResponse = await fetch('/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text.value,
            group: group.value,
            label: label.value
        })
    });
    text.value = "";
    loadList();
}

//==============================

async function loadList() {
    const list = await fetch("/list").then(res => res.json());
    const table = document.createElement("table");
    const th = Object.keys(list);
    databaseList.innerHTML = "";
    for (let item of list) {
        table.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${item.id}</td>
                <td>${item.label}</td>
                <td>${item.group_id}</td>
                <td>${item.svg}</td>
            </tr>
        `);
        databaseList.append(table);
    }
}

loadList();

//==============================


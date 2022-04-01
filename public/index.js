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
const copy = async (text) => await navigator.clipboard.writeText(text);

async function loadList() {
    const list = await fetch("/list").then(res => res.json());
    const table = document.createElement("table");
    const [id, label, name, svg] = Object.keys(list[0]);
    databaseList.innerHTML = "";
    table.insertAdjacentHTML("beforeend", `
            <tr>
                <th>${id}</th>
                <th>${label}</th>
                <th>${name}</th>
                <th>${svg}</th>
            </tr>
        `);
    for (let item of list) {
        table.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${item.id}</td>
                <td>${item.label}</td>
                <td>${item.name}</td>
                <td id="svg-cell">
                    <span>${item.svg.slice(0, 15)}...${item.svg.slice(-5)}</span>
                    <button onclick="copy('${item.svg}')">Copy</button>
                </td>
            </tr>
        `);
        databaseList.append(table);
    }
}

loadList();

//==============================


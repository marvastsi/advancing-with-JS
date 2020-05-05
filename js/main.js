var list = [
    { "desc": "rice", "amount": "1", "value": "5.40" },
    { "desc": "beer", "amount": "12", "value": "1.99" },
    { "desc": "meat", "amount": "1", "value": "15.00" },
    { "desc": "beans", "amount": "1", "value": "5.50" }

];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list) {
    var table = `<thead>
        <tr>
            <td>Description</td>
            <td>Amount</td>
            <td>Value</td>
            <td>Action</td>
        </tr>
    </thead>
    <tbody>`;

    for (var key in list) {
        table += `<tr>
            <td>${formatDesc(list[key].desc)}</td>
            <td>${formatAmount(list[key].amount)}</td>
            <td>${formatValue(list[key].value)}</td>
            <td>
                <button class="btn btn-default" onclick="setUpdate(${key});">Edit</button>
                <button class="btn btn-default" onclick="deleteData(${key});">Delete</button>
            </td>
        </tr>`;
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2).toString();
    str = str.replace(".", ",");
    str = `$ ${str}`
    return str;
}

function addData() {
    if (!validation()) {
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({ "desc": desc, "amount": amount, "value": value });
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = `<input type="hidden" name="idUpdate" id="idUpdate" value="${id}">`;
}

function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "block";
}

function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = { "desc": desc, "amount": amount, "value": value };
    resetForm();
    setList(list);
}

function deleteData(id) {
    if (confirm("Delete this item?")) {
        length == 4;
        [0, 1, 2, 3];
        if (id >= 0 && id < list.length) {
            list.splice(id, 1);
        }
        setList(list);
    }
}

function deleteDataOld(id) {
    if (confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop();//remove last
        } else if (id === 0) {
            list.shift();//remove first
        } else {
            // remove middle
            var aux1 = list.slice(0, id);
            var aux2 = list.slice(id + 1);

            list = aux1.concat(aux2);
        }
        setList(list);
    }
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if (desc === "") {
        errors += `<p>Fill out description</p>`;
    }
    if (amount === "") {
        errors += `<p>Fill out quantity</p>`;
    } else if (amount != parseInt(amount)) {
        errors += `<p>Fill out a valid amount</p>`;
    }
    if (value === "") {
        errors += `<p>Fill out value</p>`;
    } else if (value != parseFloat(value)) {
        errors += `<p>Fill out a valid value</p>`;
    }

    if (errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "10px";

        document.getElementById("errors").innerHTML = `<h3>Error: </h3>${errors}`
        return 0;
    } else {
        return 1;
    }
}

function deleteList() {
    if (confirm("Delete this list?")) {
        list = [];
        setList(list);
    }
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function initListStorage() {
    var store = localStorage.getItem("list");
    if (store) {
        list = JSON.parse(store);
    }
    setList(list);
}

initListStorage();

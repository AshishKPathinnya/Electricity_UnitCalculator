function calculateConsumption() {
    const appliances = document.querySelectorAll(".appliance input[type='checkbox']:checked");
    let totalUnits = 0;
    let totalMinutes = 0;    

    appliances.forEach(appliance => {
        const row = appliance.closest("tr");
        const quantityField = row.querySelector("input[type='text'][name='quantity']");
        const powerField = row.querySelector("input[type='text'][name$='_power'], select[name$='_power']");
        const hourField = row.querySelector("input[type='text'][name$='_hour']");
        const minuteField = row.querySelector("input[type='text'][name$='_minute']");
       
        let quantity = parseFloat(quantityField.value);
        const power = parseFloat(powerField.value);
        let hour = parseFloat(hourField.value);
        let minute = parseFloat(minuteField.value);

        if(isNaN(quantity)){
            quantity = 1;
        }

        if (isNaN(hour)){
            hour = 0;
        }

        if (isNaN(minute)){
            minute = 0;
        }

        totalMinutes = (hour * 60) + minute;

        if (!isNaN(power) && !isNaN(totalMinutes)) {
            totalUnits += (quantity * power * totalMinutes) / (1000 * 60);
        }
    });

    displayResult(totalUnits);
}

function displayResult(totalUnits) {
    const resultDiv = document.querySelector("#total_result");
    resultDiv.textContent = `Total Electricity Consumed Per Day: ${totalUnits.toFixed(2)} Units`;
    const monthlyDiv = document.querySelector("#monthly_result");
    monthlyDiv.textContent = `Average Electricity Consumed Per Month: ${(totalUnits * 30).toFixed(2)} Units`;    
}

function addApplianceRow() {
    const table = document.querySelector("table");
    
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_appliance" checked>
            <input type="text" name="new_appliance" placeholder="Name of Appliance" class="otherAppliance">
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_appliance_power"></td>
        <td><input type="text" name="new_appliance_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_appliance_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;

    table.appendChild(newRow);
}


function addLight(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Light</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td>
            <select id="lightWatt" name="new_light_power">
            <option value="5">5W</option>
            <option value="9">9W</option>
            <option value="15">15W</option>
            <option value="20">20W</option>
            <option value="30">30W</option>
            <option value="40">40W</option>
            <option value="60">60W</option>
            <option value="100">100W</option>
            </select>
        </td>
        <td><input type="text" name="new_light_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_light_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addFan(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Fan</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_fan_power" value="75W"></td>
        <td><input type="text" name="new_fan_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_fan_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addRefrigerator(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Refrigerator</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_refrigerator_power" value="300W"></td>
        <td><input type="text" name="new_refrigerator_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_refrigerator_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addTelevision(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Television</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_television_power" value="60W"></td>
        <td><input type="text" name="new_television_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_television_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addAirConditioner(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Air Conditioner</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td>                    
            <select id="airconditionerWatt" name="new_airconditioner_power">
                <option value="1200">1200W</option>
                <option value="1700">1700W</option>
                <option value="2300">2300W</option>
                <option value="1100">1100W</option>
                <option value="1600">1600W</option>
                <option value="2100">2100W</option>
            </select>
        </td>
        <td><input type="text" name="new_airconditioner_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_airconditioner_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addGeyser(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Geyser</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_geyser_power" value="2200W"></td>
        <td><input type="text" name="new_geyser_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_geyser_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addOven(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Microwave Oven</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_oven_power" value="1400W"></td>
        <td><input type="text" name="new_oven_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_oven_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addWaterPump(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Water Pump</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_waterpump_power" value="800W"></td>
        <td><input type="text" name="new_waterpump_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_waterpump_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}

function addLaptop(button) {
    const table = document.querySelector("table");

    const rowIndex = button.closest("tr").rowIndex;
    console.log(rowIndex);
    const newRow = table.insertRow(rowIndex + 1);
    
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_light" checked>
            <label>Laptop</label>
        </td>
        <td><input type="text" name="quantity"></td>
        <td><input type="text" name="new_laptop_power" value="100W"></td>
        <td><input type="text" name="new_laptop_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_laptop_minute" placeholder="Minute"></td>
        <td><button class="deleteRow" onclick="deleteRow(this)">x</button></td>
    `;
}


function deleteRow(button){
    const table = document.querySelector("table");
    const rowIndex = button.closest("tr").rowIndex;
    table.deleteRow(rowIndex);
}


function toggleTheme(event) {
    event.stopPropagation();

    var theme = document.getElementsByTagName('link')[0];
    var image = document.getElementById("themeImage");

    if (theme.getAttribute('href') == 'styles.css') {
        theme.setAttribute('href', 'style2.css');
        image.src = "img/moonwhiteicon.png";
    } else {
        theme.setAttribute('href', 'styles.css');
        image.src = "img/sunwhiteicon.png";
    }
}

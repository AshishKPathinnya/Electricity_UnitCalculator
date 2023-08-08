function calculateConsumption() {
    const appliances = document.querySelectorAll(".appliance input[type='checkbox']:checked");
    let totalUnits = 0;
    let totalMinutes = 0;    

    appliances.forEach(appliance => {
        const row = appliance.closest("tr");
        const powerField = row.querySelector("input[type='text'][name$='_power']");
        const hourField = row.querySelector("input[type='text'][name$='_hour']");
        const minuteField = row.querySelector("input[type='text'][name$='_minute']");
       
        const power = parseFloat(powerField.value);
        let hour = parseFloat(hourField.value);
        let minute = parseFloat(minuteField.value);

        if (isNaN(hour)){
            hour = 0;
        }

        if (isNaN(minute)){
            minute = 0;
        }

        totalMinutes = (hour * 60) + minute;

        if (!isNaN(power) && !isNaN(totalMinutes)) {
            totalUnits += (power * totalMinutes) / (1000 * 60);
        }
    });

    displayResult(totalUnits);
}

function displayResult(totalUnits) {
    const resultDiv = document.querySelector("#total_result");
    resultDiv.textContent = `Total Electricity Consumed: ${totalUnits.toFixed(2)} Units`;
}

function addApplianceRow() {
    const table = document.querySelector("table");
    
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="appliance">
            <input type="checkbox" name="device" value="new_appliance" checked>
            <input type="text" name="new_appliance" placeholder="Name of Appliance" class="otherAppliance">
        </td>
        <td><input type="text" name="new_appliance_power"></td>
        <td><input type="text" name="new_appliance_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_appliance_minute" placeholder="Minute"></td>

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
        <td><input type="text" name="new_light_power"></td>
        <td><input type="text" name="new_light_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_light_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_fan_power"></td>
        <td><input type="text" name="new_fan_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_fan_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_refrigerator_power"></td>
        <td><input type="text" name="new_refrigerator_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_refrigerator_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_television_power"></td>
        <td><input type="text" name="new_television_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_television_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_airconditioner_power"></td>
        <td><input type="text" name="new_airconditioner_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_airconditioner_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_geyser_power"></td>
        <td><input type="text" name="new_geyser_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_geyser_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_oven_power"></td>
        <td><input type="text" name="new_oven_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_oven_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_waterpump_power"></td>
        <td><input type="text" name="new_waterpump_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_waterpump_minute" placeholder="Minute"></td>
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
        <td><input type="text" name="new_laptop_power"></td>
        <td><input type="text" name="new_laptop_hour" placeholder="Hour"></td>
        <td><input type="text" name="new_laptop_minute" placeholder="Minute"></td>
    `;
}
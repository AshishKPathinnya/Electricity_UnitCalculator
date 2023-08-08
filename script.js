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
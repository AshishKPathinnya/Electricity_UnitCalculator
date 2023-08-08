function calculateConsumption() {
    const appliances = document.querySelectorAll(".appliance input[type='checkbox']:checked");
    let totalUnits = 0;

    appliances.forEach(appliance => {
        const row = appliance.closest("tr");
        const powerField = row.querySelector("input[type='text'][name$='_power']");
        const timeField = row.querySelector("input[type='text'][name$='_time']");

        const power = parseFloat(powerField.value);
        const time = parseFloat(timeField.value);

        if (!isNaN(power) && !isNaN(time)) {
            totalUnits += (power * time) / 1000;
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
        <td><input type="text" name="new_appliance_time"></td>
    `;

    table.appendChild(newRow);
}
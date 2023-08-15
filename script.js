function calculateConsumption() {
    const appliances = document.querySelectorAll(".appliance input[type='checkbox']:checked");
    let perDayUnits = 0;
    let totalMinutes = 0;
    // let totalDaysField = document.querySelector("#totalDays");
    // let totalDays = parseFloat(totalDaysField.value);
    // if(isNaN(totalDays)) totalDays=1;  
    // jodi number of days lage uncomment kori dile hol html r logot  
    let totalDays = 30;

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
            perDayUnits += (quantity * power * totalMinutes) / (1000 * 60);
        }
    });

    displayResult(perDayUnits, totalDays);
    calculateBill(perDayUnits, totalDays);   
    
}

function calculateBill(perDayUnits, totalDays) {
    const fixedChargeJD = 40;
    const fixedChargeDA = 70;
    const fixedChargeDB = 70;
    const baseChargeJD = 5.05;
    const baseCharge0to120DA = 5.70;
    const baseCharge121to240DA = 7;
    const baseChargeBalanceDA = 7.90;
    const baseChargeDB = 7.45;
    const govtSubsidyJD = 1;
    const govtSubsidy0to120DA = 0.75;
    const electricityDutyCharge = 0.05;
    const fpppaChargeJDDA = 0.30;
    const fpppaChargeDB = 0.70;

    let fixedCharge = 0;
    let energyCharge = 0;
    let electricityDuty = 0;
    let fpppa = 0;
    let totalCharge = 0;
    let govtSubsidy = 0;
    let grandTotal = 0;

    let totalUnits = perDayUnits * totalDays;

    const connectedLoadField = document.querySelector("#connectedload");
    const connectedLoad = parseFloat(connectedLoadField.value);

    if (connectedLoad == 0.5) {
        fixedCharge = connectedLoad * totalDays * 0.03 * fixedChargeJD;
        energyCharge = totalUnits * baseChargeJD;
        electricityDuty = electricityDutyCharge * (fixedCharge + energyCharge);
        fpppa = fpppaChargeJDDA * totalUnits;
        totalCharge = fixedCharge + energyCharge + electricityDuty + fpppa;
        govtSubsidy = govtSubsidyJD * totalUnits;
        grandTotal = totalCharge - govtSubsidy;

        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Approximate Bill for the Month: Rs. ${grandTotal.toFixed(2)}`;

        document.getElementById("showButton").style.display = "block";
    }
    else if (connectedLoad > 0.5 && connectedLoad < 5) {
        fixedCharge = connectedLoad * totalDays * 0.03 * fixedChargeDA;

        if (totalUnits <= 120) {
            energyCharge = totalUnits * baseCharge0to120DA;
        }
        else if (totalUnits > 120 && totalUnits <= 240) {
            energyCharge = (120 * baseCharge0to120DA) + ((totalUnits - 120) * baseCharge121to240DA);
        }
        else {
            energyCharge = (120 * baseCharge0to120DA) + (120 * baseCharge121to240DA) + ((totalUnits - 240) * baseChargeBalanceDA);
        }

        electricityDuty = electricityDutyCharge * (fixedCharge + energyCharge);
        fpppa = fpppaChargeJDDA * totalUnits;
        totalCharge = fixedCharge + energyCharge + electricityDuty + fpppa;
        
        if (totalUnits <= 120) {
            govtSubsidy = govtSubsidy0to120DA * totalUnits;
        }
        else {
            govtSubsidy = 0;
        }

        grandTotal = totalCharge - govtSubsidy;

        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Approximate Bill for the Month: Rs. ${grandTotal.toFixed(2)}`;

        document.getElementById("showButton").style.display = "block";
    }
    else if (connectedLoad >= 5 && connectedLoad <= 30) {
        fixedCharge = connectedLoad * totalDays * 0.03 * fixedChargeDB;
        energyCharge = totalUnits * baseChargeDB;
        electricityDuty = electricityDutyCharge * (fixedCharge + energyCharge);
        fpppa = fpppaChargeDB * totalUnits;
        totalCharge = fixedCharge + energyCharge + electricityDuty + fpppa;
        govtSubsidy = 0;
        grandTotal = totalCharge - govtSubsidy;

        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Approximate Bill for the Month: Rs. ${grandTotal.toFixed(2)}`;

        document.getElementById("showButton").style.display = "block";
    }
    else if (connectedLoad < 0.5 || connectedLoad > 30){
        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Please enter Connected Load between 0.5-30 to Calculate Bill`;
    }
    else {
        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Please enter Connected Load to Calculate Bill`;
    }

    const fixedchargeField = document.querySelector("#fixedchargeField");
    fixedchargeField.textContent = fixedCharge.toFixed(2);
    const energyChargeField = document.querySelector("#energychargeField");
    energyChargeField.textContent = energyCharge.toFixed(2);
    const electricitydutyField = document.querySelector("#electricitydutyField");
    electricitydutyField.textContent = electricityDuty.toFixed(2);
    const fpppaField = document.querySelector("#fpppaField");
    fpppaField.textContent = fpppa.toFixed(2);
    const totalField = document.querySelector("#totalField");
    totalField.textContent = totalCharge.toFixed(2);
    const govtsubsidyField = document.querySelector("#govtsubsidyField");
    govtsubsidyField.textContent = govtSubsidy.toFixed(2);
    const grandtotalField = document.querySelector("#grandtotalField");
    grandtotalField.textContent = grandTotal.toFixed(2);

}

function displayResult(perDayUnits, totalDays) {
    const resultDiv = document.querySelector("#total_result");
    resultDiv.textContent = `Total Electricity Consumed Per Day: ${perDayUnits.toFixed(2)} Units`;
    const monthlyDiv = document.querySelector("#monthly_result");
    monthlyDiv.textContent = `Average Electricity Consumed Per Month: ${(perDayUnits * totalDays).toFixed(2)} Units`;
   
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


document.getElementById("showButton").addEventListener("click", function() {
    var charges = document.getElementById("charges");
    
    if (charges.style.display === "none") {
        charges.style.display = "block"; 
    } 
    else {
        charges.style.display = "block";  
    }
});
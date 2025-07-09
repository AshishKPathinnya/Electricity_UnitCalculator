function calculateConsumption() {
    const appliances = document.querySelectorAll(".appliance-label input[type='checkbox']:checked, .custom-appliance input[type='checkbox']:checked");
    let perDayUnits = 0;
    let totalMinutes = 0;
    // let totalDaysField = document.querySelector("#totalDays");
    // let totalDays = parseFloat(totalDaysField.value);
    // if(isNaN(totalDays)) totalDays=1;  
    // jodi number of days lage uncomment kori dile hol html r logot  
    let totalDays = 30;

    appliances.forEach(appliance => {
        const container = appliance.closest(".appliance-item, .custom-appliance");
        const quantityField = container.querySelector("input[name='quantity']");
        const powerField = container.querySelector("input[name$='_power'], select[name$='_power']");
        const hourField = container.querySelector("input[name$='_hour']");
        const minuteField = container.querySelector("input[name$='_minute']");
       
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
    let category = "";

    const connectedLoadField = document.querySelector("#connectedload");
    const connectedLoad = parseFloat(connectedLoadField.value);

    if (connectedLoad == 0.5) {
        category = "Jeevan Dhara"
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
        document.getElementById("reportButton").style.display = "block";

        localStorage.setItem('fixedRate', fixedChargeJD);
        localStorage.setItem('baseRate', baseChargeJD);
    }
    else if (connectedLoad > 0.5 && Math.round(connectedLoad) < 5) {
        category = "Domestic-A";
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
            govtSubsidy = govtSubsidy0to120DA * 120;
        }

        grandTotal = totalCharge - govtSubsidy;

        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Approximate Bill for the Month: Rs. ${grandTotal.toFixed(2)}`;

        document.getElementById("showButton").style.display = "block";
        document.getElementById("reportButton").style.display = "block";
    }
    else if (Math.round(connectedLoad) >= 5 && connectedLoad <= 30) {
        category = "Domestic-B";
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
        document.getElementById("reportButton").style.display = "block";
    }
    else if (connectedLoad < 0.5 || connectedLoad > 30){
        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Please enter Connected Load between 0.5-30 kW`;
    }
    else {
        const grandTotalResult = document.querySelector("#grandTotalResult");
        grandTotalResult.textContent = `Enter connected load to calculate bill`;
    }

    const fixedchargeField = document.querySelector("#fixedchargeField");
    fixedchargeField.textContent = `₹${fixedCharge.toFixed(2)}`;
    const energyChargeField = document.querySelector("#energychargeField");
    energyChargeField.textContent = `₹${energyCharge.toFixed(2)}`;
    const electricitydutyField = document.querySelector("#electricitydutyField");
    electricitydutyField.textContent = `₹${electricityDuty.toFixed(2)}`;
    const fpppaField = document.querySelector("#fpppaField");
    fpppaField.textContent = `₹${fpppa.toFixed(2)}`;
    const totalField = document.querySelector("#totalField");
    totalField.textContent = `₹${totalCharge.toFixed(2)}`;
    const govtsubsidyField = document.querySelector("#govtsubsidyField");
    govtsubsidyField.textContent = `₹${govtSubsidy.toFixed(2)}`;
    const grandtotalField = document.querySelector("#grandtotalField");
    grandtotalField.textContent = `₹${grandTotal.toFixed(2)}`;

    localStorage.setItem('fixedCharge', fixedCharge);
    localStorage.setItem('energyCharge', energyCharge);
    localStorage.setItem('electricityDuty', electricityDuty);
    localStorage.setItem('fpppa', fpppa);
    localStorage.setItem('totalCharge', totalCharge);
    localStorage.setItem('govtSubsidy', govtSubsidy);
    localStorage.setItem('grandTotal', grandTotal);
    localStorage.setItem('perDayUnits', perDayUnits);
    localStorage.setItem('totalUnits', totalUnits);
    localStorage.setItem('connectedLoad', connectedLoad);
    localStorage.setItem('category', category);
}

function displayResult(perDayUnits, totalDays) {
    const resultDiv = document.querySelector("#total_result");
    resultDiv.textContent = `${perDayUnits.toFixed(2)} Units`;
    const monthlyDiv = document.querySelector("#monthly_result");
    monthlyDiv.textContent = `${(perDayUnits * totalDays).toFixed(2)} Units`;
   
}

function addApplianceRow() {
    const container = document.querySelector("#additionalAppliances");
    
    const newAppliance = document.createElement("div");
    newAppliance.className = "custom-appliance";
    newAppliance.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove appliance">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-plug"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_appliance" checked>
                    <span class="checkmark"></span>
                    <input type="text" name="new_appliance" placeholder="Appliance Name" style="border: none; background: transparent; font-weight: 500; font-size: 1.125rem; color: var(--text-primary); width: 150px;">
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power (W)</label>
                <input type="number" oninput="calculateConsumption()" name="new_appliance_power" placeholder="Enter watts">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_appliance_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_appliance_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;

    container.appendChild(newAppliance);
}


function addLight(button) {
    const container = document.querySelector("#additionalAppliances");

    const newLight = document.createElement("div");
    newLight.className = "custom-appliance";
    newLight.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove light">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-lightbulb"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_light" checked>
                    <span class="checkmark"></span>
                    Light
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <select onchange="calculateConsumption()" name="new_light_power">
                    <option value="5">5W</option>
                    <option value="9">9W</option>
                    <option value="15">15W</option>
                    <option value="20">20W</option>
                    <option value="30">30W</option>
                    <option value="40">40W</option>
                    <option value="60">60W</option>
                    <option value="100">100W</option>
                </select>
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_light_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_light_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newLight);
}

function addFan(button) {
    const container = document.querySelector("#additionalAppliances");

    const newFan = document.createElement("div");
    newFan.className = "custom-appliance";
    newFan.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove fan">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-fan"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_fan" checked>
                    <span class="checkmark"></span>
                    Fan
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_fan_power" value="75W" readonly>
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_fan_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_fan_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newFan);
}

function addRefrigerator(button) {
    const container = document.querySelector("#additionalAppliances");

    const newRefrigerator = document.createElement("div");
    newRefrigerator.className = "custom-appliance";
    newRefrigerator.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove refrigerator">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-snowflake"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_refrigerator" checked>
                    <span class="checkmark"></span>
                    Refrigerator
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_refrigerator_power" value="300W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_refrigerator_hour" min="0" max="24" placeholder="24">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_refrigerator_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newRefrigerator);
}

function addTelevision(button) {
    const container = document.querySelector("#additionalAppliances");

    const newTelevision = document.createElement("div");
    newTelevision.className = "custom-appliance";
    newTelevision.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove television">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-tv"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_television" checked>
                    <span class="checkmark"></span>
                    Television
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_television_power" value="60W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_television_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_television_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newTelevision);
}

function addAirConditioner(button) {
    const container = document.querySelector("#additionalAppliances");

    const newAC = document.createElement("div");
    newAC.className = "custom-appliance";
    newAC.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove air conditioner">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-wind"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_airconditioner" checked>
                    <span class="checkmark"></span>
                    Air Conditioner
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <select onchange="calculateConsumption()" name="new_airconditioner_power">
                    <option value="1200">1200W (1 Ton, 3 star)</option>
                    <option value="1700">1700W (1.5 Ton, 3 star)</option>
                    <option value="2300">2300W (2 Ton, 3 star)</option>
                    <option value="1100">1100W (1 Ton, Inverter)</option>
                    <option value="1600">1600W (1.5 Ton, Inverter)</option>
                    <option value="2100">2100W (2 Ton, Inverter)</option>
                </select>
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_airconditioner_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_airconditioner_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newAC);
}

function addGeyser(button) {
    const container = document.querySelector("#additionalAppliances");

    const newGeyser = document.createElement("div");
    newGeyser.className = "custom-appliance";
    newGeyser.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove geyser">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-fire"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_geyser" checked>
                    <span class="checkmark"></span>
                    Geyser
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_geyser_power" value="2200W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_geyser_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_geyser_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newGeyser);
}

function addOven(button) {
    const container = document.querySelector("#additionalAppliances");

    const newOven = document.createElement("div");
    newOven.className = "custom-appliance";
    newOven.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove microwave oven">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-microchip"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_oven" checked>
                    <span class="checkmark"></span>
                    Microwave Oven
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_oven_power" value="1400W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_oven_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_oven_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newOven);
}

function addWaterPump(button) {
    const container = document.querySelector("#additionalAppliances");

    const newPump = document.createElement("div");
    newPump.className = "custom-appliance";
    newPump.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove water pump">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-tint"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_waterpump" checked>
                    <span class="checkmark"></span>
                    Water Pump
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_waterpump_power" value="800W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_waterpump_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_waterpump_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newPump);
}

function addLaptop(button) {
    const container = document.querySelector("#additionalAppliances");

    const newLaptop = document.createElement("div");
    newLaptop.className = "custom-appliance";
    newLaptop.innerHTML = `
        <button class="delete-btn" onclick="deleteRow(this)" title="Remove laptop">
            <i class="fas fa-times"></i>
        </button>
        <div class="appliance-header">
            <div class="appliance-icon">
                <i class="fas fa-laptop"></i>
            </div>
            <div class="appliance-info">
                <label class="appliance-label">
                    <input type="checkbox" onclick="calculateConsumption()" name="device" value="new_laptop" checked>
                    <span class="checkmark"></span>
                    Laptop
                </label>
            </div>
        </div>
        <div class="appliance-controls">
            <div class="input-group">
                <label>Quantity</label>
                <input type="number" oninput="calculateConsumption()" name="quantity" min="1" placeholder="1">
            </div>
            <div class="input-group">
                <label>Power</label>
                <input type="text" oninput="calculateConsumption()" name="new_laptop_power" value="100W">
            </div>
            <div class="time-inputs">
                <div class="input-group">
                    <label>Hours</label>
                    <input type="number" oninput="calculateConsumption()" name="new_laptop_hour" min="0" max="24" placeholder="0">
                </div>
                <div class="input-group">
                    <label>Minutes</label>
                    <input type="number" oninput="calculateConsumption()" name="new_laptop_minute" min="0" max="59" placeholder="0">
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newLaptop);
}


function deleteRow(button){
    const appliance = button.closest(".custom-appliance");
    appliance.remove();
    calculateConsumption();
}


// Floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 6000);
    }

    setInterval(createParticle, 300);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced theme toggle with smooth transitions
function toggleTheme(event) {
    event.stopPropagation();
    
    // Add loading effect
    const body = document.body;
    body.classList.add('loading');
    
    setTimeout(() => {
        body.classList.remove('loading');
    }, 300);

    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = body.getAttribute('data-theme');
    
    // Add bounce animation to theme button
    const themeBtn = event.target.closest('.theme-btn');
    themeBtn.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        themeBtn.style.transform = '';
    }, 150);

    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = "fas fa-sun";
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = "fas fa-moon";
        localStorage.setItem('theme', 'dark');
    }
    
    // Trigger particle color update
    updateParticleColors();
}

// Update particle colors based on theme
function updateParticleColors() {
    const particles = document.querySelectorAll('.particle');
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const color = isDark ? '#3b82f6' : '#2563eb';
    
    particles.forEach(particle => {
        particle.style.background = color;
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.appliance-item, .result-card, .custom-appliance').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced input interactions
function initInputEnhancements() {
    // Add floating label effect
    document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add ripple effect on focus
        input.addEventListener('focus', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'input-ripple';
            this.parentElement.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced button interactions
function initButtonEnhancements() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax effect for header
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById("theme-icon");
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = "fas fa-moon";
    } else {
        themeIcon.className = "fas fa-sun";
    }
    
    // Initialize all enhancements
    createFloatingParticles();
    initSmoothScroll();
    initScrollAnimations();
    initInputEnhancements();
    initButtonEnhancements();
    initParallaxEffect();
    
    // Add stagger animation to appliance items
    document.querySelectorAll('.appliance-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Enhanced show/hide bill breakdown with smooth animation
document.getElementById("showButton").addEventListener("click", function() {
    const charges = document.getElementById("charges");
    const button = document.getElementById("showButton");
    
    if (charges.style.display === "none" || charges.style.display === "") {
        charges.style.display = "block";
        charges.style.animation = "slideDown 0.5s ease-out";
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Bill Breakdown';
        
        // Scroll to breakdown
        setTimeout(() => {
            charges.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 250);
    } 
    else {
        charges.style.animation = "slideUp 0.3s ease-in";
        setTimeout(() => {
            charges.style.display = "none";
        }, 300);
        button.innerHTML = '<i class="fas fa-eye"></i> Show Bill Breakdown';
    }
});

// Add CSS for additional animations
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .input-ripple {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(37, 99, 235, 0.1), transparent);
        animation: input-ripple 0.6s ease-out;
        pointer-events: none;
        border-radius: inherit;
    }
    
    @keyframes input-ripple {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
        }
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    .focused label {
        color: var(--primary-color);
        transform: translateY(-2px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);




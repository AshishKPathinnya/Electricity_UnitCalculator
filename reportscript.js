function showReport(){
    const consumerCategoryCell = document.querySelector("#consumer_category");
    consumerCategoryCell.textContent = localStorage.getItem("category");
    const perDayUnitsCell = document.querySelector("#per_day_unit");
    perDayUnitsCell.textContent = parseFloat(localStorage.getItem("perDayUnits")).toFixed(2);
    const totalUnitsCell = document.querySelector("#per_month_unit");
    totalUnitsCell.textContent = parseFloat(localStorage.getItem("totalUnits")).toFixed(2);

    const fixedChargeCell = document.querySelector("#fixed_charge");
    fixedChargeCell.textContent = parseFloat(localStorage.getItem("fixedCharge")).toFixed(2);

    const energyChargeCell = document.querySelector("#energy_charge");
    energyChargeCell.textContent = parseFloat(localStorage.getItem("energyCharge")).toFixed(2);

    const electricityDutyCell = document.querySelector("#electricity_duty");
    electricityDutyCell.textContent = parseFloat(localStorage.getItem("electricityDuty")).toFixed(2);

    const fpppaCell = document.querySelector("#fpppa_charge");
    fpppaCell.textContent = parseFloat(localStorage.getItem("fpppa")).toFixed(2);

    const totalChargeCell = document.querySelector("#total_charge");
    totalChargeCell.textContent = parseFloat(localStorage.getItem("totalCharge")).toFixed(2);

    const govtSubsidyCell = document.querySelector("#govt_subsidy");
    govtSubsidyCell.textContent = parseFloat(localStorage.getItem("govtSubsidy")).toFixed(2);

    const grandTotalCell = document.querySelector("#grand_total");
    grandTotalCell.textContent = parseFloat(localStorage.getItem("grandTotal")).toFixed(2);

}

showReport();

function showDateTime(){
    var datetime = new Date();
    var date = datetime.getDate() + '/' + (datetime.getMonth()+1) + '/' + datetime.getFullYear();
    var time= datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.querySelector("#date_id").innerHTML = date;
    document.querySelector("#time_id").innerHTML = time;
}

showDateTime();

function generatePDF() {
    const element = document.getElementById('container');
    html2pdf().set({ html2canvas: { scale: 4 } }).from(element).save();
}
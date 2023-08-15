function showReport(){
    const perDayUnitsCell = document.querySelector("#per_day_unit");
    perDayUnitsCell.textContent = localStorage.getItem("perDayUnits");
    const totalUnitsCell = document.querySelector("#per_month_unit");
    totalUnitsCell.textContent = localStorage.getItem("totalUnits");
    const fixedChargeCell = document.querySelector("#fixed_charge");
    fixedChargeCell.textContent = localStorage.getItem("fixedCharge");
    const energyChargeCell = document.querySelector("#energy_charge");
    energyChargeCell.textContent = localStorage.getItem("energyCharge");
    const electricityDutyCell = document.querySelector("#electricity_duty");
    electricityDutyCell.textContent = localStorage.getItem("electricityDuty");
    const fpppaCell = document.querySelector("#fpppa_charge");
    fpppaCell.textContent = localStorage.getItem("fpppa");
    const totalChargeCell = document.querySelector("#total_charge");
    totalChargeCell.textContent = localStorage.getItem("totalCharge");
    const govtSubsidyCell = document.querySelector("#govt_subsidy");
    govtSubsidyCell.textContent = localStorage.getItem("govtSubsidy");
    const grandTotalCell = document.querySelector("#grand_total");
    grandTotalCell.textContent = localStorage.getItem("grandTotal");

    localStorage.clear();
}

showReport();

function generatePDF() {
    const element = document.getElementById('container');
    html2pdf().set({ html2canvas: { scale: 4 } }).from(element).save();
}
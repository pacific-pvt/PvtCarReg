import { fetchData } from './SheetData.js';

const vehicles = [];

// 獲取 select 元素
const vehicleSelect = document.getElementById("vehicle");

// 獲取顯示圖片與描述的元素
const vehicleImage = document.getElementById("vehicleImage");
const vehicleDescription = document.getElementById("vehicleDescription");

//取得sheet 車輛資料
const cardata = await fetchData({ 'code': '2' });
cardata.map(item => {
    vehicles.push({ name: item[1], image: item[0], mileage: item[2], enable: item[3] });
})

carlist();

function carlist() {
    // 動態添加選項
    vehicles.forEach(vehicle => {
        const option = document.createElement("option");
        option.value = vehicle.name;  // 設定選項的值
        option.textContent = vehicle.name;  // 設定選項的顯示文本
        if (vehicle.enable === "管制中") {
            option.disabled = true;  // 禁用選項
        }
        vehicleSelect.appendChild(option);  // 將選項添加到 select 中
    });

    // 設定預設選擇的車輛
    window.onload = function () {
        vehicleSelect.value = "";  // 預設選擇轎車
        updateVehicleInfo("請選擇車輛");  // 更新圖片與描述
    };

    // 當選擇車輛時顯示對應的圖片和描述
    vehicleSelect.addEventListener("change", function () {
        const selectedVehicle = vehicleSelect.value;
        updateVehicleInfo(selectedVehicle);
    });
}

// 根據選擇的車輛更新圖片和描述
function updateVehicleInfo(vehicleName) {
    const vehicle = vehicles.find(v => v.name === vehicleName);
    if (vehicle) {
        vehicleImage.src = vehicle.image;
        vehicleImage.alt = vehicle.name;
        vehicleDescription.textContent = '里程：' + vehicle.mileage + ' km';
    } else {
        // 清空圖片和描述
        vehicleImage.src = "";
        vehicleImage.alt = "";
        vehicleDescription.textContent = "";
    }
}
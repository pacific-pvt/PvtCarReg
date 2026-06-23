import { fetchData } from './SheetData.js';
import { url } from './SheetData.js';

const vehicles = [];

// 獲取 select 元素
const vehicleSelect = document.getElementById("vehicle");

// 獲取顯示圖片與描述的元素
const vehicleImage = document.getElementById("vehicleImage");
const vehicleDescription = document.getElementById("vehicleDescription");

//取得sheet 車輛資料
const cardata = await fetchData({ 'code': '2' });
cardata.map(item => {

    const proxyImageUrl = url.replace('/exec', '') + '?id=' + item[0];
    
    vehicles.push({ name: item[1], image: proxyImageUrl, mileage: item[2], enable: item[3] });
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
// 在 SelectList.js 中，fetchData 的呼叫邏輯不變，
// 但我們要在 updateVehicleInfo 裡面做一點小調整：

async function updateVehicleInfo(vehicleName) {
    const vehicle = vehicles.find(v => v.name === vehicleName);
    if (vehicle) {
        // 如果是剛載入，且 image 還是 ID 的話，我們要在這裡發送請求獲取 Base64
        // 或者建議您：在初始化 vehicles 陣列時，先不要賦值圖片，
        // 而是當車輛被選擇時，才去 fetch 該 ID 的圖片數據
        
        vehicleImage.src = "等待載入中..."; // 顯示載入狀態
        const res = await fetch(vehicle.image); // 呼叫 GAS
        const base64Image = await res.text(); // 取得那串 Base64 字串
        
        vehicleImage.src = base64Image; // 把圖片顯示出來
        vehicleImage.alt = vehicle.name;
        vehicleDescription.textContent = '里程：' + vehicle.mileage + ' km';
    } else {
        vehicleImage.src = "";
    }
}

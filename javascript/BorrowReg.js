import { fetchData } from './SheetData.js';

// 取得各表單元素
var employee_name = document.getElementById("employee-name"); // 使用者姓名
var employee_id = document.getElementById("employee-id"); // 使用者工號
var companion = document.getElementById("companion-name"); // 同行者
var starttime = document.getElementById("departure-datetime"); // 出發日期與時間
var endtime = document.getElementById("return-datetime"); // 返回日期與時間
var dest = document.getElementById("destination"); // 目的地
var vehicle = document.getElementById("vehicle"); // 使用車輛

// 傳送表單資料到 Google Sheets API
async function fetchWrite() {

    var formData = {
        'name': employee_name.value, // 使用者姓名
        'id': employee_id.value, // 使用者工號
        'companion': companion.value, // 同行者
        'dest': dest.value, // 目的地
        'car': vehicle.value, // 使用車輛
        'regdate': new Intl.DateTimeFormat('en-CA').format(new Date()), // 登記日期 (格式: yyyy-MM-dd)
        'regtime': new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()), // 登記時間 (格式: HH:mm)
        'startdate': starttime.value.split("T")[0], // 出發日期 (從 datetime-local 取得)
        'starttime': starttime.value.split("T")[1], // 出發時間 (從 datetime-local 取得)
        'enddate': endtime.value.split("T")[0], // 返回日期
        'endtime': endtime.value.split("T")[1], // 返回時間
        'code': '1'
    }

    new bootstrap.Modal(document.getElementById('myModal')).show();

    const BorrowData = await fetchData(formData);
    document.getElementById('spinner').style.display = 'none'; // 隱藏 loading spinner
    document.getElementById('message').style.display = 'block'; // 顯示訊息區塊
    document.getElementById('message').textContent = BorrowData; // 顯示 API 回傳的訊息
    document.getElementById('btn-ok').addEventListener('click', function () {
        document.location.reload();
    })

}

// 設定目前時間（用於 datetime-local 輸入框的最小時間）
const nowISOString = new Date().toISOString().slice(0, 16); // 格式化為 yyyy-MM-ddTHH:mm (datetime-local 需要這個格式)

// 設定出發時間和返回時間的最小值為當前時間
document.getElementById('departure-datetime').setAttribute('min', nowISOString);
document.getElementById('return-datetime').setAttribute('min', nowISOString);

// 出發時間必須小於返回時間的校驗
document.getElementById('return-datetime').addEventListener('input', function () {
    var d = document.getElementById('departure-datetime').value; // 取得出發時間
    var r = document.getElementById('return-datetime').value; // 取得返回時間
    // 如果返回時間小於出發時間，顯示錯誤
    if (r && d && r < d) {
        document.getElementById('return-datetime').setCustomValidity("Error");
    } else {
        document.getElementById('return-datetime').setCustomValidity(""); // 清除錯誤
    }
});

// 驗證表單的有效性
var forms = document.querySelectorAll('.needs-validation'); // 取得所有需要驗證的表單
Array.prototype.slice.call(forms) // 將表單陣列化
    .forEach(function (form) {
        document.getElementById("form-submit").addEventListener('click', function (event) {
            // 檢查表單的有效性
            if (!form.checkValidity()) {
                event.preventDefault(); // 阻止表單提交
                event.stopPropagation(); // 停止事件冒泡
                form.classList.add('was-validated'); // 添加 Bootstrap 驗證樣式
            } else {
                fetchWrite(); // 表單驗證成功後，執行 fetchWrite 函式
            }
        }, false);
    })

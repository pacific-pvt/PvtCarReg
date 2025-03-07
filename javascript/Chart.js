import { fetchData } from './SheetData.js';

//調用google charts的庫
google.charts.load('current', { 'packages': ['timeline'] });
google.charts.setOnLoadCallback(DateChange);

//宣告今天日期
var nowYear = new Date().getFullYear();
var nowMonth = new Date().getMonth() + 1;
var nowDate = new Date().getDate().toString().padStart(2, '0');

//日期選擇器預設今天
document.getElementById('DateControl').valueAsDate = new Date();

//監聽日期選擇器改變
document.getElementById("DateControl").addEventListener("change", DateChange);

//日期選擇器取值並呼叫繪圖函式
function DateChange() {
    var SelectDate = document.getElementById("DateControl").value;
    var dateParts = SelectDate.split('-');
    drawChart(dateParts[0], dateParts[1], dateParts[2]);
}

//繪圖函式
async function drawChart(SelectYear = nowYear, SelectMonth = nowMonth, SelectDay = nowDate) {
    var container = document.getElementById('Chart');
    var spinner = document.getElementById('spinner')
    var chart = new google.visualization.Timeline(container);

    //資料表格式
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'President' }); //主要欄位
    dataTable.addColumn({ type: 'string', id: 'dummy bar label' }) //顯示標籤
    dataTable.addColumn({ type: 'string', role: 'tooltip', p: { 'html': true } }); //懸停提示
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' }); //開始時間
    dataTable.addColumn({ type: 'date', id: 'End' }); //結束時間

    //圖表選項
    var options = {
        focusTarget: 'category',
        tooltip: { isHtml: true },
        height: 510,
        hAxis: {
            format: 'HH:mm',
            minValue: new Date(SelectYear, SelectMonth, SelectDay, 0, 0),
            maxValue: new Date(SelectYear, SelectMonth, SelectDay, 24, 0)
        },
    };

    //預設車輛
    var Select = new Date(SelectYear, SelectMonth, SelectDay, 0, 0);
    const carlist = await fetchData({ 'code': '2' });
    carlist.forEach(data => {
        dataTable.addRows([[data[1], '', '', '#A9A9A9', Select, Select]]);
    });

    // 呼叫 SheetData.js 中的函數來獲取資料
    spinner.style.display = 'inline-block';
    container.style.display = 'none';
    const rows = await fetchData({ 'code': '0' }); // 等待 fetchData 返回的資料
    const processedRows = rows.map(data => {
        return processItem(data, SelectYear + "-" + SelectMonth + "-" + SelectDay);
    }).filter(item => item !== undefined); // 移除 undefined 的資料

    // 更新 dataTable，並顯示圖表
    dataTable.addRows(processedRows);
    spinner.style.display = 'none';
    container.style.display = 'block';
    chart.draw(dataTable, options); // 繪製圖表
}

function processItem(item, FilterDate) {
    // 解析日期和時間
    var startDate = item[7].split('-');
    var startTime = item[8].split(':');
    var endDate = item[9].split('-');
    var endTime = item[10].split(':');
    var startDateTime = new Date(startDate[0], startDate[1], startDate[2], startTime[0], startTime[1]);
    var endDateTime = new Date(endDate[0], endDate[1], endDate[2], endTime[0], endTime[1]);

    // 生成懸停提示內容
    var tip = createCustomHTMLContent(item[0] + item[1], item[2], item[3], item[4], item[7] + " " + item[8], item[9] + " " + item[10], item[11]);

    // 顏色
    var color = item[11] === '未回' ? '#0d6efd' : '#A9A9A9';

    // 將跨日時間分開
    var con = (item[7] == FilterDate ? 1 : 0) + (item[9] == FilterDate ? 2 : 0);
    switch (con) {
        case 1: // item[8] == FilterDate && item[10] != FilterDate
            endDateTime = new Date(startDate[0], startDate[1], startDate[2], 24, 0);
            break;
        case 2: // item[8] != FilterDate && item[10] == FilterDate
            startDateTime = new Date(endDate[0], endDate[1], endDate[2], 0, 0);
            break;
        case 3: // item[8] == FilterDate && item[10] == FilterDate
            break;
        default: // 如果不符合任何條件，返回 undefined
            return undefined;
    }

    // 返回處理後的資料
    return [
        item[4],           // 使用車輛
        item[0],           // 使用者名稱
        tip,               // 詳細資訊(懸停)
        color,
        startDateTime,     // 開始時間
        endDateTime        // 結束時間
    ];
}

function createCustomHTMLContent(user, othder, address, car, start, end, back) {
    return '<div style="padding:5px ; width:200px ;height:auto"><table style="margin:auto">' +
        '<tr><th scope="row">使用者 :' + '</th><td>' + user + '</td></tr>' +
        '<tr><th scope="row">目的地 :' + '</th><td>' + address + '</td></tr>' +
        '<tr><th scope="row">借用車輛 :' + '</th><td>' + car + '</td></tr>' +
        '<tr><th scope="row">預計出發 :&nbsp' + '</th><td>' + start + '</td></tr>' +
        '<tr><th scope="row">預計返回 :&nbsp' + '</th><td>' + end + '</td></tr>' +
        '<tr><th scope="row">確定返回 :&nbsp' + '</th><td>' + back + '</td></tr>' +
        '</table></div>';
}




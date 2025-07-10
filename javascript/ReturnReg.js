import { fetchData } from './SheetData.js';

//---------------取得未回紀錄------------------
getsheetdata();

async function getsheetdata() {
    const SheetData = await fetchData({ 'code': '3' });

    document.getElementById('spinner').style.display = 'none'; // 隱藏 loading spinner

    var table = document.getElementById("Return-Table").getElementsByTagName('tbody')[0];

    SheetData.map(item => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item[0] + ' ' + item[1];
        row.appendChild(nameCell);

        const carCell = document.createElement('td');
        carCell.textContent = item[4];
        row.appendChild(carCell);

        const destCell = document.createElement('td');
        destCell.textContent = item[3];
        row.appendChild(destCell);

        const startCell = document.createElement('td');
        startCell.textContent = item[7] + ' ' + item[8];
        row.appendChild(startCell);

        const backCell = document.createElement('td');
        backCell.textContent = item[9] + ' ' + item[10];
        row.appendChild(backCell);

        table.appendChild(row);
    });
}

//---------------互動視窗------------------
const myModal = new bootstrap.Modal(document.getElementById('myModal'), { backdrop: 'static', keyboard: false })
const backuser = document.getElementById('back-user');
const backcar = document.getElementById('back-car');
const backdest = document.getElementById('back-dest');
const backstart = document.getElementById('back-start');
const backreturn = document.getElementById('back-return');
const actualreturntime = document.getElementById('actual-return-time');
const backgas = document.getElementById('back-gas');

document.getElementById('Return-Table').addEventListener('click', function (event) {
    if (event.target && event.target.nodeName === 'TD') {
        let row = event.target.parentNode; // 獲取點擊的行
        myModal.show();

        // 取得所有儲存格
        let cells = row.getElementsByTagName('td');

        // 將每個儲存格的值分別放入
        backuser.value = cells[0] ? cells[0].innerText : '!'; // 第1個儲存格
        backcar.value = cells[1] ? cells[1].innerText : '!'; // 第2個儲存格
        backdest.value = cells[2] ? cells[2].innerText : '!'; // 第3個儲存格
        if (cells[3]) {
            backstart.value = cells[3].innerText.replace(' ', 'T');
        } else {
            backstart.value = '!';
        }

        if (cells[4]) {
            backreturn.value = cells[4].innerText.replace(' ', 'T');
        } else {
            backreturn.value = '!';
        }
    }
});

//---------------驗證------------------
var forms = document.querySelectorAll('.needs-validation'); // 取得所有需要驗證的表單

Array.prototype.slice.call(forms) // 將表單陣列化
    .forEach(function (form) {
        document.getElementById("btn-Ok").addEventListener('click', function (event) {
            // 檢查表單的有效性
            if (!form.checkValidity()) {
                event.preventDefault(); // 阻止表單提交
                event.stopPropagation(); // 停止事件冒泡
                form.classList.add('was-validated'); // 添加 Bootstrap 驗證樣式
            } else {
                ReturnReg();// 表單驗證成功後，執行 ReturnReg 函式
            }
        }, false);
    })

//--------------確認返回----------------
async function ReturnReg() {

    var formdata = {
        'name': backuser.value.split(" ")[0], // 使用者姓名
        'id': backuser.value.split(" ")[1], // 使用者工號
        'dest': backdest.value, // 目的地
        'car': backcar.value, // 使用車輛
        'regdate': new Intl.DateTimeFormat('en-CA').format(new Date()), // 登記日期 (格式: yyyy-MM-dd)
        'regtime': new Intl.DateTimeFormat('en-CA', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()), // 登記時間 (格式: HH:mm)
        'startdate': backstart.value.split(" ")[0], // 出發日期 (從 datetime-local 取得)
        'starttime': backstart.value.split(" ")[1], // 出發時間 (從 datetime-local 取得)
        'enddate': backreturn.value.split(" ")[0], // 返回日期
        'endtime': backreturn.value.split(" ")[1], // 返回時間
        'returnTime': actualreturntime.value,
        'gas': backgas.value,
        'code': '4'
    };

    document.getElementById('spinner1').style.display = 'block';
    document.getElementById('backform').style.display = 'none';
    document.getElementById('btn-Ok').disabled = true;
    document.getElementById('btn-Cancel').disabled = true;
    const SheetData = await fetchData(formdata);
    document.getElementById('spinner1').style.display = 'none';
    document.getElementById('message').style.display = 'block';
    document.getElementById('message').textContent = SheetData;
    document.getElementById('btn-Cancel').disabled = false;
    document.getElementById('btn-Cancel').textContent='關閉'
}

//--------------取消按鈕----------------
document.getElementById("btn-Cancel").addEventListener('click', function (event) {
    event.preventDefault(); // 阻止表單提交
    event.stopPropagation(); // 停止事件冒泡
    myModal.hide();
    document.location.reload();
})

//變數
var addBtn = document.getElementById('addBtn'); //新增按鈕
var clearBtn = document.getElementById('clearBtn'); //清除全部按鈕
var newTodo = document.getElementById('newTodo'); //選取文字欄位-任務事項
var listUl = document.getElementById('todoList'); //選取UL
var countNum = document.getElementById('taskCount'); //幾筆任務的計數
var todoData = JSON.parse(localStorage.getItem('todo')) || []; //[]儲存輸入的事項 或是localstorage裡面的資料
// console.log(todoList);


//監聽
addBtn.addEventListener('click', addTodolist, false); //綁按鈕點擊新增待辦事項
clearBtn.addEventListener('click', clearTodolist, false); //綁按鈕點擊刪除所有事項
listUl.addEventListener('click', deletTodolist, false); //綁UL刪除事項
listUl.addEventListener('click', checkList, false); //綁UL點選已完成事項
renderTodoList(); //預設更新



//處理資料!!!!!!!!將文字欄位的值加進[]及localstorage
function addTodolist(e) {
    if (newTodo.value.trim() !== '') { //trim() 去除字串前後的空白，判斷新增任務欄位值是否有值，有值為true
        todoData.push({ //將文字欄位的值加進 [],以物件的格式
            id: Math.floor(Date.now()), //Math.floor() 最大整數，是取小於這個數的最大整數 ; Date.now() 是回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數
            title: newTodo.value,
            completed: false, //預設未完成任務為false
        })
        newTodo.value = ''; //清空文字欄位
        renderTodoList(); //呼叫function，將取到的值呈現在網頁上，渲染到畫面

        var todoDataString = JSON.stringify(todoData); // 將重整過後的[]轉成字串
        localStorage.setItem('todo', todoDataString); //丟進localstorage

    }
}   

    //網頁內容呈現
    function renderTodoList() {
        var str = '';
        todoData.forEach(function (item) {
            str += `<li class="list-group-item">
                <div class="d-flex">
                <div class="form-check">
                <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
                <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
                </div>
                <button type="button" class="close ml-auto" aria-label="Close">
                <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
                </button>
                </div>
                </li>`;
        }) //用forEach跑資料組字串，字串裡面用三元運算子判斷 任務是否已經完成，完成就加上checked的class ; 另外也使用HTML的data-屬性
        //span裡面data-action="remove"

        //網頁內容呈現
        listUl.innerHTML = str;
        countNum.textContent = todoData.length;
    }

    //刪除待辦事項
    function deletTodolist(e) {
        var newIndex = 0;
        if (e.target.dataset.action == 'remove') {
            todoData.forEach(function (item, key) {
                if (e.target.dataset.id == item.id) {
                    newIndex = key;
                }
            }) //判斷點擊時元素所在位置(e.target)並用dataset讀取自訂的data-資料，如果有remove
            todoData.splice(newIndex, 1); //刪除資料
            // 把變更後的陣列上傳到localstorage
            var todoListString = JSON.stringify(todoData);
            localStorage.setItem('todo', todoListString);
             renderTodoList(); //更新網頁內容 
        }
    }    

        //清除所有待辦事項
        function clearTodolist(e) {
            e.preventDefault();
            todoData = []; //陣列清空
            listUl.innerHTML = ''; //UL內容清空
            countNum.textContent = todoData.length;
            // 把變更後的陣列上傳到localstorage
            var todoListString = JSON.stringify(todoData);
            localStorage.setItem('todo', todoListString);

        }


        function checkList(e) {
            if (e.target.dataset.action == 'complete') { //點擊checkbox
                todoData.forEach(function (item) {
                    if (e.target.dataset.id == item.id) {
                        if (item.completed) { //如果completed為true 更改變動為false ; 反之則是變動為true (一開始都預設為false未完成)
                            item.completed = false;
                        } else {
                            item.completed = true;
                        }
                    }
                })
            }
            renderTodoList(); //更新網頁內容 
        }
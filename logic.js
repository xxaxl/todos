// 主要定义todos案例中的业务逻辑
var todolist = [
  {
    id: 1,
    todoName: '吃饭',
    isDone: true,
  },
  {
    id: 2,
    todoName: '睡觉',
    isDone: true,
  },
  {
    id: 3,
    todoName: '敲代码',
    isDone: false,
  },
]
//数据传入
dataAfferent()
function dataAfferent() {
  //获取表格
  var otable = document.querySelector('.todo-main');
  //遍历数据 用arr接受map方法返回的数组
  var arr = todolist.map(function (item, index) {
    //用一个变量保存是否选中 是一个布尔值
    var isChecked = item.isDone
    //如果选中 添加样式
    if (isChecked) {
      return ('<li>\
        <label>\
          <input type="checkbox" checked />\
          <span class="done">'+ item.todoName + '</span>\
        </label>\
        <button class="btn btn-danger">删除</button>\
      </li>')
    } else {
      return ('<li>\
        <label>\
          <input type="checkbox" />\
          <span>'+ item.todoName + '</span>\
        </label>\
        <button class="btn btn-danger">删除</button>\
      </li>')
    }
  })
  //将数据渲染到表格中 因为最后返回的是一个数组 需要转为字符串
  otable.innerHTML = arr.join('')
  changeSpan()
}

//单击选中 单击删除
checked()
function checked() {
  //获取ul
  var oTable = document.querySelector('.todo-main');
  //给ul绑定点击事件 事件委托 可以给未来的input也绑定点击事件
  oTable.onclick = function (e) {
    //当点击的目标元素是button时
    if(e.target.nodeName.toLowerCase() === 'button'){
      // console.log(e.target.parentNode);
      //将button的父级元素删除
      e.target.parentNode.remove()
    }
    
    //当点击的目标元素是input时
    if (e.target.nodeName.toLowerCase() === 'input') {

      if (e.target.checked) {
        //给input的下一个兄弟元素节点添加样式
        e.target.nextElementSibling.classList.add('done')
      } else {
        //否则删除样式
        e.target.nextElementSibling.classList.remove('done')
      }
      //调用判断是否选中全选按钮
      
    
    
    }
    //判断是否要将全选按钮选中
    isAllChecked()
    //实时改变span
    changeSpan()
    //判断ul列表是否未空
    isEmpty()
  }

  /* //获取表格中的input
  var oIpts = document.querySelectorAll('.todo-main li label input');
  //遍历
  oIpts.forEach(function (item, index) {
    //绑定点击事件
    item.onclick = function () {
      //如果当前input是选中状态
      if (item.checked) {
        //给input的下一个兄弟元素节点添加样式
        item.nextElementSibling.classList.add('done')
      } else {
        //否则删除样式
        item.nextElementSibling.classList.remove('done')
      }
      //获取到所有被选中的input
      var oIptsChecked = document.querySelectorAll('.todo-main li label input:checked');
      //获取到全选input
      var allChecked = document.querySelector('.todo-footer label input');
      var oIpts = document.querySelectorAll('.todo-main li label input');
      console.log(oIptsChecked);
      console.log();
      //如果被选中的input数量与全部的input数量相同
      if (oIptsChecked.length === oIpts.length) {
        //将全选input选中
        allChecked.checked = true
      } else {
        //否则不选中
        allChecked.checked = false
      }

    }
  }) */
}

//添加数据
addData()
function addData() {
  //获取输入框
  var oIptCon = document.querySelector('.todo-header input');
  var oFoot = document.querySelector('.todo-footer');
  //获取ul列表
  var oTable = document.querySelector('.todo-main');
  //给输入框绑定键盘抬起事件
  oIptCon.onkeyup = function (e) {
    // console.log(e.keyCode);
    //当换行键抬起时
    if (e.keyCode === 13) {
      
      //获取输入框的值 并去掉左右两侧空格
      var value = oIptCon.value.trim()
      // console.log(value);
      //判断值是否为空
      if(!value){
        return
      }
      
      // console.log(value);
      //创建html格式的字符串
      var str = ('<li>\
      <label>\
        <input type="checkbox" />\
        <span>'+ value + '</span>\
      </label>\
      <button class="btn btn-danger">删除</button>\
    </li>')
      //添加到ul列表中 不能覆盖原有数据 所以用拼接的方式
      oTable.innerHTML += str
      //调用判断是否选中全选按钮
      isAllChecked()
      //获取ul列表中的所有span
      var oSpans = document.querySelectorAll('.todo-main span');
      /* var oInputs = document.querySelectorAll('.todo-main input'); */
      //遍历span集合
      oSpans.forEach(function(item,index){
        // console.log(item.previousElementSibling);
        //当span有done类时 
        if(item.className === 'done'){
          //让当前span的上一个兄弟元素节点变为选中状态
          item.previousElementSibling.checked = true
        }else{
          //否则变为未选中状态
          item.previousElementSibling.checked = false
        }
      })
      /* oInputs.forEach(function(item,index){
        if(!item.checked){
          item.nextElementSibling.classList.remove('done')
        }
      }) */
      //将输入框中的值清空
      oIptCon.value = ''
      //实时改变span
      changeSpan()
      //判断ul列表是否为空
      isEmpty()
      
    }
  }
}


//全选按钮
allChecked()
function allChecked(){
  //获取全选按钮
  var oIpt = document.querySelector('.todo-footer input');
  //给全选按钮绑定点击事件
  oIpt.onclick = function(){
    //获取ul列表中的所有单选按钮
    var oIpts = document.querySelectorAll('.todo-main input');
    //当全选按钮为选中状态时
    if(oIpt.checked){
      //将所有的单选按钮变为选中状态 并给对应的span添加done类
      oIpts.forEach(function(item,index){
        item.checked = true
        item.nextElementSibling.classList.add('done')
      })

    }else{
      //将所有的单选按钮变为未选中状态 并给对应的span删除done类
      oIpts.forEach(function(item,index){
        item.checked = false
        item.nextElementSibling.classList.remove('done')
      })
    }
    //实时改变span
    changeSpan()
  }
  
  
}

//清除已选中任务
deleteChecked()
function deleteChecked(){
  //获取按钮
  var oBtnDel = document.querySelector('.todo-footer button');
  //绑定点击事件
  oBtnDel.onclick = function(){
    //获取ul中是选中状态的单选框
    var oIptsChecked = document.querySelectorAll('.todo-main input:checked'); 
    //遍历
    oIptsChecked.forEach(function(item,index){
      //将单选框的父元素节点的父元素节点删除
      item.parentNode.parentNode.remove()
    })
    //实时改变span
    changeSpan()
    //判断ul列表是否为空
    isEmpty()
  }
}


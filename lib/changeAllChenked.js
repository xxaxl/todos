//判断全选按钮是否变为选中状态
function isAllChecked() {
    var oIptsChecked = document.querySelectorAll('.todo-main li label input:checked');
    //获取到全选input
    var allChecked = document.querySelector('.todo-footer label input');
    var oIpts = document.querySelectorAll('.todo-main li label input');
    //   console.log(oIptsChecked);

    //如果被选中的input数量与全部的input数量相同
    if (oIptsChecked.length === oIpts.length) {
        //将全选input选中
        allChecked.checked = true
    } else {
        //否则不选中
        allChecked.checked = false
    }
}


//更改已完成和未完成
function changeSpan() {
    //获取span
    var oSpan = document.querySelector('.todo-footer>span');
    // console.log(oSpan);
    //获取ul列表中被选中的单选框
    var oIptsChecked = document.querySelectorAll('.todo-main input:checked');
    //获取ul列表中所有的单选框
    var oIptsAll = document.querySelectorAll('.todo-main input');
    //获取被选中的单选框数量
    var oiptschecked = oIptsChecked.length
    //获取所有的单选框数量
    var oiptsall = oIptsAll.length
    //保存html格式的字符串
    var str = '<span>已完成' + oiptschecked + '</span> / 全部' + oiptsall + ' '
    //将str插入到span中
    oSpan.innerHTML = str
    // console.log(oSpan.innerHTML);
}


//判断ul列表是否未空
function isEmpty() {
    //获取ul列表中所有的input
    var oIptsAll = document.querySelectorAll('.todo-main input');
    //获取footer
    var oFoot = document.querySelector('.todo-footer');
    //获取ul
    var oMain = document.querySelector('.todo-main');
    //获取wrap
    var oWrap = document.querySelector('.todo-wrap');
    //保存ul列表中input的数量
    var length = oIptsAll.length
    //当数量小于等于0时
    if (length <= 0) {
        //将这两个东西隐藏
        oFoot.style.display = 'none'
        oMain.style.display = 'none'
        //创建一个新的h1标签
        var newH = document.createElement('h1')
        //在h1中添加内容
        newH.innerHTML = '你没有未完成的任务'
        //将h1插入到wrap中
        oWrap.appendChild(newH)
    } else {
        //如果数量大于0 这两个东西就展示 
        oFoot.style.display = 'block'
        oMain.style.display = 'block'
        //将foot下面的h1给删除
        if(oFoot.nextElementSibling){
            oFoot.nextElementSibling.remove()
        }
        

    }
}


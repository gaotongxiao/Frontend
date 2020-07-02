function on_success(res) {
    alert("Successful!");
}

function on_fail(res) {
    alert("Network error!");
}

/** 
 * 往服务器发送消息
 * @param {string} url 目标url
 * @param {array} data 字典形式的数据
 * @param {function} success_callback 
 * @param {function} error_callback 
*/
function send_msg(url, data, success_callback = on_success, error_callback = on_fail) {
    $.ajax({
        url: url,
        type: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data),
        crossDomain: true,
        success: success_callback,
        error: error_callback
    });
}
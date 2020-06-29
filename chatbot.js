jQuery(function ($) {
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

    var count = 0;
    var convForm = $('#chat').convform({
        eventList: {
            onInputSubmit: function (convState, ready) {
                console.log('input is being submitted...');
                //here you send the response to your API, get the results and build the next question
                //when ready, call 'ready' callback (passed as the second parameter)
                if (convState.current.answer.value === 'end') {
                    convState.current.next = false;
                    //emulating random response time (100-600ms)
                    setTimeout(ready, Math.random() * 500 + 100);
                } else if (convState.current.answer.value === 'write') {
                    convState.current.next = convState.newState({
                        type: 'input',
                        name: 'dynamic-question-' + count,
                        questions: ['Enter a random string'],
                    });
                    setTimeout(ready, Math.random() * 500 + 100);
                } else {
                    if (Array.isArray(convState.current.answer)) var answer = convState.current.answer.join(', ');
                    else var answer = convState.current.answer.text;
                    convState.current.next = convState.newState({
                        type: 'select',
                        noAnswer: true,
                        name: 'dynamic-question-' + count,
                        questions: ['This question state was built on your previous answer (you answered: ' + answer + ') and doesnt expect an answer'],
                    });
                    setTimeout(ready, Math.random() * 500 + 100);
                    convState.current.next.next = convState.newState({
                        type: 'select',
                        name: 'dynamic-question-' + count,
                        questions: ['This question state was built on your previous answer (you answered: ' + answer + ')'],
                        answers: [
                            { text: '写答案', value: 'write' },
                            { text: '选答案', value: 'choose' },
                            { text: 'END', value: 'end' }
                        ]
                    });
                    //emulating random response time (100-600ms)
                    setTimeout(ready, Math.random() * 500 + 100);
                }
                count++;
            }
        }
    });
});
jQuery(function ($) {
    function append_message(message) {
        $("#messages").append("<div class=\"message to ready\">"+ message + "</div>");
        $(".conv-form-wrapper").find('#messages').stop().animate({scrolltop: $(".conv-form-wrapper").find('#messages')[0].scrollheight}, 600);
    }

    function visualize_on_render(boxid, callback) {
        if (!document.getElementById(boxid)) {
            setTimeout(visualize_on_render, 100, boxid, callback);
            return;
        }
        callback(boxid);
    }

    var count = 0;
    var visualization_count = 0;
    var convForm = $('#chat').convform({
        eventList: {
            onInputSubmit: function (convState, ready) {
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
                } else if (convState.current.answer.value === 'visualization') {
                    // convForm.dialogue = 0;
                    convState.current.next = convState.newState({
                        type: 'input',
                        noAnswer: true,
                        name: 'dynamic-question-' + count++,
                        questions: ['以下是武汉疫情数据:'],
                    });
                    convState.current.next.next = convState.newState({
                        type: 'input',
                        noAnswer: false,
                        name: 'dynamic-question-' + count,
                        questions: ['<div id="v' + visualization_count +  '" style="width:300px;height:300px;"></div>'],
                    });
                    ready();
                    visualize_on_render('v' + visualization_count, visualize_covid_data)
                    // $('body').on('load', '#v' + visualization_count, visualize_covid_data('v' + visualization_count, 1));
                    visualization_count++;
                    // setTimeout(ready, Math.random() * 500 + 100);
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
                            { text: '可视化', value: 'visualization' },
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
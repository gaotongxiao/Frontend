jQuery(function ($) {
    function append_message(message) {
        $("#messages").append("<div class=\"message to ready\">" + message + "</div>");
        $(".conv-form-wrapper").find('#messages').stop().animate({ scrolltop: $(".conv-form-wrapper").find('#messages')[0].scrollheight }, 600);
    }

    function visualize_on_render(visualization_func, boxid, data) {
        if (!document.getElementById(boxid)) {
            setTimeout(visualize_on_render, 100, visualization_func, boxid, data);
            return;
        }
        visualization_func(boxid, data);
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
                } else {
                    if (Array.isArray(convState.current.answer)) var answer = convState.current.answer.join(', ');
                    else var answer = convState.current.answer.text;
                    send_msg(server_addr, wrap_ans(answer), function (res) {
                        for (var cur_state = convState.current, i = 0; i < res.length; i++, cur_state = cur_state.next) {
                            if (res[i].text != null) {
                                cur_state.next = convState.newState({
                                    type: 'input',
                                    noAnswer: !(i == res.length - 1),
                                    name: 'dynamic-question-' + count++,
                                    questions: [res[i].text],
                                });
                            }
                            else {
                                cur_state.next = convState.newState({
                                    type: 'input',
                                    noAnswer: false,
                                    name: 'dynamic-question-' + count++,
                                    questions: ['<div id="v' + visualization_count + '" style="width:300px;height:300px;"></div>'],
                                });
                                visualize_on_render(visualize_covid_data, 'v' + visualization_count++, res[i].custom);
                            }
                            console.log(res[i]);
                        }
                        ready();
                        gen_random_data();
                        update_dr_data(dr_chart, data.full);
                        fill_explanation("#info-modal", data, 'full');
                    },
                        function (res) {
                            convState.current.next = convState.newState({
                                type: 'input',
                                noAnswer: false,
                                name: 'dynamic-question-' + count++,
                                questions: ['Server error!'],
                            });
                            ready();
                        });
                }
            }
        }
    });
});
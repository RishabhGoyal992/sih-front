var address_book_type = 'emails';
$('input.extra-data').on('keydown keypress', function (e) {
    var key = e.charCode || e.keyCode || 0;
    var sKey = String.fromCharCode(key);
    if (key === 123 || key === 125) { // char } and {
        return false;
    }
    return true;
});
$('input.extra-data').on('paste', function (e) {
    var self = this;
    setTimeout(function (e) { // Ñ‚Ð°Ðº Ð½Ð°Ð´Ð¾
        var sValue = $(self).val();
        if (sValue.indexOf('ec_es_email_sender') !== -1) {
            $(self).val('');
        }
    }, 0);
});
function AddTask() {

    this.saveTaskTypeMessage = function (iTypeMessage) {
        var iTypeMessage = iTypeMessage || 0;
        var sTest = this.getObjSTest();
        var iCurTaskNum = (sTest.currentTaskNum && sTest.currentTaskNum > 0) ? sTest.currentTaskNum : false;
        if (iCurTaskNum) {
            var oCurTask = (sTest.tasks && sTest.tasks[iCurTaskNum]) ? sTest.tasks[iCurTaskNum] : {};
            oCurTask.messageType = iTypeMessage;
            sTest.tasks[iCurTaskNum] = oCurTask;
        }
        return this.saveTaskSTest(sTest);
    };

    this.actionBeforeLoadConstructor = function () {
        if (checkLocalStorage()) {
            localStorage.setItem('currentTargetCreatingTemplate', 'splittest');
            window.location = '/emailservice/constructor/';
        }
        return false;
    };

    this.actionBeforeLoadConstructorV2 = function (id) {
        if (checkLocalStorage()) {
            localStorage.setItem('currentTargetCreatingTemplate', 'splittest');
            window.location = '/emailservice/constructor/structure/layout/' + id + '/';
        }
        return false;
    };

    this.init = function (step) {
        var sTest = this.getObjSTest();
        var iStep = step || sTest.currentStep || 0;
        if (sTest.params && sTest.params.filters) {
            $('#create_by_filter_option').text(Base64.encode(JSON.stringify(sTest.params.filters)));
        }
        var sShowBlock = sTest.currentShowBlock || 'block-step-0';
        this.showSomeStepBlock(sShowBlock, iStep);
    };

    this.saveTask = function (curTaskNum, task) {
        var cTask = this.getSTestTasks();
        if (!cTask[curTaskNum]) {
            cTask[curTaskNum] = {};
        }
        task.message_size = 0;
        if (task.messageBody) {
            var message_body_qp = this.quoted_printable_encode(task.messageBody);
            if (message_body_qp !== undefined) {
                task.message_size = message_body_qp.length;
            }
        }
        cTask[curTaskNum] = task;
        var sTest = this.getObjSTest();
        sTest.tasks = cTask;
        return this.saveTaskSTest(sTest);
    };

    this.editSplittest = function (splittest_id) {
        if (splittest_id) {
            $.blockUI();
            var sTest = this.getObjFromTable(splittest_id);
            sTest.splittest_id = splittest_id;
            this.saveTaskSTest(sTest);
            window.location = '/emailservice/split-tests/add';
        }
    };

    this.getSTestTasks = function () {
        var sTest = this.getObjSTest();
        if (!sTest.tasks)
            sTest.tasks = {};
        return sTest.tasks;
    };

    this.changeSTest = function (option, value) {
        var sTest = this.getObjSTest();
        if (option instanceof Array) {
            switch (option.length) {
                case 1:
                    sTest[option[0]] = value;
                    return this.saveTaskSTest(sTest);
                    break;
                case 2:
                    sTest[option[0]][option[1]] = value;
                    return this.saveTaskSTest(sTest);
                    break;
                case 3:
                    if (this.getAllTasksCount() == 0) {
                        sTest.tasks = {};
                        sTest.tasks[1] = {};
                    }
                    sTest[option[0]][option[1]][option[2]] = value;
                    return this.saveTaskSTest(sTest);
                    break;
                case 4:
                    sTest[option[0]][option[1]][option[2]][option[3]] = value;
                    return this.saveTaskSTest(sTest);
                    break;
            }
        }
        return false;
    };

    this.deletePropSTest = function (option) {
        var sTest = this.getObjSTest();
        if (option instanceof Array) {
            switch (option.length) {
                case 1:
                    if (sTest[option[0]]) {
                        delete sTest[option[0]];
                        return this.saveTaskSTest(sTest);
                    }
                    break;
                case 2:
                    if (sTest[option[0]][option[1]]) {
                        delete sTest[option[0]][option[1]];
                        return this.saveTaskSTest(sTest);
                    }
                    break;
                case 3:
                    if (sTest[option[0]][option[1]][option[2]]) {
                        delete sTest[option[0]][option[1]][option[2]];
                        return this.saveTaskSTest(sTest);
                    }
                    break;
                case 4:
                    if (sTest[option[0]][option[1]][option[2]][option[3]]) {
                        delete sTest[option[0]][option[1]][option[2]][option[3]];
                        return this.saveTaskSTest(sTest);
                    }
                    break;
            }
        }
        return false;
    };

    this.getSomeValueCurrentTaskSTest = function (option) {
        var sTest = this.getObjSTest();
        var curTaskNum = (sTest.currentTaskNum) ? sTest.currentTaskNum : false;
        if (curTaskNum && option) {
            if (option instanceof Array) {
                switch (option.length) {
                    case 1:
                        if (sTest.tasks[curTaskNum][option[0]])
                            return sTest.tasks[curTaskNum][option[0]];
                        break;
                    case 2:
                        if (sTest.tasks[curTaskNum][option[0]][option[1]])
                            return sTest.tasks[curTaskNum][option[0]][option[1]];
                        break;
                }
            } else {
                if (sTest.tasks[curTaskNum][option])
                    return sTest.tasks[curTaskNum][option];
            }
        }
        return false;
    };

    this.getObjSTest = function () {
        var sTest = JSON.parse(localStorage.getItem('sTest'));
        if (sTest == null)
            sTest = {};
        return sTest;
    };

    this.saveTaskSTest = function (obj) {
        return this.setItem('sTest', obj);
    };

    this.getCurTaskNum = function () {
        var sTest = this.getObjSTest();
        return (sTest.currentTaskNum && sTest.currentTaskNum > 0) ? sTest.currentTaskNum : false;
    };

    this.getCurTaskStep = function () {
        var sTest = this.getObjSTest();
        return (sTest.currentStep && sTest.currentStep > 0) ? sTest.currentStep : 1;
    };

    this.setItem = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('The local store is crowded');
            }
        }
    };
    this.clearFields = function () {
        $('#task_name').val('');
        $('#sender_email_name').val('');
        $('#message_title').val('');
        $('#sender_email_name').val('');
        $('#resultBlock').html('');
        if (pageEditor.isInitEditors()) {
            pageEditor.clearContent();
        }
    };
    this.loggerOn = function () {
        $.blockUI();
    };

    this.loggerOff = function () {
        $.unblockUI();
    };
    /* ================================================================================================== */
    /* ================================================================================================== */
    /* ================================================================================================== */
    /* ================================================================================================== */
    /* ================================================================================================== */

    this.initValueStepBlock = function (sTest) {
        var curTaskNum = (sTest.currentTaskNum) ? sTest.currentTaskNum : false;
        var getAllTasksCount = this.getAllTasksCount(); // ÐºÐ¾Ð»-Ð²Ð¾ ÑÐ¾Ð·Ð´Ð°Ð½Ñ‹Ñ… Ñ‚Ð°ÑÐºÐ¾Ð² Ð¸ Ñ‚ÐµÑ… Ñ‡Ñ‚Ð¾ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ
        var iCurStep = this.getCurTaskStep();
        $('input:radio[name="options_competition"]').first().prop('checked', true);
        $('#waiting_time_to_send').prop('checked', true);

        // step 0        
        if (sTest.params) {
            if (sTest.params.name) {
                $('#splittest_name').val(sTest.params.name);
                $('.splitTestName').text(sTest.params.name);
            }
            if (sTest.params.aBookID)
                $('#address_books_list').val(sTest.params.aBookID);
            if (sTest.params.waitDay)
                $('#splittest_days').val(sTest.params.waitDay);
            if (sTest.params.waitHour)
                $('#splittest_hours').val(sTest.params.waitHour);
            if (sTest.params.rush)
                $('input:radio[name="options_competition"]').filter('[value="' + sTest.params.rush + '"]').prop('checked', true);
            if (sTest.params.send)
                $('input:radio[name="options_send"]').filter('[value="' + sTest.params.send + '"]').prop('checked', true);
        }

        if (curTaskNum) {
            if (sTest.tasks && sTest.tasks[curTaskNum]) {
                // step 1
                if (!$('#task_name').val())
                    $('#task_name').val(sTest.tasks[curTaskNum].name);
                if (sTest.tasks[curTaskNum].senderID)
                    $('#sender_email_list').val(sTest.tasks[curTaskNum].senderID);
                if (!$('#sender_email_name').val())
                    $('#sender_email_name').val(sTest.tasks[curTaskNum].senderName);
                // step 2
                if (!$('#message_title').val())
                    $('#message_title').val(sTest.tasks[curTaskNum].messageTitle);
                if (sTest.tasks[curTaskNum].attachBlock)
                    $('#resultBlock').html(sTest.tasks[curTaskNum].attachBlock);
                // after constructor
                if (sTest.isAfterConstructor == 1) {
                    sTest.isAfterConstructor = 0;
                    this.saveTaskSTest(sTest);
                    this.actionAfterConstructor();
                }
            }
            $('#curTaskNumberForAttachFiles').val(curTaskNum);
        }
        if (!$('#sender_email_name').val())
            $('#sender_email_list').change();
        if (!$('#task_name').val()) // Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ñ€Ð°ÑÑÑ‹Ð»ÐºÐ¸, Ð¿Ð¾ÐºÑ€Ð°Ñ‰ÐµÐ½Ð½Ñ
            $('#task_name').val((curTaskNum) ? $('#splittest_task_label').html() + ' ' + curTaskNum : $('#splittest_task_label').html() + ' 1');
        var icurTaskNum = (curTaskNum) ? curTaskNum : 1;
        $('#mailing-char, #cur-task-letter').text(String.fromCharCode(64 + icurTaskNum)); // 65 - A, 66 - B, ...
        $('.next-task-letter').text(String.fromCharCode(65 + icurTaskNum));

        // ********* buttons ************
        if (sTest.editMode) {
            $('.splittestNormalMode').hide();
            $('.splittestEditMode').show();
        } else {
            $('.splittestNormalMode').show();
            $('.splittestEditMode').hide();
            if (getAllTasksCount > 1) {
                $('#splittestEndCreateButton, #splittestEndCreateDescription').show();
            } else {
                $('#splittestEndCreateButton, #splittestEndCreateDescription').hide();
            }
            var sCurTaskBody = this.getTaskBody(curTaskNum);
            if (sCurTaskBody) {
                $('#block-to-next-step2').hide();
                $('#block-end-create-split-test').show();
            } else {
                $('#block-to-next-step2').show();
                $('#block-end-create-split-test').hide();
            }
            if (this.getAllTasksCount() >= 5)
                $('.copyNextTaskButton').hide();
            else
                $('.copyNextTaskButton').show();

        }

        // ***********************************
        if (this.getSomeValueCurrentTaskSTest('isLimitEmails') == 1)// ÐµÑÐ»Ð¸ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ñ‹ Ð²ÑÐµ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ñ‹Ðµ Ð°Ð´Ñ€ÐµÑÐ°
            $('#isDialogLimitShow').html(1);
        // ***********************************    
        if (sTest.currentStep && sTest.tasks && sTest.tasks[curTaskNum]) {
            //setTimeout(function() {
            if (addTask.getTaskMessageText() == "") {
                if (parseInt(sTest.tasks[curTaskNum].bookmarkHTML) == 1) { // text mode
                    $('#text-letter-view').hide();
                    $('#html-letter-view').show();
                    pageEditor.removeEditors(responseText);
                    $('#upload-img-btn').attr('disabled', true);
                    if (!curentTmp && sTest.tasks && sTest.tasks[curTaskNum] && sTest.tasks[curTaskNum].messageBody) {
                        $('#tinymce').css('visibility', 'visible').val(sTest.tasks[curTaskNum].messageBody);
                    }
                } else {
                    pageEditor.setContent(sTest.tasks[curTaskNum].messageBody);
                }
            }
            //}, 10000);
        }
        if (curTaskNum && this.getTaskBody(curTaskNum) != '') {
            $('#block-show-message-body').show();
        } else {
            $('#block-show-message-body').hide();
        }
        if (sTest.currentStep && sTest.currentStep == 4) {
            this.initSlider(sTest);
            $('#use_templates_table_tr').hide();
            $('#template_name_tr').hide();
            if (sTest.params) {
                if (sTest.params.aBookName) {
                    $('#final_addressbook_name').html('<img src="/img/orderload.gif" />');
                    setTimeout(function () {
                        addTask.setFinalInfoAddressBookName();
                    }, 5000);
                }
                $('#options_competition').html($('#splittest_options_competition_' + sTest.params.rush));
                if (sTest.params.send == 1) {
                    var sHtml = $('#waiting_amount_time').html() + ': ';
                    if (sTest.params.waitDay != 0 || sTest.params.waitHour != 0) {
                        if (sTest.params.waitDay != 0) {
                            sHtml += ' <b>' + sTest.params.waitDay + '</b> ' + num2word(sTest.params.waitDay, [$('#days_').text(), $('#days__').text(), $('#days___').text()]);
                        }
                        if (sTest.params.waitHour != 0) {
                            sHtml += ' <b>' + sTest.params.waitHour + '</b> ' + num2word(sTest.params.waitHour, [$('#hours_').text(), $('#hours__').text(), $('#hours___').text()]);
                        }
                    } else {
                        sHtml = $('#send_messages_now').html();
                    }
                    $('#options_send').html(sHtml);
                } else {// Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ð²Ñ€ÑƒÑ‡Ð½ÑƒÑŽ
                    $('#options_send').html('<b>' + $('#manually_sending').html() + '</b>');
                }
                $('#beginTasksInfo').html('');
                if (sTest.tasks) {
                    //console.log(sTest);
                    var tasks = sTest.tasks;
                    sHtml = '';
                    var counter = 0;
                    var sResultHtml = '';
                    //console.log(tasks);

                    for (key in tasks) {
                        if (tasks.hasOwnProperty(key)) {
                            sResultHtml += $('#blank-last-step-task-info').html();
                            sResultHtml = sResultHtml.replace(new RegExp('{{TASK_NUM}}', "gm"), key);
                            sResultHtml = sResultHtml.replace('{{CHAR_TASK}}', String.fromCharCode(65 + counter));
                            sResultHtml = sResultHtml.replace('{{SEDER_EMAIL}}', escapeHtml($("#sender_email_list option[value=" + tasks[key].senderID + "]").html()));
                            sResultHtml = sResultHtml.replace('{{SEDER_NAME}}', escapeHtml(tasks[key].senderName));
                            sResultHtml = sResultHtml.replace('{{SUBJECT}}', escapeHtml(tasks[key].messageTitle));
                            if (tasks[key].message_size !== undefined) {
                                sResultHtml = sResultHtml.replace('{{MSG_SIZE}}', ' (' + (tasks[key].message_size / 1024).toFixed(2) + ' KB)');
                            } else {
                                sResultHtml = sResultHtml.replace('{{MSG_SIZE}}', '');
                            }

                            counter++;
                        }
                    }
                    $("#beginTasksInfo").after(sHtml);
                    $("#allTasksInfoBlock").after(sResultHtml);
                    if (typeof (sTest.dopParams) != 'undefined' && typeof (sTest.dopParams.unsubscribe_link_lang) != 'undefined') {
                        $('#unsubscribe_link_lang_list').val(sTest.dopParams.unsubscribe_link_lang);
                    }
                    if (typeof (sTest.dopParams) != 'undefined' && typeof (sTest.dopParams.statistic) != 'undefined' && typeof (sTest.dopParams.statistic.utm_source) != 'undefined') {
                        $('#external_stat_source').val(sTest.dopParams.statistic.utm_source);
                        if (typeof (sTest.dopParams.statistic.utm_medium) != 'undefined') {
                            $('#external_stat_medium').val(sTest.dopParams.statistic.utm_medium);
                        }
                        if (typeof (sTest.dopParams.statistic.utm_campaign) != 'undefined') {
                            $('#external_stat_campaign_name').val(sTest.dopParams.statistic.utm_campaign);
                        }
                        $('#external_stat').prop('checked' , true);
                        $('#external_stat_wrapper').show();
                        $('#external_stat_campaign_name').addClass('valid');
                        $('#external_stat_medium').addClass('valid');
                        $('#external_stat_source').addClass('valid');
                    }
                }
            }
            //this.checkCredits(sTest.params.aBookID);
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
        }
        document.getElementById('fileInputContainer').innerHTML = document.getElementById('fileInputContainer').innerHTML; // Ð¿Ð¾Ð»Ðµ Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ Ñ„Ð°Ð¹Ð»Ð¾Ð²
    };

    this.actionAfterConstructor = function () {
        var sTest = addTask.getObjSTest();
        if (!sTest.editMode || sTest.editMode == 0) { // ÐµÑ‰Ðµ Ð½Ðµ Ð´Ð¾ÑˆÐ»Ð¸ Ð´Ð¾ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½ÐµÐ³Ð¾ ÑˆÐ°Ð³Ð°
            if (this.getAllTasksCount() > 1) {
                if (this.getAllTasksCount() >= 5) { // ÐºÐ¸Ð´Ð°ÐµÐ¼ ÑÑ€Ð°Ð·Ñƒ Ð½Ð° Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ð¹ ÑˆÐ°Ð³
                    sTest.currentStep = 4;
                    sTest.currentShowBlock = 'block-step-last';
                    this.saveTaskSTest(sTest);
                    window.location = '/emailservice/split-tests/add#4|block-step-last';
                } else { // Ð´Ð¸Ð°Ð»Ð¾Ð³Ð¾Ð²Ð¾Ðµ Ð¾ÐºÐ½Ð¾ Ñ Ð²Ð°Ñ€Ð¸Ð°Ð½Ñ‚Ð°Ð¼Ð¸, Ð¿Ñ€Ð¾Ð´Ð¾Ð»Ð¶Ð¸Ñ‚ÑŒ Ð¸Ð»Ð¸ Ð·Ð°Ð²ÐµÑ€ÑˆÐ¸Ñ‚ÑŒ ÑÐ¿Ð»Ð¸Ñ‚-Ñ‚ÐµÑÑ‚
                    this.dialogChooseCompleteTestOrCreateNextVariant();
                }
            } else { // Ð¿ÐµÑ€Ð²Ð°Ñ Ñ€Ð°ÑÑÑ‹Ð»ÐºÐ°
                this.dialogCopyToNext();
            }
        } else {
            setTimeout(function () {
                addTask.showSomeStepBlock('block-step-1', 1);
            }, 500);
        }
    };

    // ******************************************************* SAVE SOME STEP **********************************************************
    // *********************************************************************************************************************************
    this.saveStep0 = function (isCheck) {
        var sTest = this.getObjSTest();
        var params = {};
        if ($('#splittest_name').val() == '') {
            if (isCheck) {
                $('#splittest_name').addClass('inp-error').focus();
                return false;
            }
        } else {
            if (isCheck) {
                params.name = $('#splittest_name').val();
                $('#splittest_name').removeClass('inp-error');
            }
        }
        //var aBookCntEmails = parseInt($('#address_books_list').find(':selected').attr('data-cntemail'));
        var aBookCntEmails = parseInt($('#count-task-emails').text());
        if ($('#filrers_task_info_count_letters').hasClass('bs-callout-red')) {
            $('#filrers_task_info_count_letters').addClass('border-red');
            return false;
        }
        if ($('#address_books_list').val() == '' || $('#address_books_list').val() == null) {
            if (isCheck) {
                $('#address_books_list').addClass('inp-error').focus();
                return false;
            }
        } else {
            // Ð²Ñ‹Ð±Ñ€Ð°Ð»Ð¸ Ð½Ð¾Ð²ÑƒÑŽ Ð°Ð´Ñ€ÐµÑÐ½ÑƒÑŽ ÐºÐ½Ð¸Ð³Ñƒ
            if (sTest.params && sTest.params.aBookID && sTest.params.aBookID != parseInt($('#address_books_list').val())) {
                sTest.aBookFinalInfoHtml = ''; // Ð·ÐµÐ»ÐµÐ½Ñ‹Ð¹ Ð¸Ð½Ñ„Ð¾-Ð±Ð»Ð¾Ðº Ð½Ð° Ð¿Ð¾ÑÐ»ÐµÐ´Ð½ÐµÐ¼ ÑˆÐ°Ð³Ðµ                
                var getAllTasksCount = this.getAllTasksCount(); // ÐºÐ¾Ð»-Ð²Ð¾ ÑÐ¾Ð·Ð´Ð°Ð½Ñ‹Ñ… Ñ‚Ð°ÑÐºÐ¾Ð² Ð¸ Ñ‚ÐµÑ… Ñ‡Ñ‚Ð¾ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ
                if (getAllTasksCount) { // ÐµÑÐ»Ð¸ ÑƒÐ¶Ðµ ÑÐ¾Ð·Ð´Ð°Ð½Ñ‹ Ñ‚Ð°ÑÐºÐ¸, Ð½ÑƒÐ¶ÐµÐ½ Ð¿ÐµÑ€ÐµÑÑ‡ÐµÑ‚ Ð¸Ð¼Ð°Ð¹Ð»Ð¾Ð²
                    var tasks = this.getSTestTasks();
                    if (tasks) {
                        for (taskNum in tasks) {
                            var perc = parseInt(tasks[taskNum].selectPerc);
                            if (perc) {
                                tasks[taskNum].selectCntEmail = Math.floor(aBookCntEmails / 100 * perc);
                            }
                        }
                    }
                    sTest.tasks = tasks;
                }
                /*
                 var editor = CKEDITOR.instances['ckeditor'];
                 if( editor ) {
                 editor.destroy( true ); // Ð¸Ð½Ð¸Ñ‚ Ð² initValueStepBlock 
                 } 
                 */
            }
            params.aBookID = $('#address_books_list').val();
            params.filters = getFilterResultValuesNew();
            params.aBookCntEmails = aBookCntEmails;
            params.aBookName = $('#address_books_list').find(':selected').attr('data-abookname');
            $('#address_books_list').removeClass('inp-error');
        }
        params.rush = $('input[name=options_competition]:checked').val();
        params.send = $('input[name=options_send]:checked').val();
        if (params.send == 1) {
            params.waitDay = $('#splittest_days').val();
            params.waitHour = $('#splittest_hours').val();
        } else {
            params.waitDay = 0;
            params.waitHour = 0;
        }
        sTest.params = params;
        this.saveTaskSTest(sTest);
        return true;
    }

    this.saveStep1 = function (isCheck) {
        var sTest = this.getObjSTest();
        var curTaskNum = sTest.currentTaskNum || 1;
        var task = (sTest.tasks && sTest.tasks[curTaskNum]) ? sTest.tasks[curTaskNum] : {};
        if ($('#task_name').val() == '') {
            if (isCheck) {
                $('#task_name').addClass('inp-error').focus();
                return false;
            }
        } else {
            task.name = $('#task_name').val();
            $('#task_name').removeClass('inp-error');
        }
        if ($('#sender_email_list').val() == '') {
            if (isCheck) {
                $('#sender_email_list').addClass('inp-error').focus();
                return false;
            }
        } else {
            task.senderID = $('#sender_email_list').val();
            $('#sender_email_list').removeClass('inp-error');
        }
        if ($('#sender_email_name').val() == '') {
            if (isCheck) {
                $('#sender_email_name').addClass('inp-error').focus();
                return false;
            }
        } else {
            task.senderName = $('#sender_email_name').val();
            $('#sender_email_name').removeClass('inp-error');
        }
        if ($('#message_title').val() == '') {
            if (isCheck) {
                $('#message_title').addClass('inp-error').focus();
                return false;
            }
        } else {
            task.messageTitle = $('#message_title').val();
            $('#message_title').removeClass('inp-error');
        }
        if (this.saveTask(curTaskNum, task)) {
            this.changeSTest(['currentTaskNum'], curTaskNum);
            if ($('#isDialogLimitShow').html() == 1)
                this.changeSTest(['isLimitEmails'], 1);
            else
                this.changeSTest(['isLimitEmails'], 0);
            return true;
        }
        return false;
    };

    this.saveTaskMessage = function () {
        var sTest = this.getObjSTest();
        var curTaskNum = sTest.currentTaskNum || 1;
        var task = (sTest.tasks && sTest.tasks[curTaskNum]) ? sTest.tasks[curTaskNum] : {};
        var curentTmp = this.getTaskMessageText();
        if (!curentTmp) {
            alert($('#email_template_empty').html());
            return false;
        } else {
            task.messageBody = curentTmp;
            // ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ðµ Ð·Ð°ÐºÐ»Ð°Ð´ÐºÐ¸ ckEditor(html = 0 /text = 1)
            task.bookmarkHTML = ($('#TextLetter').hasClass('subselected')) ? 1 : 0;
        }
        if (this.saveTask(curTaskNum, task)) {
            return true;
        }
        return false;
    };

    this.quoted_printable_encode = function (str) {
        if (str === undefined) {
            return str;
        }
        //  discuss at: http://phpjs.org/functions/quoted_printable_encode/
        // original by: Theriault
        // improved by: Brett Zamir (http://brett-zamir.me)
        // improved by: Theriault
        //   example 1: quoted_printable_encode('a=b=c');
        //   returns 1: 'a=3Db=3Dc'
        //   example 2: quoted_printable_encode('abc   \r\n123   \r\n');
        //   returns 2: 'abc  =20\r\n123  =20\r\n'
        //   example 3: quoted_printable_encode('0123456789012345678901234567890123456789012345678901234567890123456789012345');
        //   returns 3: '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5'

        var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
                RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm,
                RFC2045Encode1OUT = function (sMatch) {
                    // Encode space before CRLF sequence to prevent spaces from being stripped
                    // Keep hard line breaks intact; CRLF sequences
                    if (sMatch.length > 1) {
                        return sMatch.replace(' ', '=20');
                    }
                    // Encode matching character
                    var chr = sMatch.charCodeAt(0);
                    return '=' + hexChars[((chr >>> 4) & 15)] + hexChars[(chr & 15)];
                };
        // Split lines to 75 characters; the reason it's 75 and not 76 is because softline breaks are preceeded by an equal sign; which would be the 76th character.
        // However, if the last line/string was exactly 76 characters, then a softline would not be needed. PHP currently softbreaks anyway; so this function replicates PHP.
        RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g,
                RFC2045Encode2OUT = function (sMatch) {
                    if (sMatch.substr(sMatch.length - 2) === '\r\n') {
                        return sMatch;
                    }
                    return sMatch + '=\r\n';
                };
        str = str.replace(RFC2045Encode1IN, RFC2045Encode1OUT)
                .replace(RFC2045Encode2IN, RFC2045Encode2OUT);
        // Strip last softline break
        return str.substr(0, str.length - 3);
    }

    this.saveStep2 = function () {
        var percAr = [], cntEmails = [];
        $('#resultTaskPanel .percOneTask').each(function () {
            percAr.push(parseInt($(this).html()));
        });
        $('#resultTaskPanel .cntEmailsOneTask').each(function () {
            cntEmails.push(parseInt($(this).html()));
        });
        var tasks = this.getSTestTasks();
        if (tasks) {
            for (taskNum in tasks) {
                tasks[taskNum].selectPerc = percAr[taskNum - 1];
                tasks[taskNum].selectCntEmail = cntEmails[taskNum - 1];
            }
        }
        var sTest = this.getObjSTest();
        sTest.tasks = tasks;
        this.saveTaskSTest(sTest);
    };

    this.getAllTasksCount = function () {
        var tasks = this.getSTestTasks();
        var size = 0, key;
        for (key in tasks) {
            if (tasks.hasOwnProperty(key))
                size++;
        }
        return size;
    };

    // ******************************************************* END SAVE SOME STEP **********************************************************
    // *************************************************************************************************************************************
    // *************************************************************************************************************************************
    // *************************************************************************************************************************************
    // *************************************************************************************************************************************

    this.createNewSTest = function () {
        if (confirm($('#splittest_are_you_sure_dialog').html())) {
            $.blockUI();
            $.post('/members/emailservice/split-tests/remove-attach-session', function (data) {
                $.unblockUI();
                var sTest = {};
                addTask.saveTaskSTest(sTest);
                //window.location = '/members/emailservice/split-tests/add';
                window.location = '/members/emailservice/split-tests/';
            }, 'json');
        }
        return;
    };

    this.createNewSTestButtonClick = function () {
        var getAllTasksCount = this.getAllTasksCount(); // ÐºÐ¾Ð»-Ð²Ð¾ ÑÐ¾Ð·Ð´Ð°Ð½Ñ‹Ñ… Ñ‚Ð°ÑÐºÐ¾Ð² Ð¸ Ñ‚ÐµÑ… Ñ‡Ñ‚Ð¾ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ        
        if (getAllTasksCount > 0) {
            BootstrapDialog.show({
                title: '<h4>' + $('#splittest_no_ended').text() + '</h4>',
                message: $('#splittest_isnew_dialog').html(),
                buttons: [{
                        label: $('#splittest_proceed_old_task').html(),
                        cssClass: 'btn btn-primary',
                        action: function (dialogItself) {
                            dialogItself.close();
                            window.location = '/members/emailservice/split-tests/add#0|block-step-0';
                        }
                    }, {
                        label: $('#create_new_splittest').html(),
                        cssClass: 'btn coloredlink-green',
                        action: function (dialogItself) {
                            $.post('/members/emailservice/split-tests/remove-attach-session', function (data) {
                                var sTest = {};
                                addTask.saveTaskSTest(sTest);
                                window.location = '/members/emailservice/split-tests/add#0|block-step-0';
                            }, 'json');
                        }
                    }]
            });

        } else {
            var sTest = {};
            this.saveTaskSTest(sTest);
            window.location = '/members/emailservice/split-tests/add';
        }
        return false;
    };

    this.getTaskMessageText = function () {
        return (pageEditor.isInitEditors()) ? $.trim(pageEditor.getContent()) : $.trim($('#tinymce').val());
    };

    this.createNextTask = function (options) {
        if (pageEditor.isInitEditors() === false) {
            pageEditor.init();
        }
        this.clearFields();
        var sTest = this.getObjSTest();
        var curTaskNum = sTest.currentTaskNum || 1;
        var task = {};
        options.push('messageType');
        options.push('structureBody');
        if (options && options instanceof Array) {
            for (var i = 0; i < options.length; i++) {
                task[options[i]] = this.getSomeValueCurrentTaskSTest(options[i]);
                if (options[i] == 'messageBody') {
                    task.structureBody = this.getSomeValueCurrentTaskSTest('structureBody');
                    pageEditor.setContent(this.getSomeValueCurrentTaskSTest('messageBody'));
                }
            }
        }
        curTaskNum += 1;
        if (this.saveTask(curTaskNum, task)) {
            this.changeSTest(['currentTaskNum'], curTaskNum);
            this.showSomeStepBlock('block-step-1', 3);
            /*
             $('html, body').animate({
             scrollTop: 0
             }, 'slow');
             */
            return true;
        }
        return false;
    };

    this.clearFields = function () {
        $('#task_name').val('');
        $('#sender_email_name').val('');
        $('#message_title').val('');
        $('#sender_email_name').val('');
        $('#resultBlock').html('');

        if ($("#sender_email_list").find("option[selected='selected']").length) {
            $("#sender_email_list").find("option[selected='selected']").prop('selected', 'selected');
        } else {
            $("#sender_email_list :first").prop("selected", "selected");
        }

        pageEditor.clearContent();
    };

    this.viewTextLetter = function () {
        $('#text-letter-view').hide();
        $('#html-letter-view').show();
        $.post('/members/emailservice/tasks/get-text-version/', {'text': pageEditor.getContent()}, function (responseText) {
            $('#email_template').val(pageEditor.getContent());
            pageEditor.removeEditors(responseText);
            $('#upload-img-btn').attr('disabled', true);
            $('#tinymce').css('visibility', 'visible').val(responseText);
        });
    };

    this.viewHtmlLetter = function () {
        $('#html-letter-view').hide();
        $('#text-letter-view').show();
        $('#email_template_text').html($('#tinymce').val());
        pageEditor.init();
        pageEditor.setContent($('#email_template').val());
        $('#upload-img-btn').removeAttr('disabled');
    };

    this.saveNewTask = function () {
        $.blockUI();
        if (this.setFinalSendTime()) {
            var checkPreviousCampaignsTimeout = emailService.checkPreviousCampaignsTimeout();
            if (checkPreviousCampaignsTimeout.type) {
                if ($('#external_stat').is(':checked')) {
                    var is_error = false;
                    if ($('#external_stat_campaign_name').val() == '') {
                        $('#external_stat_campaign_name').css('border', '1px solid #A94442').focus();
                        is_error = true;
                    }
                    if ($('#external_stat_medium').val() == '') {
                        $('#external_stat_medium').css('border', '1px solid #A94442').focus();
                        is_error = true;
                    }
                    if ($('#external_stat_source').val() == '') {
                        $('#external_stat_source').css('border', '1px solid #A94442').focus();
                        is_error = true;
                    }
                    if (is_error) {
                        $.unblockUI();
                        return false;
                    }
                }
                var address_book_id = $('#address_books_list').val();
                var is_address_book_has_new_address = emailService.checkIsAddressBookHasNewAddress(address_book_id);
                if (is_address_book_has_new_address) {
                    this.showActivateAddressBookDialog(address_book_id);
                } else {
                    this.realSaveNewTask();
                }
            } else {
                $.unblockUI();
                alert(checkPreviousCampaignsTimeout.message);
            }
        }
    };

    this.realSaveNewTask = function () {
        $.blockUI();
        var dataToSend = this.getCreateTaskData();
        //console.log(dataToSend); return;
        $.ajax({
            url: '/members/emailservice/tasks/savenew',
            cache: false,
            type: 'post',
            dataType: 'json',
            data: dataToSend,
            success: function (responseText) {
                if (!responseText.type) {
                    emailService.checkAddressBookWhileTaskCreate();
                    this.checkCredits();

                    if(responseText.error != null && responseText.error === 'user_can_not_make_email_task') {
                        $('#user_can_not_make_email_task').on('hidden.bs.modal', function () {
                            window.location = '/emailservice/white-label/';
                        });
                        $('#user_can_not_make_email_task').modal('show');
                    }
                }
                if (responseText.type) {
                    window.location = '/members/emailservice/tasks/view/id/' + responseText.task_id;
                }
            }
        });
    };

    this.setFinalSendTime = function () {
        if ($('#radio_time_immediately').attr('checked')) {
            $('#final_send_date_hidden').text(emailService.getTimeString(new Date()));
        } else {
            if ($.trim($('#date').val()) === '') {
                $('#date').css('border', '1px solid #A94442');
                return false;
            } else {
                $('#final_send_date_hidden').text($.trim($('#date').val()));
            }
        }
        $('#date').css('border', '1px solid #C6C6C6');
        return true;
    };

    this.getCreateTaskData = function () {

        var sMessageText = this.getTaskMessageText().replace(location.protocol + '//' + location.hostname + '/' + '{{webversion}}', '{{webversion}}');//this.getTaskMessageText();
        var dataSendFilter = esfilter.getFilterResultValuesNew();
        var filter_id = ($('#select_save_filters').length && $('#select_save_filters').val()) ? $('#select_save_filters').val() : 0;
        var dataToSend = {
            filter_id: filter_id,
            filters: dataSendFilter,
            task_name: $('#task_name').val(),
            address_book_id: $('#address_books_list').val(),
            sender_email_id: $('#sender_email_list').val(),
            sender_email_address: $('#final_sender_email_address').text(),
            sender_email_name: $('#final_sender_email_name').text(),
            task_send_date: $('#final_send_date_hidden').text(),
            message_title: $('#final_message_title').text(),
            message_body: sMessageText,
            is_text_mode: ($('#TextLetter').hasClass('subselected')) ? 1 : 0,
            unsubscribe_link_lang: $('#unsubscribe_link_lang_list').val(),
            send_immediately: $('#radio_time_immediately').is(':checked'),
            statistic: {
                check_open_email: 1,
                check_redirect_link: 1
            }
        };

        if (!$('#check_open_email').is(':checked')) {
            dataToSend.statistic.check_open_email = 0;
        }
        if (!$('#check_redirect_link').is(':checked')) {
            dataToSend.statistic.check_redirect_link = 0;
        }
        if ($('#external_stat').is(':checked')) {
            dataToSend.statistic.utm_term = $('#external_stat_campaign_term').val();
            dataToSend.statistic.utm_content = $('#external_stat_campaign_content').val();
            dataToSend.statistic.utm_campaign = $('#external_stat_campaign_name').val();
            dataToSend.statistic.utm_source = $('#external_stat_source').val();
            dataToSend.statistic.utm_medium = $('#external_stat_medium').val();
        }
        return dataToSend;
    };

    this.sendActivation = function (id, type) {
        var description_text = '';
        if (!$('#select_description_text').val()) {
            $('#select_description_text').addClass('error-ico');
            return;
        }
        if (type == 3) { // 3 - activation by admin; 2 - by email
            description_text = $.trim($('#activate_description_text').val());
            if (description_text == '') {
                alert($('#description_is_empty').text());
                return;
            }
            if (description_text.length < 40) {
                alert($('#addressbook_description_long').text());
                return;
            }
            description_text = $('#select_description_text').val() + '<br />' + $('#activate_description_text').val();
            var data_cnt = ($('#select_description_text :selected').attr('data-cnt'));
        }
        $.blockUI();
        $.ajax({
            data: {
                address_book_id: id,
                activation_description: description_text,
                type: type,
                is_spam: (data_cnt == 1 || data_cnt == 2 || data_cnt == 4)
            },
            url: '/members/emailservice/addresses/activation',
            cache: false,
            type: 'post',
            async: false,
            dataType: 'json',
            success: function (responseText) {
                $.unblockUI();
                if (responseText.type) {
                    if ($('#task-name-label').length) // split-test page
                        addTask.realFinalSaveSTest(1);
                    else if ($('#addTask_run_id').length) // split-test index page
                        addTask.realRunSTest();
                    else // task
                        addTask.realSaveNewTask();
                } else {
                    alert(responseText.message);
                    $.unblockUI();
                }
            }
        });
    };

    this.showActivateAddressBookDialog = function (id) {
        $.blockUI();
        var dataToSend = {
            address_book_id: id
        };
        $.ajax({
            url: '/members/emailservice/addressbooks/activateaddressbookemails',
            type: 'post',
            data: dataToSend,
            cache: false,
            async: false,
            success: function (responseText) {
                $.unblockUI();
                BootstrapDialog.show({
                    title: '<h4>' + $('#activation_description_header').text() + '</h4>',
                    message: responseText,
                    buttons: [{
                            label: $('#send_activation_description').html(),
                            cssClass: 'btn btn-primary',
                            action: function () {
                                addTask.sendActivation($('#address_book_id_by_activation').val(), 3);
                            }
                        }, {
                            label: $('#dialog_cancel_button').html(),
                            cssClass: 'btn btn-default',
                            action: function (dialogItself) {
                                dialogItself.close();
                            }
                        }]
                });
                /*
                 $('#activate_description_text').bind('keyup', function() {
                 textareaFitToContent(this, 500);
                 });
                 */
            }
        });
    };

    // ********************************************************* ATTACH *************************************************************
    // ******************************************************************************************************************************
    this.saveAttach = function () {
        var attBlockHtmlItems = $('#resultBlock p');
        var sTest = this.getObjSTest();
        var curTaskNum = sTest.currentTaskNum || 1;
        this.changeSTest(['currentTaskNum'], curTaskNum);
        if (attBlockHtmlItems.length) {
            var tasks = this.getSTestTasks();
            this.changeSTest(['tasks', curTaskNum, 'attachBlock'], $('#resultBlock').html());
            this.changeSTest(['tasks', curTaskNum, 'attachFiles'], {}); // Ð¾Ð±Ð½ÑƒÐ»ÐµÐ½Ð¸Ðµ
            $(attBlockHtmlItems).each(function () { // Ð½Ð¾Ð²Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ
                var realFName = $(this).attr('data-afile');
                var userFName = $(this).find('span.attFileName').html();
                addTask.changeSTest(['tasks', curTaskNum, 'attachFiles', realFName], userFName);
            });
        } else {
            this.deletePropSTest(['tasks', curTaskNum, 'attachFiles']);
            this.deletePropSTest(['tasks', curTaskNum, 'attachBlock']);
        }
    };


    this.onResponseAttach = function (data) {
        if (data) {
            var response = JSON.parse(Base64.decode(data));
            if (!response.error) {
                var addLabel = '<p data-afile="' + response.upload_file_name + '" style="float: left; margin-right: 25px;  color: #555555"><span style="position:relative;"><span class="attFileName">' + response.file_name + '</span> (' + response.file_size + ' KB)</span> \n\
                                    <span onclick="addTask.renameAttachFiles(this, \'' + response.file_name + '\')" class="sp-icon icon-edit" style="color: #A3BBCA; padding-left: 5px;"></span>                            <span onclick="addTask.removeAttachFiles(this)" class="sp-icon icon-browser-close-2" style="color: #FF5C46; padding-left: 5px;"></span></p>';
                $('#resultBlock').append(addLabel);
                $('#max_size_attach_description').hide();
            } else {
                dialogOk(response.error, '<h4>' + $('#information_modal_title').text() + '</h4>');
                $('#max_size_attach_description').show('slow');
            }
            $('#loading-file').hide();
            $('#submitbtn').attr('disabled', true);
            this.saveAttach();
            // clear file input
            document.getElementById('fileInputContainer').innerHTML = document.getElementById('fileInputContainer').innerHTML;
        }
    };

    this.removeAttachFiles = function (obj) {
        var parentBlock = $(obj).parent();
        var attachFile = $(parentBlock).attr('data-afile');

        if (attachFile && ($('#loading-file').css('display') == 'none')) {
            BootstrapDialog.show({
                message: $('#dialogRemoveAFile').html(),
                title: $('#title_inf').html(),
                cssClass: 'custom-dialog',
                buttons: [{
                        label: $('#dialog_ok_button').html(),
                        cssClass: 'btn btn-primary',
                        action: function (dialogItself) {
                            dialogItself.close();
                            $('#loading-file').show();
                            if(addTask.isOtherTasksHasAttachFile(attachFile)){
                                $(parentBlock).remove();
                                addTask.saveAttach();
                                $('#loading-file').hide();
                            } else {
                                $.post('/members/emailservice/upload/remove-attach-split-test', {
                                    afile: attachFile,
                                    curTaskNumber: addTask.getCurTaskNum()
                                }, function (response) {
                                    if (response) {
                                        $(parentBlock).remove();
                                        addTask.saveAttach();
                                    }
                                    $('#loading-file').hide();
                                });
                            }
                        }
                    },
                    {
                        label: $('#dialog_cancel_button').html(),
                        cssClass: 'btn btn-default',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
            });
        }
    };
    /**
     * @param attachFile
     * @returns {boolean}
     */
    this.isOtherTasksHasAttachFile = function (attachFile) {
        var curTaskNumber = addTask.getCurTaskNum();
        var splitTestTasks = addTask.getSTestTasks();
        for (taskNum in splitTestTasks) {
            if (taskNum == curTaskNumber) {
                continue;
            }
            if (typeof(splitTestTasks[taskNum]['attachFiles']) != "undefined") {
                for (fileName in splitTestTasks[taskNum]['attachFiles']) {
                    if (fileName === attachFile) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    this.renameAttachFiles = function (obj, sFileName) {
        var parentBlock = $(obj).parent();
        var afile = $(parentBlock).attr('data-afile');

        if (afile && ($('#loading-file').css('display') == 'none')) {
            BootstrapDialog.show({
                message: $('#dialogRenameAFile').html(),
                title: $('#title_inf').html(),
                cssClass: 'custom-dialog',
                buttons: [{
                        label: $('#dialog_ok_button').html(),
                        cssClass: 'btn btn-primary',
                        action: function (dialogItself) {
                            dialogItself.close();
                            var newName = $.trim($('div.bootstrap-dialog-message input.form-control').val());
                            if (!newName) {
                                $('#dialog input.rename-afile').addClass('error-ico');
                                return;
                            }
                            $('#loading-file').show();
                            $.post('/members/emailservice/upload/rename-attach-split-test', {
                                afile: afile,
                                newName: newName,
                                curTaskNumber: addTask.getCurTaskNum()
                            }, function (response) {

                                if (!response.result && response.error) {
                                    alert(response.error);
                                } else {
                                    if (response.file_name) {
                                        $(parentBlock).find('.attFileName').html(response.file_name);
                                        addTask.saveAttach();
                                    }
                                }
                                $('#loading-file').hide();

                            }, "json");
                        }
                    }, {
                        label: $('#dialog_cancel_button').html(),
                        cssClass: 'btn btn-default',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
            });
            var reg = /([a-z0-9\-\._]+)(\.([a-z]{1,4}))$/i;
            //var sFName = reg.exec(sFileName)[1];
            var aFileNamePart = $(obj).prev('span').find('.attFileName:visible').first().text().split('.');
            if (aFileNamePart.length > 1) {
                aFileNamePart.pop();
            }
            var sFileName = aFileNamePart.join('.');
            setTimeout(function () {
                $('div.bootstrap-dialog-message input.form-control').val(sFileName);
            }, 500);
        }
    };
    // ******************************************************************************************************************************

    this.getTaskBody = function (taskNum) {
        var tasks = this.getSTestTasks();
        if (tasks && tasks[taskNum] && tasks[taskNum].messageBody) {
            if (parseInt(tasks[taskNum].bookmarkHTML) == 1)
                return tasks[taskNum].messageBody.replace(/([^>])\n/g, '$1<br/>');
            else
                return tasks[taskNum].messageBody;
        }
        return '';
    };

    this.setIframeSrc = function (taskNum) {
        var iframe = document.getElementById("email_template_iframe_" + taskNum);
        var isLoad = $(iframe).attr('data-isload');
        $(iframe).parent().parent().toggle();
        if (!isLoad) {
            iframe.contentDocument.write(this.getTaskBody(taskNum));
            // auto height iframe
            $("#email_template_iframe_" + taskNum).css('height', 0).load($("#email_template_iframe_" + taskNum).css('height', iframe.contentDocument.documentElement.scrollHeight + 'px'));
            $(iframe).attr('data-isload', 1);
        }
    };

    this.setIframeSrcByStep1 = function (taskNum) {
        var sCurTaskBody = this.getTaskBody(taskNum);
        if (sCurTaskBody) {
            var iframe = document.getElementById("current_task_body_iframe");
            iframe.contentDocument.write(sCurTaskBody);
            // auto height iframe
            setTimeout(function () {
                var iHeight = iframe.contentDocument.documentElement.scrollHeight;
                $("#current_task_body_iframe").css('height', iHeight + 'px');
            }, 500);
        }
    };

    this.urlUpload = function () {
        if ($.trim($('#es_template_url_input').val() !== '')) {
            var dataToSend = {
                upload_url: $('#es_template_url_input').val()
            };
            $.blockUI();
            $.ajax({
                url: '/members/emailservice/templates/template-from-url-upload',
                cache: false,
                data: dataToSend,
                type: 'post',
                dataType: 'json',
                success: function (responseText) {
                    if (responseText.status) {
                        try {
                            $('#email_template').val(Base64.decode(responseText.data));
                            $('#button_goto_edit_template').removeClass('noactive');
                        } catch (e) {
                            alert(e.message);
                        }
                    }
                    $.unblockUI();
                    alert(responseText.message);
                }
            });
        } else {
            $('#es_template_url_input').css('border', '1px solid red').toggle('shake', '', 'fast').focus();
        }
    };

    this.clienSideCheckFile = function () {
        // AJAX file upload
        var maxfilesize = 5242880; // 5Mb in bytes
        var allowedFileTypes = ['html', 'htm', 'zip', 'rar', '7z'];
        //console.log( 'fileToUpload changed' );
        try {
            var iSize = $("#fileToUpload")[0].files[0].size;
        } catch (e) {
            $("#fileToUpload").val('');
            //if we have an old browser or f@cking IE then we enable additional check on server
            isServerCheckNeeded = true;
        }
        if (!isServerCheckNeeded) {
            var filename = $("#fileToUpload")[0].files[0].name.split('.');
            if (iSize > maxfilesize) {
                $("#fileToUpload").val('');
                alert($('#es_templates_allowed_file_size').text());
            } else {
                if ($.inArray(filename[filename.length - 1], allowedFileTypes) == -1) {
                    $("#fileToUpload").val('');
                    alert($('#es_templates_allowed_file_types').text() + this.allowedFileTypesToString());
                }
            }
        }
    };

    this.beforeAjaxFileUpload = function () {
        this.ajaxFileUpload();
        $('#fileToUpload').change(function () {
            addTask.clienSideCheckFile();
        });
        //$('#upload-temlate-btn').prop('disabled', 1);
    };

    this.changeLoadLinkInput = function (obj) {
        var sValue = $.trim($(obj).val());
        if (sValue !== '') {
            $('#upload-linl-button').removeAttr('disabled');
        } else {
            $('#upload-linl-button').prop('disabled', 1);
        }
    };

    this.ajaxFileUpload = function () {
        if ($("#fileToUpload").val() != '') {
            //starting setting some animation when the ajax starts and completes
            $("#loading").ajaxStart(function () {
                $(this).show();
            }).ajaxComplete(function () {
                $(this).hide();
            });

            /*
             prepareing ajax file upload
             url: the url of script file handling the uploaded files
             fileElementId: the file type of input element id and it will be the index of  $_FILES Array()
             dataType: it support json, xml
             secureuri:use secure protocol
             success: call back function when the ajax complete
             error: callback function when the ajax failed
             
             */
            $.ajaxFileUpload({
                url: '/members/emailservice/templates/ajaxfileupload',
                secureuri: false,
                fileElementId: 'fileToUpload',
                dataType: 'json',
                cache: false,
                type: 'post',
                success: function (data, status) {
                    if (typeof (data.status) != 'undefined') {
                        if (data.status) {
                            //console.log( Base64.decode( data.template_body ));                            
                            $('#email_template').val(Base64.decode(data.template_body));

                        }
                        $('#button_goto_edit_template').removeClass('noactive');
                        alert(data.message);
                    }
                },
                error: function (data, status, e) {
                    //console.log( e );
                }
            });
        }
    };

    this.placeItemsProgressBar = function (iActiveStep) {
        iActiveStep = iActiveStep || 1;
        $('#progress-bar-block').show();
        var iTopImg = 22;
        var iHalfInbarBall = 21; // Ð¿Ð¾Ð»Ð¾Ð²Ð¸Ð½Ð° ÑˆÐ¸Ñ€Ð¸Ð½Ñ‹ Ñ€Ð¸ÑÑƒÐ½ÐºÐ° ÑˆÐ°Ñ€Ð¸ÐºÐ°  
        var oPositionBar = $("#bar_wrap").position();
        var iLeftBar = parseInt(oPositionBar.left); // Ð»ÐµÐ²Ñ‹Ð¹ Ð¾Ñ‚ÑÑ‚ÑƒÐ¿
        var iHalfBarWidth = parseInt($("#bar_wrap").width()) / 2; // ÑÐµÑ€ÐµÐ´Ð¸Ð½Ð° Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑ Ð±Ð°Ñ€Ð°
        var oneThirdBarWidth = parseInt($("#bar_wrap").width()) / 3; // ÑÐµÑ€ÐµÐ´Ð¸Ð½Ð° Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑ Ð±Ð°Ñ€Ð°

        $('#step-1-active').css('left', iLeftBar - iHalfInbarBall + 'px').show();
        $('#step-2-unactive, #step-2-active').css('left', iLeftBar + oneThirdBarWidth - iHalfInbarBall + 'px').show();
        $('#step-3-unactive, #step-3-active').css('left', iLeftBar + (oneThirdBarWidth * 2) - iHalfInbarBall + 'px').show();
        $('#step-4-unactive, #step-4-active').css('left', iLeftBar + (iHalfBarWidth * 2) - iHalfInbarBall + 'px').show();
        /*var isChromium = window.chrome;
         var iTopNum = 29;
         if (isChromium) {
         iTopNum = 30;
         }*/
        $('#step-1-num').css('left', iLeftBar - 4 + 'px').show();
        $('#step-2-num').css('left', iLeftBar + oneThirdBarWidth - 5 + 'px').show();
        $('#step-3-num').css('left', iLeftBar + (oneThirdBarWidth * 2) - 5 + 'px').show();
        $('#step-4-num').css('left', iLeftBar + (iHalfBarWidth * 2) - 5 + 'px').show();
        //var iTopDescription = 74;
        var iAddWidth = 0;
        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (!is_firefox) {
            iAddWidth = 20;
        }
        $('#step-1-description').css('left', iLeftBar - 10 - (parseInt($('#step-1-description').width()) / 2) + iAddWidth + 'px').show();
        $('#step-2-description').css('left', iLeftBar - 15 + oneThirdBarWidth - (parseInt($('#step-2-description').width()) / 2) + iAddWidth + 'px').show();
        $('#step-3-description').css('left', iLeftBar - 15 + (oneThirdBarWidth * 2) - (parseInt($('#step-3-description').width()) / 2) + iAddWidth + 'px').show();
        $('#step-4-description').css('left', iLeftBar - 25 + (iHalfBarWidth * 2) - (parseInt($('#step-3-description').width()) / 2) + iAddWidth + 'px').show();
        this.setStatusItemsProgressbar(iActiveStep);
    };
    this.setStatusItemsProgressbar = function (iActiveStep, iMaxItems) {
        if (iActiveStep >= 1) {
            iMaxItems = iMaxItems || 4;
            var iPersentProgressBar = iActiveStep / iMaxItems * 100;
            $('#green-bar').css('width', iPersentProgressBar + '%');
            // numbers && description
            for (var i = iActiveStep; i >= 1; --i) {
                $('#step-' + i + '-num').css('color', '#4A750F');  // dark green
                $('#step-' + i + '-description').css('color', '#A9C792');  // light-green
            }
            for (var i = iActiveStep + 1; i <= iMaxItems; i++) {
                $('#step-' + i + '-num').css('color', '#A9A9A9'); // gray
                $('#step-' + i + '-description').css('color', '#999999');  // dark-gray
            }
            $('#step-' + iActiveStep + '-num').css('color', 'white');
            $('#step-' + iActiveStep + '-description').css('color', '#5C9C17');  // dark-green
            // balls
            $('.progeress-ball').hide();
            for (var i = iActiveStep; i >= 1; --i) {
                $('#step-' + i + '-active').show();
            }
            for (var i = iActiveStep + 1; i <= iMaxItems; i++) {
                $('#step-' + i + '-unactive').show();
            }
            var sAddLabel = '';
            var getCurTaskNum = this.getCurTaskNum();
            if (getCurTaskNum > 2) {  // Ð¾Ñ‚Ñ€Ð¸ÑÐ¾Ð²ÐºÐ° Ð¿Ð¾Ð´ Ð¿Ñ€Ð¾Ð³Ñ€ÐµÑÑÐ±Ð°Ñ€Ð¾Ð¼ Ð ÐÐ¡Ð¡Ð«Ð›ÐšÐ B/C/D....
                var iCountIterations = 65 + parseInt(getCurTaskNum);
                for (var j = 67; j < iCountIterations; j++) {// 65 - A, 66 - B, ...
                    sAddLabel += '/' + String.fromCharCode(j);
                }
            }
            $('#progressCountTasks').text(sAddLabel);
        }
        return false;
    };
    /********* Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð» Ð¿Ð¾Ð´Ð¾Ð±Ð½Ñ‹Ð¹ addTask.showStepBlock  **********/
    this.showSomeStepBlock = function (sBlockName, iCurrentStep) {
        if (document.getElementById(sBlockName)) {
            // save current step
            var sTest = this.getObjSTest();
            if (iCurrentStep) {
                sTest.currentStep = iCurrentStep;
            }
            sTest.currentShowBlock = sBlockName;
            this.saveTaskSTest(sTest);
            // init values
            this.initValueStepBlock(sTest);
            $('#prev-block').text($('.block-step:visible').first().attr('id'));
            //$('#current-block').text(sBlockName);
            $('.block-step').hide();
            $('#' + sBlockName).show();
            if (iCurrentStep) {
                //$('#current-step').text(iCurrentStep);
                this.setStatusItemsProgressbar(iCurrentStep);
            }
            if (typeof hashNavigator === "object") {
                iCurrentStep = iCurrentStep || $('#current-step').text();
                hashNavigator.setHash(iCurrentStep + '|' + sBlockName);
            }
            setCursorToTextField();
        }
    };

    this.goToPrevStep = function (iCurrentStep) {
        this.showSomeStepBlock($('#prev-block').text(), iCurrentStep);
    };

    this.goToStep_2_1 = function () { // Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´ Ðº Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ°Ð¼ Ñ€Ð°ÑÑÑ‹Ð»ÐºÐ¸
        removeErrorClass($('#block-step-0'));
        checkAndSaveCompanyVariables();

        if (checkform($('#block-step-0'))) {
            //if ($('#filrers_task_info_count_letters').hasClass('bs-callout-red') && $('#radio_send_part').is(':checked')) {
            if ($('#filrers_task_info_count_letters').hasClass('bs-callout-red')) {
                $('#filrers_task_info_count_letters').addClass('border-red');
                return false;
            }
            if (!document.getElementById('address_books_list')) {
                $('#add_addressbook').css('color', '#DB5656');
                return false;
            }
            if (this.saveStep0(true)) {
                //$('#task-name-label').text($('#task_name').val());
                var iStepToGo = this.getCurTaskNum() > 1 ? 3 : 2;
                this.showSomeStepBlock('block-step-1', iStepToGo);
            }
        }
    };

    this.goToStep_2_editor_chooce = function () {
        removeErrorClass($('#block-step-1'));
        if (this.saveStep1(true)) {
            //$('#task-name-label').text($('#task_name').val());
            this.showSomeStepBlock('block-step-2');
        }
    };

    this.goToStep_2_chooseTemplate = function (sTeplateTypeName) {
        this.showSomeStepBlock('block-step-2-choose-my-templates');
        if (document.getElementById(sTeplateTypeName + '-templates')) {
            if (sTeplateTypeName === 'my') {
                $('#system-templates').hide();
                $('#my-templates').show();
                $('#tamplate-block-label').text($('#my_tempates').text());
            } else {
                $('#my-templates').hide();
                $('#system-templates').show();
                $('#tamplate-block-label').text($('#system_tempates').text());
            }
        }
    };

    this.goToStep2UploadNewTemplates = function () {
        var sTemplateName = $.trim($('#task_name').val());
        if (sTemplateName !== '') {
            $('#template_name').val($('#template_for_label').text() + ' "' + $('#task_name').val() + '"');
        }
        this.showSomeStepBlock('block-step-2-upload-template');
    };

    this.goToStepEditTemplateByUploadPage = function (obj) {
        //addTask.goToStepEditTemplate('edit_template_label');
        if ($(obj).hasClass('noactive')) {
            return;
        }
        if (checkform($('#template_name_block'))) {
            removeErrorClass($('#template_name_block'));
            this.goToStepEditTemplate('edit_template_label');
            $('#template-name-edit-label').text($('#template_name').text());
            if ($('#block-step-2-upload-template.block-step span.label').last().hasClass('label-yellow')) {
                pageEditor.setContent($('#tempaltes-code').val());
            } else {
                pageEditor.setContent($('#email_template').val());
            }
        }
    };

    this.goToStepEditTemplate = function (sTitleEditTemplateLabel) {
        $('#template-name-edit-label').text('');
        $('#template-block-label').html($('#' + sTitleEditTemplateLabel).html());
        pageEditor.clearContent();
        setTimeout(function () {
            pageEditor.setFocus();
        }, 1000);
        this.showSomeStepBlock('block-step-2-edit-template');
    };

    this.goToStepRealEditTemplate = function ($bNoEditMode) {
        if (!$bNoEditMode) {
            $('.normal-mode').hide();
            $('.edit-mode').show();
        }
        if (addTask.getSomeValueCurrentTaskSTest('messageType') == "0" || addTask.getSomeValueCurrentTaskSTest('messageType') == "false") {
            var sTest = addTask.getObjSTest();
            pageEditor.setContent(addTask.getTaskBody(sTest.currentTaskNum));
            this.showSomeStepBlock('block-step-2-edit-template');
        } else {
            $.blockUI();
            localStorage.setItem('currentTargetCreatingTemplate', 'splittest');
            localStorage.setItem('esMessageBodyStructure', addTask.getSomeValueCurrentTaskSTest('structureBody'));
            window.location = '/emailservice/constructor/structure/layout/0/';
        }
    };

    this.showDialogCopyToNextTask = function () {
        removeErrorClass($('#block-step-1'));
        if (this.saveStep1(true) && this.saveTaskMessage()) {
            this.dialogCopyToNext();
        }
        return false;
    };

    this.dialogCopyToNext = function () {
        if (this.getSomeValueCurrentTaskSTest('attachBlock'))
            $('#attFileBox').show();
        else
            $('#attFileBox').hide();
        BootstrapDialog.show({
            title: '<h4>' + $('#splittest_copy_data_to_next_task').html() + '</h4>',
            message: $('#dialog_copy_html').html(),
            //cssClass: 'custom-dialog',
            buttons: [{
                    label: $('#buttontext_dialog_not_copy_data').html(),
                    cssClass: 'btn btn-primary',
                    action: function (dialogItself) {
                        dialogItself.close();
                        addTask.createNextTask([]);
                    }
                },
                {
                    label: $('#buttontext_dialog_copy_data_ok').html(),
                    cssClass: 'btn coloredlink-green',
                    action: function (dialogItself) {
                        dialogItself.close();
                        var res = sep = '';
                        $('.bootstrap-dialog-message input.copyCheckBox:checked:visible').each(function () {
                            res += sep + $(this).val();
                            sep = '|';
                        });
                        addTask.createNextTask(res.split('|'));
                    }
                }]
        });
    };

    this.dialogChooseCompleteTestOrCreateNextVariant = function () {
        BootstrapDialog.show({
            title: '<h4>' + $('#information').html() + '</h4>',
            message: $('#splittest_selecting_continue_or_exiit').text(),
            buttons: [{
                    label: $('#splittest_create_next_task').html(),
                    cssClass: 'btn btn-primary',
                    action: function (dialogItself) {
                        dialogItself.close();
                        addTask.showDialogCopyToNextTask();
                    }
                },
                {
                    label: $('#splittest_end_create').text(),
                    cssClass: 'btn coloredlink-green',
                    action: function (dialogItself) {
                        dialogItself.close();
                        addTask.goToLastStep2();
                    }
                }]
        });
    };

    this.goToLastStep0 = function () {
        removeErrorClass($('#block-step-0'));
        checkAndSaveCompanyVariables();
        if (this.saveStep0(true)) {
            var sTest = this.getObjSTest();
            sTest.currentStep = 4;
            sTest.currentShowBlock = 'block-step-last';
            this.saveTaskSTest(sTest);
            window.location = '/emailservice/split-tests/add#4|block-step-last';
        }
        return false;
    };

    this.goToLastStep1 = function () {
        removeErrorClass($('#block-step-1'));
        if (this.saveStep1(true)) {
            var sTest = this.getObjSTest();
            sTest.currentStep = 4;
            sTest.currentShowBlock = 'block-step-last';
            this.saveTaskSTest(sTest);
            window.location = '/emailservice/split-tests/add#4|block-step-last';
        }
        return false;
    };

    this.goToLastStep2 = function (is) {
        removeErrorClass($('#block-step-1'));
        if (this.saveTaskMessage()) {
            var sTest = this.getObjSTest();
            sTest.currentStep = 4;
            sTest.currentShowBlock = 'block-step-last';
            this.saveTaskSTest(sTest);
            window.location = '/emailservice/split-tests/add#4|block-step-last';
        }
        return false;
    };

    this.goToStep_3 = function () {
        var sMessage = this.getTaskMessageText();
        if (sMessage === '') {
            alert($('#email_template_empty').html());
            pageEditor.setFocus();
            return;
        }
        $.blockUI();
        dataToSend = {
            message_body: sMessage,
            is_text_mode: ($('#html-letter-view').is(":visible")) ? 1 : 0
        };
        $('#email_template_iframe').attr('src', "");
        $.ajax({
            url: '/members/emailservice/tasks/show-task-message-body-preview',
            cache: false,
            type: 'post',
            data: dataToSend,
            dataType: 'json',
            success: function (response) {
                if (response.type) {
                    addTask.showSomeStepBlock('block-step-3', 3);
                    var iframe = document.getElementById('email_template_iframe');
                    // ÑƒÐ±Ñ€Ð°Ñ‚ÑŒ ÑÐ»ÐµÑˆÐ¸ replace('/\0/g', '0').replace('/\(.)/g', '$1')                    
                    iframe.contentDocument.write(response.message_body.replace('/\0/g', '0').replace('/\(.)/g', '$1'));
                    setTimeout(function () {
                        window.frames[0].stop();
                    }, 2000);
                    // auto height iframe
                    //console.log(iframe.contentDocument.documentElement.scrollHeight);
                    $('#email_template_iframe').css('height', 0).load($('#email_template_iframe').css('height', iframe.contentDocument.documentElement.scrollHeight + 50 + 'px'));
                    $('#email_template_iframe_wrapper').hide();
                    $.unblockUI();
                }
            }
        });

    };

    this.changeSelectAdderessBooksList = function () {
        var address_books_id = $.trim($('#address_books_list').val());
        $('#filrers_task_info_count_letters').hide('slow');
        if (address_books_id) {
            addTask.loggerOn();
            $.ajax({
                url: '/members/emailservice/split-tests/check-select-abook',
                cache: false,
                type: 'post',
                dataType: 'json',
                data: {
                    abid: address_books_id
                },
                success: function (response) {
                    addTask.loggerOff();
                    if (response.error) {
                        $('#address_books_list').find("option").first().prop("selected", "selected");
                        dialogOk(response.error, '');
                    } else {
                        addTask.resetSegmentElement();
                        $('#address_books_list').removeClass('inp-error');
                        $('#waiting_time_to_send').prop('checked', true);
                        if ($('#is_debug_mode').text() === '1' && $('#address_books_list [value="' + address_books_id + '"]').data('cntemail') > 4) {
                            $('#filter_radio_send_block').show();
                        } else {
                            $('#filter_radio_send_block, #filter_segment_main_block').hide();
                        }
                        $('#address_book_id').val(address_books_id);
                        addTask.getAbookVariables(address_books_id);
                    }
                }
            });
        }
        if (address_books_id) {
            $('#add_addresses_into_adderess_book').show();
            $('#address_book_id').val(address_books_id);
        } else {
            $('#add_addresses_into_adderess_book').hide();
            $('#address_book_id').val(0);
        }
    };

    this.resetSegmentElement = function () {
        $('.one_variable_block').remove();
        $('#filter_option_send_all').prop('checked', true);
        $('#radio_send_part').prop('checked', false);
        $('#filter_radio_send_block').prop('checked', true);
        $('#separ-save, #separ-ok, #separ-get-code, #select_and_or_wrapper').addClass('hidden');
        $('#filter_segment_main_block').hide();
    };


    this.getAbookVariables = function (address_book_id) {
        if (address_book_id) {
            $.post('/members/emailservice/addressbooks/get-variable-address-book/', {
                id: address_book_id,
                is_debug_mode: 1
            }, function (data) {
                $('#variables_ab').html(data.all_variables);
                addTask.setHtmlSelectAbookVariables(data.abook_variables);

                $('#variables_ab').html(data.all_variables);
                initFilterAbookVariable(address_book_id, data.abook_variables_info);
                initOptionIntoSelectSaveFilters(data.filters_address_book, 1);
                resetOptionIntoSelectSaveFilters(data.filters_address_book);
                initFilterByFiltertOption();

                pageEditor.resetEditors();
            }, 'json');
            addTask.checkCredits();
        }
    };

    this.addAddessBook = function () {
        var addressbook_name = $.trim($('#add_new_addressbook_name').val());
        if (!addressbook_name) {
            $('#add_new_addressbook_name').parent().addClass('has-error');
            return false;
        }
        if (addressbook_name) {
            var dataToSend;
            dataToSend = {
                addressbook_name: $('#add_new_addressbook_name').val()
            };
            $.ajax({
                url: '/members/emailservice/addressbooks/add',
                type: 'post',
                data: dataToSend,
                cache: false,
                success: function (responseText) {
                    if (responseText) {
                        location.replace('/members/emailservice/addressbooks/upload/id/' + responseText);
                    }
                }
            });
        }
        //$('#add_addressbook_dialog').modal('hide');  
    };

    this.addSenderEmailAddress = function () {
        var sender_email = $('#new_sender_email_address').val();
        var sender_email = $.trim($('#new_sender_email_address').val());
        if (!sender_email || !validEmail(sender_email)) {
            $('#new_sender_email_address').parent().addClass('has-error');
            return false;
        }
        $('#new_sender_email_address').parent().removeClass('has-error');
        if (!$('#new_sender_email_name').val()) {
            $('#new_sender_email_name').parent().addClass('has-error');
            return false;
        }
        //$('#new_sender_email_name').parent().removeClass('has-error');
        $('#add_sender_dialog').modal('hide');
        var dataToSend = {
            sender_email_address: sender_email,
            sender_email_name: $('#new_sender_email_name').val()
        };
        $.blockUI();
        $.ajax({
            url: '/members/emailservice/senders/add',
            type: 'post',
            data: dataToSend,
            cache: false,
            dataType: 'json',
            success: function (response) {
                if (response.type) {
                    $.ajax({
                        url: '/members/emailservice/senders/sendactivationcode',
                        data: {sender_email_id: response.sender_email_id},
                        cache: false,
                        type: 'post',
                        success: function (responseText) {
                            $.unblockUI();
                            responseText = JSON.parse(responseText);
                            if (responseText.type) {
                                BootstrapDialog.show({
                                    title: '<h4>' + $('#information_modal_title').text() + '</h4>',
                                    message: '<p style="max-width: 300px;" class="dialog_message">' + responseText.message + '</p>',
                                    cssClass: 'custom-dialog',
                                    buttons: [{
                                            label: $('#dialog_ok_button').text(),
                                            cssClass: 'btn btn-primary custom-dialog',
                                            action: function (dialog) {
                                                dialog.close();
                                            }
                                        }]
                                });
                            }
                        }
                    });
                } else {
                    $.unblockUI();
                    BootstrapDialog.show({
                        title: '<h4>' + $('#information_modal_title').text() + '</h4>',
                        message: '<p style="max-width: 300px;" class="dialog_message">' + response.comment + '</p>',
                        cssClass: 'custom-dialog',
                        buttons: [{
                                label: $('#dialog_ok_button').text(),
                                cssClass: 'btn btn-primary custom-dialog',
                                action: function (dialog) {
                                    dialog.close();
                                }
                            }]
                    });
                }
            }
        });
    };

    this.allowedFileTypesToString = function () {
        var returnString = '';
        var allowedFileTypes = ['html', 'htm', 'zip', 'rar', '7z'];
        for (var i = 0; i < allowedFileTypes.length; ++i) {
            if (i != 0) {
                returnString += ', ';
            }
            returnString += allowedFileTypes[i];
        }
        return ': ' + returnString + '.';
    };


    this.isSetFile = function (obj, sButtonID) {
        if ($.trim($(obj).val()) !== '') {
            $('#' + sButtonID).removeAttr('disabled');
        }
    };
    this.checkCredits = function () {
        var dataToSend;
        var address_book_id = $('#address_books_list').val();
        if (address_book_id) {
            $('#filrers_task_info_count_letters').removeClass('border-red');
            var dataSendFilter = getFilterResultValuesNew();
            dataToSend = {
                address_book_id: address_book_id,
                filters: dataSendFilter
            };
            $.ajax({
                url: '/members/emailservice/users/checkcredits',
                type: 'post',
                cache: false,
                dataType: 'json',
                data: dataToSend,
                success: function (responseText) {
                    if (responseText.type && (parseInt(responseText.addressesDeltaFromTariff) + parseInt(responseText.addressesDeltaFromBalance)) >= 10) {
                        // if all ok
                        $('#create_new_task_button').show();
                        if ($("#run_splittest").length) {
                            $("#run_splittest").show('slow');
                        }
                        $('#filrers_task_info_count_letters').hide('blind').removeClass('bs-callout-red').addClass('bs-callout-green').html('<p>' + responseText.short_message + '</p>').show('blind');

                    } else {
                        // if we have some error
                        $('#create_new_task_button').hide();
                        $('#filrers_task_info_count_letters').hide('blind').removeClass('bs-callout-green').addClass('bs-callout-red').html('<p>' + responseText.short_message + '</p>').show('blind');
                        if (responseText.type) {
                            $('#filrers_task_info_count_letters p').html($('#filrers_task_info_count_letters p').html() + ' ' + $('#error_too_little_contact_by_filter').text());
                        }
                    }

                }
            });
        }
    };

    this.setHtmlSelectAbookVariables = function (abook_variables) {
        if (abook_variables) {
            var selectHtml = '';
            for (var i in abook_variables) {
                selectHtml += '<div>' + abook_variables[i] + '<a href="javascript: void(0)" data-val="' + abook_variables[i] + '" onclick="$(\'#message_title\').val($(\'#message_title\').val() + \' {{\' + $(this).attr(\'data-val\') +\'}}\')"> ' + $('#paste_variable').html() + '&raquo;</a> </div>';
            }
            if (selectHtml)
                selectHtml = $('#list_of_variables').html() + selectHtml;
            $('#abook_variables').html(selectHtml);
            $('#abook_variables_block').show();
        } else {
            $('#abook_variables').html('');
            $('#abook_variables_block').hide();
        }
        $('#abook_variables').hide();
    };

    this.initSlider = function (sTest) {

        var getAllTasksCount = this.getAllTasksCount(); // ÐºÐ¾Ð»-Ð²Ð¾ ÑÐ¾Ð·Ð´Ð°Ð½Ñ‹Ñ… Ñ‚Ð°ÑÐºÐ¾Ð² Ð¸ Ñ‚ÐµÑ… Ñ‡Ñ‚Ð¾ Ð² Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ

        if (getAllTasksCount > 1) {
            var resHtml = '';
            var tasks = this.getSTestTasks();
            if (tasks) {
                var taskNum = null;
                var sumSelectedPerc = 0, sumCntSelectEmails = 0, counter = 0;
                var colors = ['#FFC046', '#FF5C46', '#F28C4B', '#36AFB2', '#008BBF'];
                $('#rangeTR').html('');
                for (taskNum in tasks) {
                    if (!tasks[taskNum].selectPerc) {
                        tasks[taskNum].selectPerc = this.returnDefaultPercToOneTask(this.getAllTasksCount());
                        tasks[taskNum].selectCntEmail = Math.floor(sTest.params.aBookCntEmails / 100 * tasks[taskNum].selectPerc);
                    }
                    sumSelectedPerc += parseInt(tasks[taskNum].selectPerc);
                    sumCntSelectEmails += parseInt(tasks[taskNum].selectCntEmail);
                    resHtml += '<b>' + escapeHtml(tasks[taskNum].name) + ':</b> <span><span id="prec_task_' + counter + '" class="boldTitle percOneTask">' + tasks[taskNum].selectPerc + '%</span>(<span class="cntEmailsOneTask" id="cnt_email_task_' + counter + '">' + tasks[taskNum].selectCntEmail + '</span>)</span>, ';
                    $("#range tr:first").append('<td style="height: 15px; color: #FFF; vertical-align: middle; font-weight: bold; background-color: ' + colors[counter] + '; text-align: center" width="' + tasks[taskNum].selectPerc + '%">' + String.fromCharCode(65 + counter) + '</td>');
                    counter++;
                }
                var addResultTaskInfo = '<td style="height: 15px; color: #FFF; vertical-align: middle; font-weight: bold; background-color: #75B531; text-align: center" width="' + (100 - sumSelectedPerc) + '%">' + $('#splittest_final_task_s').html() + '</td>';
                $("#range tr:first").append(addResultTaskInfo);
                resHtml += '<b>' + $('#splittest_final_task_s').html() + ':</b> <span><span id="prec_task_' + counter + '" class="boldTitle">' + (100 - sumSelectedPerc) + '%</span>(<span id="cnt_email_task_' + counter + '">' + (parseInt(sTest.params.aBookCntEmails) - sumCntSelectEmails) + '</span>)</span>';
            }
            $('#resultTaskPanel').html(resHtml);
        }

        setTimeout(function () {
            var onSlide = function (e) {
                var columns = $(e.currentTarget).find("td");
                var ranges = [], total = 0, i, w;
                for (i = 0; i < columns.length; i++) {
                    w = columns.eq(i).width() - (i == 0 ? 1 : 0);
                    ranges.push(w);
                    total += w;
                }
                var iItogSliderParts = $('.rangeGrip').length;
                for (i = 0; i < columns.length; i++) {
                    ranges[i] = 100 * ranges[i] / total;
                    carriage = ranges[i] - w;
                    var perc = Math.round(ranges[i]);
                    if(iItogSliderParts == i && perc <= 20){
                        perc = 20;                        
                    }                    
                    $("#prec_task_" + i).html(perc + "%");
                    var selCntEm = Math.floor(sTest.params.aBookCntEmails / 100 * perc);
                    $("#cnt_email_task_" + i).html(selCntEm);
                }
                $('.cntEmailsOneTask').removeClass('error-text');
            };
            var iMinWidth = 8;
            var sTest = addTask.getObjSTest();
            // #16993
            if (sTest && typeof (sTest.params) != 'undefined' && typeof (sTest.params.aBookCntEmails) != 'undefined' && sTest.params.aBookCntEmails < 100) {
                iMinWidth = Math.ceil($('#rangeslider').width() / sTest.params.aBookCntEmails) + 10;
                //iMinWidth = 80;
            }
            var mx = 0;
            var oItogTaskPersentResult = $('#resultTaskPanel [id *= "prec_task_"]').last();
            $("#range").colResizable({
                liveDrag: true,
                draggingClass: "rangeDrag",
                gripInnerHtml: "<div class='rangeGrip'></div>",
                onDrag: function (e, i) {
                    onSlide(e);
                    var iItogSlider = $('.rangeGrip').length  - 1;
                    if (iItogSlider === i) {
                        if (mx - e.pageX > 15) { // move left
                            mx = e.pageX;
                            return true;
                        }
                        mx = e.pageX;
                        if (parseInt(oItogTaskPersentResult.text()) < 21) {                            
                            return false;
                        }
                    }
                    return true;
                },
                //onResize: onSlide,
                minWidth: iMinWidth
            });
        }, 100);
    };

    this.returnDefaultPercToOneTask = function (countAllTask) {
        var result = 20
        if (countAllTask > 3)
            result = 10;
        return result;
    };

    this.showPreviewTask = function (iTaskNum) {
        if (iTaskNum) {
            var sCurTaskBody = this.getTaskBody(parseInt(iTaskNum));
            BootstrapDialog.show({
                title: '<h4 class="modal-title">' + $('#task_msg_body_lbl').text() + '</h4>',
                message: '<div  style="width: 570px; max-height: 500px; overflow: auto;">' + sCurTaskBody + '</div>',
                //cssClass: 'custom-dialog',
                buttons: [{
                        label: $('#close_modal').html(),
                        cssClass: 'btn btn-primary',
                        action: function (dialogItself) {
                            dialogItself.close();
                        }
                    }]
            });
            return true;
        }
        return false;
    };

    this.showPreviewCurentTask = function () {
        var iCurTaskNum = this.getCurTaskNum();
        if (iCurTaskNum) {
            this.showPreviewTask(iCurTaskNum);
        }
    };

    this.editItem = function (item) {
        item = parseInt(item);
        this.saveStep2();
        this.clearFields();
        this.changeSTest(['editMode'], 1);
        if (item) { // Ñ€Ð°ÑÑÑ‹Ð»ÐºÐ¸
            this.changeSTest(['currentTaskNum'], item);
        } else {
        } // Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ ÑÐ¿Ð»Ð¸Ñ‚-Ñ‚ÐµÑÑ‚Ð°  

        this.showSomeStepBlock('block-step-1', (item > 1) ? 3 : 2);
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
    };
    this.editMainInfo = function () {
        this.saveStep2();
        this.clearFields();
        this.changeSTest(['editMode'], 1);
        this.showSomeStepBlock('block-step-0', 1);
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
    };
    /******************************************************************************************************/
    this.finalSaveSTest = function (isrun) {
        if (checkform($('#external_stat_wrapper'))) {
            if (parseInt($('#resultTaskPanel').find('.boldTitle').last().html()) < 20) {
                showAlert($('#splittest_limit_emails').html());
                return;
            }
            var bIsError = false;
            $('.cntEmailsOneTask').each(function () {
                var iCountEmails = parseInt($(this).text());
                if (iCountEmails === 0) {
                    $(this).addClass('error-text');
                    bIsError = true;
                }
            });
            if (bIsError) {
                $('html, body').animate({scrollTop: 0}, 'slow');
                return false;
            }
            $.blockUI();
            this.saveStep2();
            if (isrun) { // Ð·Ð°Ð¿ÑƒÑÐº
                var sTest = this.getObjSTest();
                var count_task_email = (document.getElementById('count-task-emails')) ? $('#count-task-emails').text() : false;
                var is_address_book_has_new_address = emailService.checkIsAddressBookHasNewAddress(sTest.params.aBookID);
                var user_confirmed = emailService.checkIsUserConfirmed();
                if (user_confirmed) {
                    if (count_task_email > 20 && is_address_book_has_new_address) {
                        this.showActivateAddressBookDialog(sTest.params.aBookID);
                    } else {
                        this.realFinalSaveSTest(isrun);
                    }
                } else {
                    $.unblockUI();
                    dialogOk($('#confirm_error_message').html(), $('#error_title').html());
                    $('#confirm_account_block').show();
                    $(window).scrollTop(0);
                }
            } else { // ÑÐ¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ
                this.realFinalSaveSTest(isrun);
            }
        }
    };

    this.realFinalSaveSTest = function (isrun) {
        $.blockUI();
        var sTest = this.getObjSTest();
        var dopParams = {
            unsubscribe_link_lang: $('#unsubscribe_link_lang_list').val(),
            statistic: {
                check_open_email: 1,
                check_redirect_link: 1
            }
        };
        if ($('#external_stat').is(':checked')) {
            dopParams.statistic.utm_term = $('#external_stat_campaign_term').val();
            dopParams.statistic.utm_content = $('#external_stat_campaign_content').val();
            dopParams.statistic.utm_campaign = $('#external_stat_campaign_name').val();
            dopParams.statistic.utm_source = $('#external_stat_source').val();
            dopParams.statistic.utm_medium = $('#external_stat_medium').val();
        }
        sTest.dopParams = dopParams;
        sTest.invited_user_id = $.trim($('#invited_user_id').text());
        var dataToSend = {
            isrun: isrun,
            stestdata: sTest
        };
        this.sendAjaxRequestSaveSTest(dataToSend);
    };

    this.runSTest = function (splittest_id) {
        if ($('#confirm_account_block').length && !$('#confirm_account_block').hasClass('confirmationsucessed')) {
            dialogOk($('#confirm_error_message').html(), $('#error_title').html());
            $('#confirm_account_block').show();
            $(window).scrollTop(0);
            return;
        }

        this.loggerOn();
        $('#addTask_run_id').html(splittest_id);
        function func() {
            var sTest = addTask.getObjFromTable(splittest_id);
            if (sTest) {
                sTest.splittest_id = splittest_id;
                var dataToSend = {
                    address_book_id: sTest.params.aBookID,
                    filters: (sTest.params.filters) ? sTest.params.filters : 0
                };
                $.ajax({
                    url: '/members/emailservice/users/checkcredits',
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    data: dataToSend,
                    async: false,
                    success: function (responseText) {
                        $.unblockUI();

                        BootstrapDialog.show({
                            title: '<h4>' + $('#splittest_run_button_label').text() + '</h4>',
                            message: responseText.message,
                            buttons: [{
                                    label: 'Ok',
                                    cssClass: 'btn coloredlink-green',
                                    action: function (dialogItself) {
                                        dialogItself.close();
                                        var is_address_book_has_new_address = emailService.checkIsAddressBookHasNewAddress(sTest.params.aBookID);
                                        if (is_address_book_has_new_address) {
                                            addTask.showActivateAddressBookDialog(sTest.params.aBookID);
                                        } else {
                                            addTask.realRunSTest();
                                        }
                                    }
                                },
                                {
                                    label: $('#cancel_dialog_button').html(),
                                    cssClass: 'btn btn-primary',
                                    action: function (dialogItself) {
                                        dialogItself.close();
                                    }
                                }]
                        });
                        $('[data-toggle="tooltip"]').tooltip();
                        if (responseText.type) {
                            // if all ok
                        } else {
                            // if we have some error
                            delete buttons.ok;
                        }
                    }
                });
            }
        }
        setTimeout(func, 100); // Ñ‚Ð°Ðº Ð½Ð°Ð´Ð¾, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ð¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ "Ð—Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÑ‚ÑÑ, Ð¾Ð¶Ð¸Ð´Ð°Ð¹Ñ‚Ðµ"
    };

    this.realRunSTest = function () {
        var splittest_id = parseInt($('#addTask_run_id').html());
        var sTest = addTask.getObjFromTable(splittest_id);
        if (sTest) {
            sTest.splittest_id = splittest_id;
            sTest.invited_user_id = $.trim($('#invited_user_id').text());
            var dataToSend = {
                isrun: 1,
                stestdata: sTest
            };
            $.blockUI();
            addTask.sendAjaxRequestSaveSTest(dataToSend);
        }
    };

    this.sendAjaxRequestSaveSTest = function (dataToSend) {
        $.ajax({
            url: '/members/emailservice/split-tests/save-new',
            cache: false,
            type: 'post',
            dataType: 'json',
            data: dataToSend,
            success: function (responseText) {
                $.unblockUI();
                if (responseText.error) {
                    if(responseText.error === 'user_can_not_make_email_task') {
                        $('#user_can_not_make_email_task').on('hidden.bs.modal', function () {
                            window.location = '/emailservice/white-label/';
                        });
                        $('#user_can_not_make_email_task').modal('show');
                    } else {
                        dialogOk(responseText.message, $('#error_title').html());
                        if (responseText.confirmation_error != null && responseText.confirmation_error == 1) {
                            $('#confirm_account_block').show();
                            $(window).scrollTop(0);
                        }
                    }
                } else {
                    var sTest = {};
                    addTask.saveTaskSTest(sTest);
                    window.location = '/members/emailservice/split-tests/';
                }
            }
        });
    };

    this.getObjFromTable = function (splittest_id) {
        if (splittest_id) {
            var res = {};
            $.ajax({
                url: '/members/emailservice/split-tests/get-obj-from-table/',
                data: {
                    splittest_id: splittest_id
                },
                type: 'post',
                cache: false,
                async: false,
                dataType: 'json',
                success: function (data) {
                    res = data;
                }
            });
        }
        return res;
    };

    this.setFinalInfoAddressBookName = function () {
        if ($('#radio_send_part ').is(':checked')) {
            var aAbook = $('#address_books_list option:selected').text().split('[');
            var sAbookName = aAbook[0];
            var sResultHtml = '<a target="_blank" href="/emailservice/addressbooks/emails/id/' + $('#address_books_list').val() + '">' + sAbookName + '</a><br/>';
            var iCountAddresses = $('#count-task-emails').text();
            if (iCountAddresses) {
                sResultHtml += $('#segment_resipt').text() + ' ' + iCountAddresses + ' <small>(' + $('#segment_list').text() + ')</small>';
                sResultHtml += getFinalInfoHtmlSegmentationBlock();
            }
            $('#final_addressbook_name').html(sResultHtml);
        } else {
            $('#final_addressbook_name').html('<a target="_blank" href="/emailservice/addressbooks/emails/id/' + $('#address_books_list').val() + '">' + $('#address_books_list option:selected').text() + '</a>');
        }
    };

    this.deleteSTest = function (iStestID, sStestName) {
        if (iStestID) {
            BootstrapDialog.show({
                title: '<h4>' + $('#dialog_information').text() + '</h4>',
                message: $('#splittest_delete').html().replace('%split_test_name%', sStestName),
                buttons: [{
                    label: $('#dialog_delete').html(),
                    cssClass: 'btn btn-primary',
                    action: function (dialogItself) {
                        $.ajax({
                            url: '/members/emailservice/split-tests/delete-split-test/',
                            data: {
                                split_test_id: iStestID
                            },
                            type: 'post',
                            cache: false,
                            async: false,
                            dataType: 'json',
                            success: function (data) {
                                if(data['result']) {
                                    location.reload();
                                }
                            }
                        });
                        dialogItself.close();
                    }
                }, {
                    label: $('#dialog_cancel_button').html(),
                    cssClass: 'btn btn-default',
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }],
            });

        }
    }
}
;
addTask = new AddTask();

setInterval(function(){
    if(parseInt($('#resultTaskPanel [id *= "prec_task_"]').last().text()) <= 20){
        if(!$('.tooltip.fade').length){
            $('#range td').last().attr('data-original-title', $('#splittest_rezerv_email_task').text() + ' 20%').attr('trigger', 'manual').tooltip('show');
        }
    } else {
        if($('.tooltip.fade').length){
            $('#range td').attr('data-original-title', '').last().tooltip('hide');
        }
    }
}, 500);

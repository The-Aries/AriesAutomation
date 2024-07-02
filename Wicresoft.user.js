// ==UserScript==
// @name         AriesAutomation
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/The-Aries/AriesAutomation/blob/main/Wicresoft.meta.js
// @downloadURL  https://raw.githubusercontent.com/The-Aries/AriesAutomation/blob/main/Wicresoft.user.js
// @description  该脚本用于自动刷新页面以跳过验证窗口和数学题，自动提交课程评价
// @author       Aries
// @match        *://v4.21tb.com/els/html/courseStudyItem/courseStudyItem.learn.do?courseId=*
// @match        *://v4.21tb.com/els/html/studyCourse/studyCourse.enterCourse.do?courseId=*
// @grant        none
// ==/UserScript==
// 创建日期：2024年6月30日
// 最后更新日期：2024年7月2日 test
(function() {
    'use strict';
/***********************视频页面*******************************
************************视频页面******************************
************************视频页面*****************************
************************视频页面******************************
************************视频页面*******************************/
    if (window.location.href.includes('courseStudyItem'))
    {
        console.log("检测到视频页面，执行自动播放业务");
        nextStep();
        refreshPage();
    }
/***********************评价页面*******************************
************************评价页面******************************
************************评价页面*****************************
************************评价页面******************************
************************评价页面*******************************/
    if (window.location.href.includes('studyCourse'))
    {
        console.log("检测到评价页面，执行自动评分业务");
        rateCourse();
        // 使用 setTimeout 函数延迟1秒执行 rateCourse
        //setTimeout(rateCourse, 1000);
    }
})();

/***********************自定义函数*******************************
************************自定义函数******************************
************************自定义函数*****************************
************************自定义函数******************************
************************自定义函数*******************************/

// 刷新页面
function refreshPage()
{
        // 设置刷新间隔时间，单位为毫秒
        const refreshInterval = 185 * 1000; // 每 185秒 刷新一次

        // 自动刷新页面
        setInterval(() => {
            window.location.reload();
            console.log("页面已刷新");
        }, refreshInterval);
}

// 评分业务
function rateCourse()
{
    rateOperation();
    surveyOperation();
    submitOperation();
}

// 评分操作
function rateOperation()
{
    // 选择值为5的radio按钮
    const ratingSelector = 'input[type="radio"][value="5"]';
    const ratingButtons = document.querySelectorAll(ratingSelector);
    // 如果找到评分为5分的选项，则点击
    if (ratingButtons.length > 0) {
        ratingButtons.forEach(button => {
            button.click();
            console.log("已选择非常满意选项");
            // 打印每个按钮的状态
            console.log("Radio button value:", button.value, "Checked:", button.checked);
        });
    } else {
        console.log("未找到非常满意选项");
    }
}

// 问卷操作
function surveyOperation()
{
    // 定义四个按钮的ID
    const buttonIds = [
        '4ffacebaac4b422b8f0cfa4708ac7435_5',
        '5ea9cc82bc1940789cb72ab772ebd1c2_5',
        'f91d7621ffde475bb30741ccc1dc8784_5',
        '21640c84e4bc4cddb9bec40097a892be_5'
    ];

    // 遍历所有按钮ID并模拟点击操作
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.checked = true; // 如果是radio类型的按钮，使用checked属性来选中
            //setTimeout(console.log(`已选择按钮 ${id}`),250)
            console.log(`已选择按钮 ${id}`);
        } else {
            console.log(`未找到按钮 ${id}`);
        }
    });
}

// 提交操作
function submitOperation()
{
    // 自动提交表单
    const submitButtonId = 'courseEvaluateSubmit';
    const submitButton = document.getElementById(submitButtonId);
    if (submitButton) {
        submitButton.click();
        console.log("点击提交按钮");
    } else {
        console.log("未找到提交按钮");
    }

    setTimeout(() => {
        const confirmButton = document.querySelector('.layui-layer-btn1');
        if (confirmButton) {
            confirmButton.click();
            console.log('点击确认按钮');
        } else {
            console.log('未找到确认按钮');
        }
    }, 500); // 延时0.5秒
}

//进入下一步
function nextStep()
{
    // 等待页面完全加载
    window.addEventListener('load', () => 
    {
        // 找到 '进入下一步' 的元素
        const nextStepButton = document.getElementById('goNextStep');
        
        if (nextStepButton) 
        {
            // 去除 hidden class
            //nextStepButton.classList.remove('hide');
            //console.log("hidden class 已移除");
            if (!nextStepButton.classList.contains('hide')) 
            {
                // 模拟点击
                console.log("按钮已显示，点击进入下一步");
                nextStepButton.click();
            } 
            else{console.log("按钮当前隐藏，等待显示");} 
        } 
        else{console.log("'进入下一步' 按钮未找到");}
    });
}

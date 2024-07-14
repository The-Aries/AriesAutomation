// ==UserScript==
// @name WicresoftRate
// @namespace http://tampermonkey.net/
// @version 1.00
// @updateURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @downloadURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @description 该脚本用于提交课程评价
// @author Aries
// @match *://v4.21tb.com/els/html/studyCourse/studyCourse.enterCourse.do?courseId=*
// @grant none
// ==/UserScript==
( window.onload = function ()
{
    "use strict";
    /***********************评价页面*******************************
    ************************评价页面******************************
    ************************评价页面*****************************
    ************************评价页面******************************
    ************************评价页面*******************************/
    if ( window.location.href.includes( 'willGoStep=COURSE_EVALUATE' ) )
    {
        // 课程评价页面的代码
        console.log( "检测到评价页面，执行自动评分业务" );
        rateCourse();
    }
} )();

/***********************自定义函数*******************************
************************自定义函数******************************
************************自定义函数*****************************
************************自定义函数******************************
************************自定义函数*******************************/

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
    const ratingButtons = document.querySelectorAll( ratingSelector );
    // 如果找到评分为5分的选项，则点击
    if ( ratingButtons.length > 0 )
    {
        ratingButtons.forEach( ( button ) =>
        {
            button.click();
            console.log( "已选择非常满意选项" );
            // 打印每个按钮的状态
            console.log(
                "Radio button value:",
                button.value,
                "Checked:",
                button.checked
            );
        } );
    } //else { console.log( "未找到非常满意选项" ); }
}

// 问卷操作
function surveyOperation()
{
    // 定义四个按钮的ID
    const buttonIds =
        [
            "4ffacebaac4b422b8f0cfa4708ac7435_5",
            "5ea9cc82bc1940789cb72ab772ebd1c2_5",
            "f91d7621ffde475bb30741ccc1dc8784_5",
            "21640c84e4bc4cddb9bec40097a892be_5",
        ];

    // 遍历所有按钮ID并模拟点击操作
    buttonIds.forEach( ( id ) =>
    {
        const button = document.getElementById( id );
        if ( button )
        {
            button.checked = true; // 如果是radio类型的按钮，使用checked属性来选中
            //setTimeout(console.log(`已选择按钮 ${id}`),250)
            console.log( `已选择按钮 ${id}` );
        } //else { console.log( `未找到按钮 ${id}` ); }
    } );
}

// 提交操作
function submitOperation()
{
    // 自动提交表单
    const submitButtonId = "courseEvaluateSubmit";
    const submitButton = document.getElementById( submitButtonId );
    if ( submitButton )
    {
        submitButton.click();
        console.log( "点击提交按钮" );
    } //else { console.log( "未找到提交按钮" ); }

    setTimeout( () =>
    {
        const confirmButton = document.querySelector( ".layui-layer-btn1" );
        if ( confirmButton )
        {
            confirmButton.click();
            console.log( "点击确认按钮" );
        } else { console.log( "未找到确认按钮" ); }
    }, 500 ); // 延时0.5秒
}

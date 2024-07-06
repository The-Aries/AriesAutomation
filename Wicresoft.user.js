// ==UserScript==
// @name         AriesAutomation
// @namespace    http://tampermonkey.net/
// @version      0.92
// @updateURL    https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @downloadURL  https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @description  该脚本用于自动刷新页面以跳过验证窗口和数学题，自动提交课程评价
// @author       Aries
// @match        *://v4.21tb.com/els/html/course/course.courseInfo.do?courseId=*
// @match        *://v4.21tb.com/els/html/courseStudyItem/courseStudyItem.learn.do?courseId=*
// @match        *://v4.21tb.com/els/html/studyCourse/studyCourse.enterCourse.do?courseId=*
// @grant        none
// ==/UserScript==
// 创建日期：2024年6月30日
// 最后更新日期：2024年7月6日
(window.onload = function () 
{'use strict';
/***********************预览页面*******************************
************************预览页面******************************
************************预览页面*****************************
************************预览页面******************************
************************预览页面*******************************/
    if (window.location.href.includes('courseInfo')) {
        console.log("检测到预览页面，自动进入课程");
        goIntoClass();
    }    
/***********************视频页面*******************************
************************视频页面******************************
************************视频页面*****************************
************************视频页面******************************
************************视频页面*******************************/
    if (window.location.href.includes('courseStudyItem')) {
        console.log("检测到视频页面，执行自动播放业务");
        nextStep();
        nextChapter();
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
    }
}
)();

/***********************自定义函数*******************************
************************自定义函数******************************
************************自定义函数*****************************
************************自定义函数******************************
************************自定义函数*******************************/
// 进入课程
function goIntoClass() {
    // 获取进入课程按钮
    const enterButton = document.getElementById('goStudyBtn') || document.getElementById('chooseCourse');
    if (enterButton) {
        console.log("找到进入课程按钮");
        enterButton.click();
    } else {console.log("未找到进入课程按钮");}
}

// 刷新页面
function refreshPage() {
    // 每 185秒刷新一次页面
    setInterval(() => {
        window.location.reload();
        console.log("页面已刷新");
    }, 185 * 1000);
}

// 评分业务
function rateCourse() {
    rateOperation();
    surveyOperation();
    submitOperation();
}

// 评分操作
function rateOperation() {
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
function surveyOperation() {
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
function submitOperation() {
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

function nextStep() {
    // 定义一个函数来处理按钮点击
    function handleButtonClick() {
        const nextStepButton = document.getElementById('goNextStep');
        if (nextStepButton) {
            console.log("找到'进入下一步'按钮");
            if (!nextStepButton.classList.contains('hide')) {
                console.log("按钮已显示，点击进入下一步");
                nextStepButton.click();
                observer.disconnect(); // 成功点击后停止观察
            } else {
                console.log("按钮未显示");
            }
        } else {
            console.log("未找到'进入下一步'按钮");
        }
        return false; // 表示未处理
    }

    // 初次检查按钮状态
    handleButtonClick();

    // 创建 MutationObserver 观察 DOM 变化
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                handleButtonClick();
            }
        });
    });
    // 限制观察范围为按钮的父元素
    const targetNode = document.getElementById('goNextStep')?.parentNode || document.body;
    console.log("document.getElementById('goNextStep')?.parentNode-- " + document.getElementById('goNextStep')?.parentNode);
    // 配置观察器
    const config = {
        childList: true,
        attributes: true,
        subtree: true
    };
    // 观察目标节点的变化
    observer.observe(targetNode, config);
}

/*
//进入下一步
function nextStep() {

    // 找到 '进入下一步' 的元素
    const nextStepButton = document.getElementById('goNextStep');

    if (nextStepButton) {
        if (!nextStepButton.classList.contains('hide')) {
            console.log("按钮已显示，点击进入下一步");
            nextStepButton.click();
        } 
    } else {
        console.log("'进入下一步' 按钮未找到");
    }
}
*/

// 进入下一节
function nextChapter() {
    console.log("寻找视频框架");
    var iframe = document.getElementById('aliPlayerFrame');
    if (iframe) {
        console.log("找到视频框架");
        if (iframe.contentDocument) {
            console.log("视频框架加载完毕");
            // 获取 iframe 的内容文档
            var iframeDocument = iframe.contentDocument;


            // 创建 MutationObserver 监听视频元素出现
            var videoObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList') {
                        // 获取 video 元素  
                        var video = iframeDocument.querySelector('video');

                        if (video) {
                            console.log("找到视频元素");

                            // 监听视频的 playing 事件，确保在视频开始播放时设置2倍速
                            video.addEventListener('playing', function () {
                                if (video.playbackRate !== 2.0) {
                                    video.playbackRate = 2.0;
                                    console.log("设置视频为2倍速");
                                }
                            });

                            // 如果视频已经在播放状态，则直接设置2倍速
                            if (!video.paused && !video.ended && video.readyState > 2) {
                                video.playbackRate = 2.0;
                                console.log("视频已经在播放，设置2倍速");
                            }

                            // 停止观察
                            videoObserver.disconnect();
                        }
                    }
                });
            });
            // 监听整个 iframe 文档
            videoObserver.observe(iframeDocument.body, {
                childList: true,
                subtree: true
            });

            // 创建 MutationObserver 监听按钮出现
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList') {
                        var button = iframeDocument.querySelector('.next-button');
                        if (button && !button.clicked) {
                            console.log("找到下一节按钮");
                            button.clicked = true; // 防止重复点击
                            button.click();
                            console.log("点击下一节按钮");
                        }
                    }
                });
            });

            // 监听整个 iframe 文档
            observer.observe(iframeDocument.body, {
                childList: true,
                subtree: true
            });
        }
    } else {
        console.log("未找到视频框架");
    }
}

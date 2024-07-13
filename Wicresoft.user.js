// ==UserScript==
// @name AriesAutomation
// @namespace http://tampermonkey.net/
// @version 0.94
// @updateURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @downloadURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @description 该脚本可自动课前评测，自动过视频防作弊验证，自动提交课程评价
// @author Aries
// @match *://v4.21tb.com/els/html/course/course.courseInfo.do?courseId=*
// @match *://v4.21tb.com/els/html/courseStudyItem/courseStudyItem.learn.do?courseId=*
// @match *://v4.21tb.com/els/html/studyCourse/studyCourse.enterCourse.do?courseId=*
// @grant none
// ==/UserScript==
// 创建日期：2024年6月30日
// 最后更新日期：2024年7月13日
(window.onload = function ()
{
    "use strict";
    /***********************预览页面*******************************
    ************************预览页面******************************
    ************************预览页面*****************************
    ************************预览页面******************************
    ************************预览页面*******************************/
    if (window.location.href.includes("courseInfo"))
    {
        console.log("检测到预览页面，自动进入课程");
        goIntoClass();
    }
    /***********************测试页面*******************************
    ************************测试页面******************************
    ************************测试页面*****************************
    ************************测试页面******************************
    ************************测试页面*******************************/
    if (window.location.href.includes('studyType=STUDY'))
    {
        // 课前测试页面的代码
        console.log("检测到课前测试页面，执行自动答题业务");
        autoQuizCource();
    }
    /***********************视频页面*******************************
    ************************视频页面******************************
    ************************视频页面*****************************
    ************************视频页面******************************
    ************************视频页面*******************************/
    if (window.location.href.includes("courseStudyItem"))
    {
        console.log("检测到视频页面，执行自动播放业务");
        autoPlayCourse();
    }

    /***********************评价页面*******************************
    ************************评价页面******************************
    ************************评价页面*****************************
    ************************评价页面******************************
    ************************评价页面*******************************/
    if (window.location.href.includes('willGoStep=COURSE_EVALUATE'))
    {
        // 课程评价页面的代码
        console.log("检测到评价页面，执行自动评分业务");
        rateCourse();
    }
    // if (window.location.href.includes("studyCourse"))
    // {
    //     console.log("检测到评价页面，执行自动评分业务");
    //     rateCourse();
    // }
})();

/***********************自定义函数*******************************
************************自定义函数******************************
************************自定义函数*****************************
************************自定义函数******************************
************************自定义函数*******************************/
// 进入课程
function goIntoClass()
{
    // 获取进入课程按钮
    const enterButton =
        document.getElementById("goStudyBtn") ||
        document.getElementById("chooseCourse");
    if (enterButton)
    {
        console.log("找到进入课程按钮");
        enterButton.click();
    } else
    {
        console.log("未找到进入课程按钮");
    }
}

// 刷新页面
function refreshPage()
{
    // window.location.reload();
    // console.log("页面已刷新");
    // 每 185秒刷新一次页面
    setInterval(() =>
    {
        window.location.reload();
        console.log("页面已刷新");
    }, 185 * 1000);
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
    if (ratingButtons.length > 0)
    {
        ratingButtons.forEach((button) =>
        {
            button.click();
            console.log("已选择非常满意选项");
            // 打印每个按钮的状态
            console.log(
                "Radio button value:",
                button.value,
                "Checked:",
                button.checked
            );
        });
    } else
    {
        console.log("未找到非常满意选项");
    }
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
    buttonIds.forEach((id) =>
    {
        const button = document.getElementById(id);
        if (button)
        {
            button.checked = true; // 如果是radio类型的按钮，使用checked属性来选中
            //setTimeout(console.log(`已选择按钮 ${id}`),250)
            console.log(`已选择按钮 ${id}`);
        } else { console.log(`未找到按钮 ${id}`); }
    });
}

// 提交操作
function submitOperation()
{
    // 自动提交表单
    const submitButtonId = "courseEvaluateSubmit";
    const submitButton = document.getElementById(submitButtonId);
    if (submitButton)
    {
        submitButton.click();
        console.log("点击提交按钮");
    } else { console.log("未找到提交按钮"); }

    setTimeout(() =>
    {
        const confirmButton = document.querySelector(".layui-layer-btn1");
        if (confirmButton)
        {
            confirmButton.click();
            console.log("点击确认按钮");
        } else { console.log("未找到确认按钮"); }
    }, 500); // 延时0.5秒
}

function nextStep()
{
    // 定义一个函数来处理按钮点击
    function handleButtonClick()
    {
        const nextStepButton = document.getElementById("goNextStep");
        if (nextStepButton)
        {
            //console.log("找到'进入下一步'按钮");
            if (!nextStepButton.classList.contains("hide"))
            {
                console.log("按钮已显示，点击进入下一步");
                nextStepButton.click();
                nextButtonObserver.disconnect(); // 成功点击后停止观察
            } //else { console.log("按钮未显示"); }
        } else
        {
            console.log("未找到'进入下一步'按钮");
        }
        return false; // 表示未处理
    }

    // 初次检查按钮状态
    handleButtonClick();

    // 创建 MutationObserver 观察 DOM 变化
    const nextButtonObserver = new MutationObserver((mutations) =>
    {
        mutations.forEach((mutation) =>
        {
            if (mutation.type === "childList" || mutation.type === "attributes")
            { handleButtonClick(); }
        });
    });
    // 限制观察范围为按钮的父元素
    const targetNode = document.getElementById("goNextStep")?.parentNode || document.body;
    //console.log("document.getElementById('goNextStep')?.parentNode-- " + document.getElementById("goNextStep")?.parentNode);
    // 配置观察器
    const config = {
        childList: true,
        attributes: true,
        subtree: true,
    };
    // 观察目标节点的变化
    nextButtonObserver.observe(targetNode, config);
}

// 自动播放业务
function autoPlayCourse()
{
    nextStep();
    var iframe = getAliPlayerFrame();
    var iframeDocument = iframe.contentDocument;

    // 监听视频元素并设置播放速度
    setVideoPlaybackRate(iframeDocument);

    if (iframe.id === "aliPlayerFrame")
    {
        // 自动播放下一章节
        autoClickNextChapter(iframeDocument);
    }
    //refreshPage();
}

// 检测aliPlayerFrame
function getAliPlayerFrame()
{
    // 检查两个可能的 iframe ID
    var iframe = document.getElementById("aliPlayerFrame") || document.getElementById("iframe_aliplayer");
    if (iframe)
    {
        console.log("找到 " + iframe.id);
        return iframe;
    } else { console.log("未找到 aliPlayerFrame 或 iframe_aliplayer"); }
}

// 设置视频播放速度为2倍速
function setVideoPlaybackRate(iframeDocument)
{
    var isVideoPlaying = false; // 记录视频是否正在播放的状态
    var videoObserver = new MutationObserver(function (mutations)
    {
        mutations.forEach(function (mutation)
        {
            var video = iframeDocument.querySelector("video");
            if (mutation.type === "childList" && video)
            {
                //设置二倍速
                video.addEventListener("playing", function ()
                {
                    if (video.playbackRate !== 2.0)
                    {
                        console.log("找到视频元素");
                        video.playbackRate = 2.0;
                        console.log("设置视频为2倍速");
                        isVideoPlaying = true; // 视频正在播放
                    }
                });

                // 添加监听暂停事件的逻辑
                video.addEventListener("pause", function ()
                {
                    if (isVideoPlaying)
                    {
                        // 仅当视频从播放状态转为暂停状态时刷新页面
                        console.log("视频已暂停，刷新页面");
                        location.reload();
                    }
                    isVideoPlaying = false; // 更新视频状态为暂停
                });
            }// else { console.log("未找到视频元素"); }
        });
    });

    videoObserver.observe(iframeDocument.body, {
        childList: true,
        subtree: true,
    });
}

// 监听下一节按钮并自动点击
function autoClickNextButton(iframeDocument)
{
    setVideoPlaybackRate(iframeDocument);
    var nextButtonObserver = new MutationObserver(function (mutations)
    {
        mutations.forEach(function (mutation)
        {
            if (mutation.type === "childList")
            {
                var button = iframeDocument.querySelector(".next-button");
                if (button && !button.clicked)
                {
                    console.log("找到下一节按钮");
                    button.clicked = true; // 防止重复点击
                    button.click();
                    console.log("点击下一节按钮");
                }
            }
        });
    });

    nextButtonObserver.observe(iframeDocument.body, {
        childList: true,
        subtree: true,
    });
}

function autoClickNextChapter(iframeDocument)
{
    setVideoPlaybackRate(iframeDocument);

    var chapterObserver = new MutationObserver(function (mutations)
    {
        mutations.forEach(function (mutation)
        {
            if (mutation.type === "attributes" && mutation.attributeName === "class")
            {
                autoPlayNextChapter(iframeDocument);
            }
        });
    });

    chapterObserver.observe(iframeDocument.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
    });

    autoPlayNextChapter(iframeDocument); // Initial call to handle cases where the chapter is already active
}

function autoPlayNextChapter(iframeDocument)
{
    // 获取所有章节的section-item
    const sections = iframeDocument.querySelectorAll('.section-item');
    // console.log('一共有' + sections.length + '个章节');

    // 迭代所有章节，找到当前正在播放且已完成的章节
    for (let i = 0; i < sections.length; i++)
    {
        const section = sections[i];
        const firstLine = section.querySelector('.first-line');

        if (firstLine && firstLine.classList.contains('active') && section.classList.contains('finish'))
        {
            console.log('找到当前播放且已完成的章节:', section);

            // 查找未播放的章节
            for (let j = 0; j < sections.length; j++)
            {
                const nextSection = sections[j];
                const nextFirstLine = nextSection.querySelector('.first-line');

                if (nextFirstLine && !nextFirstLine.classList.contains('active') && !nextSection.classList.contains('finish'))
                {
                    console.log('找到下一个未播放的章节:', nextSection);
                    nextFirstLine.click(); // 点击未播放的章节
                    return; // 结束函数
                }
            }
        }
    }
}
function autoQuizCource()
{
    // 选择值为5的radio按钮
    const ratingSelector = 'input[type="radio"]';
    const ratingButtons = document.querySelectorAll(ratingSelector);
    ratingButtons.forEach((button) =>
    {
        button.click();
        // 打印每个按钮的状态
        console.log(
            "Radio button value:",
            button.value,
            "Checked:",
            button.checked
        );
    });

    var submitButton = document.querySelector('.cs-submit-btn.cs-next-btn');
    submitButton.click();

    setTimeout(() =>
    {
        const confirmButton = document.querySelector(".layui-layer-btn1");
        if (confirmButton)
        {
            confirmButton.click();
            console.log("点击进入下一步按钮");
        } else { console.log("未找到进入下一步按钮"); }
    }, 500); // 延时0.5秒
}

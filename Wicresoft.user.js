// ==UserScript==
// @name Wicresoft
// @namespace http://tampermonkey.net/
// @version 0.96
// @updateURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @downloadURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @description 该脚本用于自动播放打开的视频课程直到结束
// @author Aries
// @match *://v4.21tb.com/rtr-frontend/student/allTask?showDisplayStyle=Card&showStyleLength=*
// @match *://v4.21tb.com/els/html/course/course.courseInfo.do?courseId=*
// @match *://v4.21tb.com/els/html/courseStudyItem/courseStudyItem.learn.do?courseId=*
// @match *://v4.21tb.com/els/html/studyCourse/studyCourse.enterCourse.do?courseId=*
// @grant none
// ==/UserScript==
( function ()
{
    "use strict";
    window.addEventListener( 'load', main );
    console.log( "所有资源加载完成，开始执行主逻辑" );
    /***********************自定义函数*******************************
    ************************自定义函数******************************
    ************************自定义函数*****************************
    ************************自定义函数******************************
    ************************自定义函数*******************************/
    function main()
    {
        /***********************选课页面*******************************
            ************************选课页面******************************
            ************************选课页面*****************************
            ************************选课页面******************************
            ************************选课页面*******************************/
        if ( window.location.href.includes( "rtr-frontend" ) )
        {
            // 自动选课
            console.log( "检测到选课页面，执行自动选课业务" );
            setTimeout( nextCourse, 5000 );
        }
        /***********************预览页面*******************************
        ************************预览页面******************************
        ************************预览页面*****************************
        ************************预览页面******************************
        ************************预览页面*******************************/
        if ( window.location.href.includes( "courseInfo" ) )
        {
            console.log( "检测到预览页面，自动进入课程" );
            goIntoClass();
        }
        /***********************视频页面*******************************
        ************************视频页面******************************
        ************************视频页面*****************************
        ************************视频页面******************************
        ************************视频页面*******************************/
        if ( window.location.href.includes( "courseStudyItem" ) )
        {
            console.log( "检测到视频页面，执行自动播放业务" );
            setTimeout( autoPlayCourse, 1000 );
        }
        /***********************测试页面/评价页面*******************************
        ************************测试页面/评价页面******************************
        ************************测试页面/评价页面*****************************
        ************************测试页面/评价页面******************************
        ************************测试页面/评价页面*******************************/
        if ( window.location.href.includes( 'studyCourse' ) )
        {
            var title = document.querySelector( 'h3.cs-test-title' );
            var titleText = title ? title.textContent : "";
            console.log( "当前页面标题为：" + titleText );
            if ( titleText !== "课程评估" )
            {
                // 课前测试页面的代码
                console.log( "检测到课前测试页面，执行自动答题业务" );
                autoQuizCource();
            } else
            {
                // 课程评估页面的代码
                console.log( "检测到课程评估页面，已取消课程评估功能，需要启用WicresoftRate脚本" );
                rateCourse();
                window.location.href = "https://v4.21tb.com/rtr-frontend/student/allTask?showDisplayStyle=Card&showStyleLength=2";
            }
        }
    }


    // 进入课程
    function goIntoClass()
    {
        // 获取进入课程按钮
        const enterButton =
            document.getElementById( "goStudyBtn" ) ||
            document.getElementById( "chooseCourse" );
        if ( enterButton )
        {
            console.log( "找到进入课程按钮" );
            enterButton.click();
        } else
        {
            console.log( "未找到进入课程按钮" );
        }
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
        } else
        {
            console.log( "未找到非常满意选项" );
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
        buttonIds.forEach( ( id ) =>
        {
            const button = document.getElementById( id );
            if ( button )
            {
                button.checked = true; // 如果是radio类型的按钮，使用checked属性来选中
                //setTimeout(console.log(`已选择按钮 ${id}`),250)
                console.log( `已选择按钮 ${id}` );
            } else { console.log( `未找到按钮 ${id}` ); }
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
        } else { console.log( "未找到提交按钮" ); }

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

    function nextStep()
    {

        function nextOperation()
        {
            const nextStepButton = document.getElementById( "goNextStep" );
            if ( nextStepButton )
            {
                //console.log("找到'进入下一步'按钮");
                if ( !nextStepButton.classList.contains( "hide" ) )
                {
                    console.log( "按钮已显示，点击进入下一步" );
                    nextStepButton.click();
                    nextButtonObserver.disconnect(); // 成功点击后停止观察
                } //else { console.log("按钮未显示"); }
            } //else { console.log("未找到'进入下一步'按钮"); }
            return false; // 表示未处理
        }

        // 初次检查按钮状态
        nextOperation();

        // 创建 MutationObserver 观察 DOM 变化
        const nextButtonObserver = new MutationObserver( ( mutations ) =>
        {
            mutations.forEach( ( mutation ) =>
            {
                if ( mutation.type === "childList" || mutation.type === "attributes" )
                { nextOperation(); }
            } );
        } );
        // 限制观察范围为按钮的父元素
        const targetNode = document.getElementById( "goNextStep" )?.parentNode || document.body;

        // 配置观察器
        const config = {
            childList: true,
            attributes: true,
            subtree: true,
        };
        // 观察目标节点的变化
        nextButtonObserver.observe( targetNode, config );
    }

    // 自动播放业务
    function autoPlayCourse()
    {
        // 进入下一步
        nextStep();

        // 检测aliPlayerFrame
        var iframe = document.getElementById( "aliPlayerFrame" ) || document.getElementById( "iframe_aliplayer" );
        console.log( iframe ? "找到 " + iframe.id : "未找到 aliPlayerFrame 或 iframe_aliplayer" );

        // 监听视频元素并设置播放速度
        setVideoPlaybackRate( iframe );

        // 自动播放下一章节
        autoClickNextChapter( iframe );

        // 自动过作弊
        autoPassCheat( iframe );

        setInterval( window.location.reload, 30 * 60 * 1000 )
    }

    // 设置视频播放速度为2倍速
    function setVideoPlaybackRate( iframe )
    {
        var videoObserver = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                var video = iframe.contentDocument.querySelector( "video" );
                if ( mutation.type === "childList" && video )
                {
                    //设置二倍速
                    video.addEventListener( "playing", function ()
                    {
                        if ( video.playbackRate !== 2.0 && iframe.id === "aliPlayerFrame" )
                        {
                            console.log( "找到视频元素" );
                            video.playbackRate = 2.0;
                            console.log( "设置视频为2倍速" );
                        }
                    } );
                }
            } );
        } );

        videoObserver.observe( iframe.contentDocument.body, {
            childList: true,
            subtree: true,
        } );


    }

    function autoClickNextChapter( iframe )
    {
        setVideoPlaybackRate( iframe );

        var chapterObserver = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                autoPlayNextChapter( iframe );
                console.log( "检测到章节变化" );
            } );
        } );

        chapterObserver.observe( iframe.id === 'aliPlayerFrame' ? iframe.contentDocument.querySelector( '.chapter-container' ) : document.getElementById( 'courseItemId' ),
            { childList: true, subtree: true, attributes: true, characterData: true } );

        autoPlayNextChapter( iframe );
    }

    function autoPlayNextChapter( iframe )
    {

        // 获取所有章节的section-item或cl-catalog-item-sub
        let sections = iframe.id === 'aliPlayerFrame' ? iframe.contentDocument.querySelectorAll( '.section-item' ) : document.querySelectorAll( '.cl-catalog-item-sub' );

        // console.log( '一共有' + sections.length + '个章节' );

        // 迭代所有章节，找到当前正在播放且已完成的章节
        for ( let i = 0; i < sections.length; i++ )
        {
            const section = sections[i];
            const Chapter = section.querySelector( '.first-line' ) || section.querySelector( '.cl-catalog-link' );

            if ( ( Chapter.classList.contains( 'active' ) && section.classList.contains( 'finish' ) ) || ( Chapter.classList.contains( 'cl-catalog-playing' ) && Chapter.classList.contains( 'item-done' ) ) )
            {
                console.log( '找到当前播放且已完成的章节:', section );

                // 查找未播放的章节
                for ( let j = 0; j < sections.length; j++ )
                {
                    const nextSection = sections[j];
                    const nextChapter = nextSection.querySelector( '.first-line' ) || nextSection.querySelector( '.cl-catalog-link' );

                    if ( ( !nextSection.classList.contains( 'finish' ) ) && ( !nextChapter.classList.contains( 'item-done' ) ) )
                    {
                        console.log( '找到下一个未播放的章节:', nextSection );
                        nextChapter.click(); // 点击未播放的章节
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
        const ratingButtons = document.querySelectorAll( ratingSelector );
        ratingButtons.forEach( ( button ) =>
        {
            button.click();
            // 打印每个按钮的状态
            console.log(
                "Radio button value:",
                button.value,
                "Checked:",
                button.checked
            );
        } );

        var submitButton = document.querySelector( '.cs-submit-btn.cs-next-btn' );
        submitButton.click();

        setTimeout( () =>
        {
            const confirmButton = document.querySelector( ".layui-layer-btn1" );
            if ( confirmButton )
            {
                confirmButton.click();
                console.log( "点击进入下一步按钮" );
            } else { console.log( "未找到进入下一步按钮" ); }
        }, 500 ); // 延时0.5秒
    }

    function autoPassCheat( iframe )
    {
        // 创建一个 MutationObserver 实例来观察 DOM 变化
        var observer = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                // 检查所有新增的节点
                mutation.addedNodes.forEach( function ( node )
                {
                    // 判断是否是元素节点，并且包含指定的文本内容
                    if ( node.nodeType === Node.ELEMENT_NODE && node.textContent.includes( '系统提示' ) )
                    {
                        console.log( '检测到防作弊，刷新网页' );
                        window.location.reload(); // 刷新网页
                    }
                } );
            } );
        } );
        // 配置观察选项
        var config = { childList: true, subtree: true };
        // 开始观察整个文档
        observer.observe( iframe.id === "aliPlayerFrame" ? iframe.contentDocument.body : document.body, config );
    }
    function nextCourse()
    {// 获取所有的li元素

        const listItems = document.querySelectorAll( 'li.task-list-module-item' );

        // 遍历每个li元素
        for ( let i = 0; i < listItems.length; i++ )
        {
            const item = listItems[i];
            const progressElement = item.querySelector( '.status-wrap .status-item i' );

            // 检查进度是否不为100%
            if ( progressElement )
            {
                const progress = progressElement.textContent.replace( '%', '' );
                if ( parseInt( progress ) < 100 )
                {
                    // 点击该课程
                    item.click();
                    break;
                }
            }
        }
    }
} )();
// "use strict";

// window.addEventListener( 'load', main );
// console.log( "所有资源加载完成，开始执行主逻辑" );

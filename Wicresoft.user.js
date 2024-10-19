// ==UserScript==
// @name Wicresoft
// @namespace http://tampermonkey.net/
// @version 0.971
// @updateURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @downloadURL https://raw.githubusercontent.com/The-Aries/AriesAutomation/main/Wicresoft.user.js
// @description 该脚本用于自动播放打开的视频课程直到结束
// @author Aries
// @match *://v4.21tb.com/rtr-frontend/student/allTask?showDisplayStyle=Card&showStyleLength=*
// @match *://v4.21tb.com/els/html/course/course.courseInfo.do?courseId=*
// @match *://v4.21tb.com/els/html/courseStudyItem/courseStudyItem.learn.do?courseId=*
// @match *://v4.21tb.com/els/html/studyCourse/studyCourse*
// @grant none
// ==/UserScript==
( function ()
{
    "use strict";
    var iframe;
    var iframeDoc;
    var video;
    var dummyButton;

    window.dispatchEvent( new MouseEvent( 'click', { clientX: 130, clientY: 700, bubbles: true } ) );

    console.log( "所有资源加载完成，开始执行主逻辑" );
    // main();
    window.addEventListener( 'load', main );
    /***********************自定义函数*******************************
    ************************自定义函数******************************
    ************************自定义函数*******************************/
    function main()
    {

        /***********************选课页面*******************************
        ************************选课页面******************************
        ************************选课页面*******************************/
        if ( window.location.href.includes( "rtr-frontend" ) )
        {
            // 自动选课
            setTimeout( nextCourse, 5000 );
            console.log( "检测到选课页面，5秒后执行自动选课业务" );
        }
        /***********************预览页面*******************************
        ************************预览页面******************************
        ************************预览页面*******************************/
        if ( window.location.href.includes( "courseInfo" ) )
        {
            setTimeout( goIntoClass, 500 );
            console.log( "检测到预览页面，1秒后自动进入课程" );
        }
        /***********************视频页面*******************************
        ************************视频页面******************************
        ************************视频页面*******************************/
        if ( window.location.href.includes( "courseStudyItem" ) )
        {
            setTimeout( autoPlayCourse, 1500 );
            console.log( "检测到视频页面，1.5秒后执行自动播放业务" );
        }
        /***********************测试页面/评价页面*******************************
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
                autoQuizCource();
                console.log( "检测到课前测试页面，执行自动答题业务" );
            } else
            {
                // 课程评估页面的代码
                rateCourse();
                console.log( "检测到课程评估页面,执行自动评估业务" );
                setTimeout( function ()
                {
                    window.location.href = "https://v4.21tb.com/rtr-frontend/student/allTask?showDisplayStyle=Card&showStyleLength=2";
                }, 2000 );
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

    ////////////////////////////////////////////
    function checkSameOrigin( iframe )
    {
        // 获取当前页面的 URL 组件
        let currentOrigin = window.location.origin;

        // 获取 iframe 的 URL 组件
        let iframeSrc = iframe.src;
        let iframeOrigin;

        // 尝试解析 iframe 的源
        try
        {
            iframeOrigin = new URL( iframeSrc ).origin;
        } catch ( e )
        {
            console.log( "无法解析 iframe 的 URL:", e );
            return false;
        }

        // 比较两个源
        return currentOrigin === iframeOrigin;
    }

    /////////////////////////////////////////////////

    // 自动播放业务
    function autoPlayCourse()
    {
        // 进入下一步

        nextStep();

        iframe = document.getElementById( "aliPlayerFrame" ) || document.getElementById( "iframe_aliplayer" ) || document.getElementById( "urlCourseIframeId" );

        // 检测aliPlayerFrame
        console.log( iframe ? "找到 " + iframe.id : "未找到Iframe" );

        if ( iframe.id === "urlCourseIframeId" ) setInterval( () => { console.log( '刷新页面...' ); window.location.reload(); }, 200 * 1000 );

        iframeDoc = iframe.contentDocument;
        if ( iframe.id === "aliPlayerFrame" ) videoOperator(); // 设置视频播放速度为2倍速

        autoPassCheat();// 自动过作弊

        autoClickNextChapter();// 自动播放下一章节

    }

    // 设置视频播放速度为2倍速
    function videoOperator()
    {
        videoOperation();

        var videoObserver = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                console.log( "1秒后操作视频" );
                setTimeout( videoOperation, 1000 );
            } );
        } );

        videoObserver.observe( iframeDoc.querySelector( '.chapter-container' ), { childList: true, subtree: true, attributes: true } );
    }

    function videoOperation()
    {
        video = iframeDoc.querySelector( "video" );

        if ( !video ) console.log( "未找到视频元素" );// 检查是否找到视频元素
        video.muted = true; // 设置视频为静音

        video.playbackRate = 2.0; //设置二倍速播放

        video.addEventListener( 'pause', function ()
        {
            video.play();//播放视频
        } );
    }


    function autoClickNextChapter()
    {

        var chapterObserver = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                autoPlayNextChapter();
                console.log( '章节发生变化' );
            } );
        } );

        chapterObserver.observe( iframe.id === 'aliPlayerFrame' ? iframeDoc.querySelector( '.chapter-container' ) : document.getElementById( 'courseItemId' ),
            { childList: true, subtree: true, attributes: true } );

        autoPlayNextChapter();
    }

    function autoPlayNextChapter()
    {
        if ( iframe.id === "iframe_aliplayer" )
        {
            video = iframeDoc.querySelector( "video" );
            if ( !video )
            {
                console.log( "未找到视频元素" ); // 检查是否找到视频元素
            } else
            {
                video.muted = true;

                const intervalId = setInterval( () =>
                {
                    // 导致逻辑混乱的部分
                    // video.play().then( () =>
                    // {
                    //     console.log( "视频正在播放" );
                    // } ).catch( error =>
                    // {
                    //     console.error( "播放失败:", error );
                    // } );


                    if ( video && !video.paused )
                    {
                        clearInterval( intervalId ); // 视频已播放，清除定时器
                        console.log( "视频已播放，退出操作。" );
                        return;
                    }

                    console.log( "检测到iframe_aliplayer且" + video + "video.paused == " + video.paused );
                    simulateClick( 28, 508, iframe );

                }, 1000 ); // 每1秒执行一次

                console.log( "自动点击" + video + "播放按钮" );
            }
        }

        // 获取所有章节的section-item或cl-catalog-item-sub
        let sections = iframe.id === 'aliPlayerFrame' ? iframeDoc.querySelectorAll( '.section-item' ) : document.querySelectorAll( '.cl-catalog-item-sub' );

        // console.log( '一共有' + sections.length + '个章节' );

        // 迭代所有章节，找到当前正在播放且已完成的章节
        for ( let i = 0; i < sections.length; i++ )
        {
            const section = sections[i];
            const Chapter = section.querySelector( '.first-line' ) || section.querySelector( '.cl-catalog-link' );

            if ( ( Chapter.classList.contains( 'active' ) && section.classList.contains( 'finish' ) ) || ( Chapter.classList.contains( 'cl-catalog-playing' ) && Chapter.classList.contains( 'item-done' ) ) )
            {

                // 查找未播放的章节
                for ( let j = 0; j < sections.length; j++ )
                {
                    const nextSection = sections[j];
                    const nextChapter = nextSection.querySelector( '.first-line' ) || nextSection.querySelector( '.cl-catalog-link' );

                    if ( ( !nextSection.classList.contains( 'finish' ) ) && ( !nextChapter.classList.contains( 'item-done' ) ) )
                    {
                        console.log( '找到当前播放且已完成的章节:', section );
                        console.log( '找到下一个未播放的章节:', nextSection );
                        nextChapter.click(); // 点击未播放的章节
                        break; // 结束函数
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

    function autoPassCheat()
    {
        console.log( '开启反防作弊...' );

        // 创建一个 MutationObserver 实例来观察 DOM 变化
        var observer = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                console.log( 'new mutation ' + mutation.type + '  ' + mutation );
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
        observer.observe( iframe.id === "aliPlayerFrame" ? iframeDoc.body : document.body, config );

    }
    function nextCourse()
    {// 获取所有的li元素

        const listItems = document.querySelectorAll( 'li.task-list-module-item' );
        var flag = 0;

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
                    flag = flag + 1;
                    if ( flag > 6 )
                    {
                        // 点击该课程
                        item.click();
                        break;
                    }
                }
            }
        }
    }

    // 模拟点击函数
    function simulateClick( x, y, iframe )
    {
        // 创建鼠标事件
        const clickEvent = new MouseEvent( 'click', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            view: window
        } );

        const mouseDownEvent = new MouseEvent( 'mousedown', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            view: window
        } );

        const mouseUpEvent = new MouseEvent( 'mouseup', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            view: window
        } );

        const playButton = iframe.contentDocument.querySelector( '.prism-play-btn' );
        console.log( playButton );
        playButton.click();

        // 确保 iframe 存在并且可以访问
        if ( iframe && iframe.contentDocument )
        {
            // 在 iframe 内部添加事件监听器
            function handleClickDetails( event )
            {
                console.log( "点击事件的详细信息:", {
                    type: event.type,
                    bubbles: event.bubbles,
                    cancelable: event.cancelable,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    target: event.target
                } );
            }

            // 添加点击事件监听器
            iframe.contentDocument.addEventListener( 'click', handleClickDetails, { once: true } );

            // 模拟三次点击
            for ( let i = 0; i < 1; i++ )
            {
                // 触发 mouse down 和 mouse up 事件
                iframe.contentDocument.dispatchEvent( mouseDownEvent );
                iframe.contentDocument.dispatchEvent( mouseUpEvent );
                iframe.contentDocument.dispatchEvent( clickEvent );
                console.log( `模拟点击 ${i + 1}` );
            }
        } else
        {
            console.error( "无法访问 iframe" );
        }
    }

} )();

/*
// 在页面加载后执行
document.addEventListener('mousemove', function(event) {
    // 获取鼠标的 X 和 Y 坐标
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 在控制台中输出坐标
    console.log(`X: ${mouseX}, Y: ${mouseY}`);
    
    // 如果你想在页面中显示，可以在HTML中指定一个元素进行展示
    const mousePositionElement = document.getElementById('mousePosition');
    if (mousePositionElement) {
        mousePositionElement.innerText = `X: ${mouseX}, Y: ${mouseY}`;
    }
});


*/

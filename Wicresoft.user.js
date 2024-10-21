// ==UserScript==
// @name Wicresoft
// @namespace http://tampermonkey.net/
// @version 0.975
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
    var intervalId;
    var playButton;
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
        // 初次检查按钮状态
        nextOperation();
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
        InitOp();
        decisionMaking();
        autoPassCheat();// 自动过作弊
        autoClickNextChapter();// 自动播放下一章节
    }

    function InitOp()
    {
        iframe = document.getElementById( "aliPlayerFrame" ) || document.getElementById( "iframe_aliplayer" ) || document.getElementById( "urlCourseIframeId" );

        // 检测aliPlayerFrame
        iframe ? ( iframeDoc = iframe.contentDocument ) : ( window.location.reload() );

        ( video = iframeDoc.querySelector( "video" ) ) ? ( video.muted = true ) : ( window.location.reload() );
        // console.log( iframeDoc.body );
    }

    function decisionMaking()
    {
        switch ( iframe.id )
        {
            case "urlCourseIframeId":
                setInterval( () => { console.log( '刷新页面...' ); window.location.reload(); }, 200 * 1000 );
                break;

            case "aliPlayerFrame":
                videoOperator(); // 设置视频播放速度为2倍速
                break;

            case "iframe_aliplayer":
                intervalId = setInterval( () =>
                {
                    if ( !video.paused )
                    {
                        clearInterval( intervalId ); // 视频已播放，清除定时器
                        console.log( "视频已播放，退出操作。" );
                        return;
                    }
                    console.log( "检测到" + video + " video.paused == " + video.paused );
                    iframe.contentDocument.querySelector( '.prism-play-btn' ).click();
                }, 1000 ); // 每1秒执行一次
                break;

            default:
                window.location.reload();
        }
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
        video.playbackRate = 2.0; //设置二倍速播放

        video.addEventListener( 'pause', function ()
        {
            video.play();//播放视频
        } );
    }

    function autoClickNextChapter()
    {
        autoPlayNextChapter();

        var chapterObserver = new MutationObserver( function ( mutations )
        {
            mutations.forEach( function ( mutation )
            {
                /*
                if ( mutation.type === 'attributes' && mutation.attributeName === 'class' )
                {
                    var target = mutation.target;

                    if ( ( target.className.includes( 'active' ) || target.className.includes( 'playing' ) ) || ( target.classList.contains( 'finish' ) || target.classList.contains( 'item-done' ) ) )
                    {
                        var oldClassList = mutation.oldValue ? mutation.oldValue.split( ' ' ) : [];
                        var newClassList = target.classList;

                        // 找出新添加的类
                        var addedClasses = Array.from( newClassList ).filter( cls => !oldClassList.includes( cls ) );
                        if ( addedClasses.length > 0 )
                        {
                            console.log( 'Element:', target );
                            console.log( 'oldClassList:', oldClassList );
                            console.log( 'ElenewClassListment:', newClassList );
                            console.log( 'Added classes:', addedClasses );
                        }
                    }

                }*/
                if ( mutation.type === 'attributes' && mutation.attributeName === 'class' )
                {
                    const target = mutation.target;
                    if ( target.className.includes( 'active' ) || target.className.includes( 'playing' ) )
                    {
                        //console.warn( '章节状态发生变化' );
                        // 如果章节已经播放完毕，则播放下一个章节
                        if ( target.classList.contains( 'finish' ) || target.classList.contains( 'item-done' ) )
                        {
                            autoPlayNextChapter();
                            console.warn( '章节发生变化' );
                            setTimeout( InitOp, 2000 );
                            return;
                        }
                        //console.warn( '章节未发生变化' );
                    }
                }
            } );
        } );

        chapterObserver.observe( document.getElementById( 'courseItemId' ),
            { childList: true, subtree: true, attributes: true } );
    }

    function autoPlayNextChapter()
    {
        // 获取所有章节的section-item或cl-catalog-item-sub
        let sections = Array.from( iframe.id === 'aliPlayerFrame' ? iframeDoc.querySelectorAll( '.section-item' ) : document.querySelectorAll( '.cl-catalog-link-sub' ) );

        // 直接选中当前正在播放的章节
        const currentChapter = iframeDoc.querySelector( '.active' ) || document.querySelector( '.cl-catalog-playing' );

        if ( !( currentChapter.classList.contains( 'finish' ) || currentChapter.classList.contains( 'item-done' ) ) ) return;

        // 获取当前章节在章节列表中的位置
        const currentChapterIndex = sections.indexOf( currentChapter );

        // 从当前章节开始，找到第一个未播放的章节
        for ( let i = 0; i < sections.length; i++ ) 
        {
            const index = ( currentChapterIndex + i ) % sections.length;
            const section = sections[index];
            // console.log( section.classList );
            // console.log( section.classList.contains( 'item-done' ) );
            // 如果我们找到了一个未播放的章节
            if ( !section.classList.contains( 'item-done' ) && !section.classList.contains( 'finish' ) )
            {
                console.log( '找到下一个未播放的章节:', section );
                section.click(); // 点击未播放的章节
                break;
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

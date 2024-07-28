// ==UserScript==
// @name         chooseCourse
// @namespace    http://tampermonkey.net/
// @version      2024-07-26
// @description  try to take over the world!
// @author       You
// @match        https://v4.21tb.com/els/html/index.parser.do?id=NEW_COURSE_CENTER*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

( function ()
{
    'use strict';

    console.log( "所有资源加载完成，开始执行主逻辑" );
    window.addEventListener( 'load', main );
    async function main()
    {
        await setFilter( "课程评估" );

        await setFilter( "未选课程" );

        await chooseCourse();
    }

    function setFilter( condition )
    {
        return new Promise( ( resolve ) =>
        {
            console.log( `Setting filter: ${condition}` );

            var filterLink = document.querySelectorAll( "label.filter-link" );
            if ( filterLink )
            {
                filterLink.forEach( function ( link )
                {
                    if ( link.textContent.includes( condition ) )
                    {
                        link.click();
                        console.log( "click " + link.textContent );
                    }
                }
                );
            }

            // 确保点击生效
            //setTimeout( () => { resolve(); }, 2000 );
            const observer = new MutationObserver( ( mutations ) =>
            {
                resolve();
                observer.disconnect();
            } );
            observer.observe( document.body, { childList: true, subtree: true } );

        } );
    }

    async function chooseCourse()
    {
        var courseBody = document.querySelector( "ul.nc-course-list" );

        if ( courseBody )
        {
            var courses = courseBody.querySelectorAll( 'a' ); // 假设课程项是 <a> 元素
            console.log( "courses.length: " + courses.length );

            for ( let course of courses )
            {
                await handleCourse( course );
            }
            window.location.reload();
        }
    }

    function handleCourse( course )
    {
        return new Promise( ( resolve ) =>
        {
            // 创建一个新窗口的引用
            let newWindow;

            // 覆盖 window.open 方法以捕获新窗口
            const originalOpen = window.open;
            window.open = function ( url, name, specs )
            {
                newWindow = originalOpen( url, name, specs );
                return newWindow;
            };

            // 模拟点击课程
            course.click();

            // 恢复 window.open 方法
            window.open = originalOpen;

            // 继续下一个课程
            const checkWindowLoaded = setInterval( () =>
            {
                if ( newWindow && newWindow.document.readyState === 'complete' )
                {
                    clearInterval( checkWindowLoaded );
                    setTimeout( () =>
                    {
                        newWindow.close();
                        resolve();
                    }, 3500 );
                }
            }, 500 );
        } );
    }
} )();

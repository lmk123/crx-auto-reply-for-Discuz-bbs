if ( needReply() ) {
    var KEY = 'msgs' , link_login;
    if ( isLogin() ) {
        chrome.storage.local.get( KEY , function ( i ) {
            var msgs = i[ KEY ];
            if ( msgs && msgs.length ) {
                reply( randomInArray( msgs ) );
            } else {
                reply( getPrompt() );
            }
        } );
    } else {
        link_login = document.querySelector( '#fastposteditor>.tedt>.area>.pt>a.xi2:first-child' );
        if ( link_login ) {
            if ( confirm( '你需要登录后才能自动回帖。是否登录？' ) ) {
                link_login.click();
            }
        } else {
            alert( '你需要登录后才能自动回帖。' );
        }
    }
}

/**
 * 自动回复当前帖子
 * @param {string} msg
 */
function reply( msg ) {
    if ( !msg ) {
        return;
    }

    var doc = document ,
        input_message = doc.getElementById( 'fastpostmessage' ) ,
        btn_submit = doc.getElementById( 'fastpostsubmit' ) ,
        ckb_goToLastPage = doc.getElementById( 'fastpostrefresh' );

    input_message.value = msg;
    ckb_goToLastPage.checked = false;
    btn_submit.click();
}

/**
 * 随机生成一个 小于 end 但大于等于 start 的整数
 * @param {number} end
 * @param {number=} start 默认为 0
 * @returns {number}
 */
function random( end , start ) {
    if ( undefined === start ) {
        start = 0;
    }
    if ( end < start ) {
        throw new Error( 'end 参数必须大于 start 参数！' );
    }
    return Math.floor( Math.random() * (end - start) + start );
}

/**
 * 随机返回数组中的一个项
 * @param {Array} arr
 * @returns {*}
 */
function randomInArray( arr ) {
    return arr[ random( arr.length ) ];
}

/**
 * 判断当前网页是否存在回复可见内容
 * @returns {boolean}
 */
function needReply() {
    var r = /<script\s+[^>]*>replyreload.*<\/script>/.test( document.documentElement.innerHTML );
    needReply = function () {
        return r;
    };
    return r;
}

/**
 * 获取用户的输入内容
 * @returns {boolean|string} 如果用户点了取消、或者输入的是空白，则返回 false，否则返回用户输入的文本
 */
function getPrompt() {
    var input_msg = prompt( '你没有设置预定义消息，需要手动输入回帖内容：' , '谢谢楼主发的好帖子~' ) ,
        r = false;
    if ( 'string' === typeof input_msg ) {
        input_msg = input_msg.trim();
        if ( input_msg ) {
            r = input_msg;
        }
    }
    return r;
}

function isLogin() {
    var r = !!document.getElementById( 'fastpostmessage' );
    isLogin = function () {
        return r;
    };
    return r;
}

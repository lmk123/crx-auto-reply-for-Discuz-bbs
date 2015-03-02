(function ( doc ) {
    var KEY = 'msgs' ,
        btn_add = doc.getElementById( 'add' ) ,
        msg_list = doc.getElementById( 'msg-list' ) ,
        span_saved = doc.getElementById( 'saved' );

    chrome.storage.local.get( KEY , function ( i ) {
        var msgs = i[ KEY ];
        if ( !( msgs && msgs.length) ) {
            msgs = [];
        }
        renderMsgList();

        btn_add.addEventListener( 'click' , function () {
            var msg = getPrompt();
            if ( msg ) {
                addMsg( msg );
            }
        } );

        msg_list.addEventListener( 'click' , function ( e ) {
            var t = e.target;
            if ( 'LI' === t.nodeName && !t.classList.contains( 'empty' ) ) {
                if ( confirm( '是否删除这条消息？' ) ) {
                    delMsg( t.textContent );
                }
            }
        } );

        /**
         * 添加预定义消息
         * @param {string} msg
         */
        function addMsg( msg ) {
            msgs.push( msg );
            renderMsgList();
            saveMsgs();
        }

        function delMsg( msg ) {
            var index = msgs.indexOf( msg );
            if ( index >= 0 ) {
                msgs.splice( index , 1 );
                renderMsgList();
                saveMsgs();
            }
        }

        /**
         * 渲染回复内容列表
         * @returns {string}
         */
        function renderMsgList() {
            var h = '';
            if ( msgs.length ) {
                msgs.forEach( function ( msg ) {
                    h += '<li>' + msg + '</li>';
                } );
            } else {
                h = '<li class="empty">没有定义任何消息，检测到隐藏帖时将弹出评论输入框。</li>';
            }
            msg_list.innerHTML = h;
        }

        /**
         * 保存设置
         */
        function saveMsgs() {
            var obj = {};
            obj[ KEY ] = msgs;
            chrome.storage.local.set( obj , function () {
                span_saved.classList.add( 'show' );
                setTimeout( function () {
                    span_saved.classList.remove( 'show' );
                } , 2000 );
            } );
        }

        /**
         * 获取用户的输入内容（复制于content.js）
         * @returns {boolean|string} 如果用户点了取消、或者输入的是空白，则返回 false，否则返回用户输入的文本
         */
        function getPrompt() {
            var input_msg = prompt( '预定义消息最好长一点，以免回复失败。\n输入预定义消息：' ) ,
                r = false;
            if ( 'string' === typeof input_msg ) {
                input_msg = input_msg.trim();
                if ( input_msg ) {
                    r = input_msg;
                }
            }
            return r;
        }
    } );

}( document ));

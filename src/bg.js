chrome.runtime.onInstalled.addListener( function ( d ) {
    if ( 'install' === d.reason ) {
        chrome.storage.local.set( {
            msgs : [ '看看帖子里藏了啥好东西~~~' , '楼主，你是一个大好人！！' ]
        } , function () {
            chrome.tabs.create( { url : 'options.html#install' } );
        } );
    }
} );

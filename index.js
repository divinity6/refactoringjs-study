/** 일단 패스 박아둠 */
const path = "01Refactoring/performance.html";

/**
 * 1. 코드는 강좌에 맞춘 것으로 범용성이 없습니다.
 * 2. 명령어 창에서 node main.js를 실행하기 전에
 *    먼저 express.js를 설치해야 합니다.
 */
"use strict";
const express = require( 'express' );
const app = express();
const url = require('url');

app.use( express.static( 'source' ) );

app.use( function ( req, res ) {

    res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');

    res.setHeader('Cross-origin-Opener-Policy','same-origin');

    const parseURL = url.parse( req.url );
    if ( '/' === parseURL.href ){
        res.sendFile( path , { root : __dirname } );
        return;
    }

    const fileName = parseURL.pathname.replace("/", "");
    /*
     * XHR의 timeout을 체크하기 위한 것으로
     * xhr.open("GET", "../file/timeout_data.txt")이면
     * timeout을 의도적으로 실행합니다.
     * xhr.timeout = 2000;을 작성했으므로 ontimeout 이벤트가 발생하게 됩니다.
     */
    if ( fileName.includes( "timeout_data" ) ){

        setTimeout( function(){
            res.sendFile( fileName , { root : __dirname } );
        }, 5000 );
    }
    else {
        res.sendFile(fileName, {root: __dirname});
    }
});

app.listen( 3000 );
console.log('localhost:3000/ 경로 입력');

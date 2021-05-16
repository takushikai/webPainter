//バニシング設定
let vanishing = false;
function setVanishing(bool) {
    erase(false);//消しゴム無効
    canvas.addEventListener("touchmove", touchScrollOK, false );//逆はremoveEventListener
    
    if (bool == false) {
        pencil.style.backgroundColor = "#ffffff";
        vanishing = false;
    }

    else {
        pencil.style.backgroundColor = "#3876ff";
        vanishing = true;
    }
};

//バニシングオンオフ
pencil.addEventListener("click", ()=>{
    if(vanishing==true){
        setVanishing(false);
    }
    else{
        setVanishing(true);
    }
    
});

// 直前のマウスのcanvas上のx座標とy座標を記録する
let lastPosition = { x: null, y: null };

// マウスがドラッグされているか(クリックされたままか)判断するためのフラグ
let isDrag = false;

//描画終了
function dragEnd(event) {
    // 線を書く処理の終了を宣言する
    context.closePath();
    isDrag = false;

    // 描画中に記録していた値をリセットする
    lastPosition.x = null;
    lastPosition.y = null;

    if(vanishing==false){
        return;
    }
    else{
        // setTimeout(()=>{
        //     undo();
        // }, vanishingTime*1000);
    }
};


//canvasマウスダウン時描画スタート
canvas.$addEventListener("mousedown touchstart", (event) => {
    // if( vanishing==true ){
        console.log("on");
        recordCanvas();
        lastPosition.x = event.pageX;
        lastPosition.y = event.pageY;
        context.beginPath();
        isDrag = true;
    // }
});

canvas.$addEventListener("mouseup touchend", dragEnd);

// canvas.addEventListener("mouseout", dragEnd);//ここはマウスアウト時


canvas.$addEventListener("mousemove touchmove",(e)=>{
    if(!isDrag) {
        return;
    }

    let x,y;
    if(e.type=="mousemove"){
        x = e.pageX;
        y = e.pageY;
    }
    else if(e.type=="touchmove"){
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
    }

    
    if(eraserFlg == true){//消しゴムが有効であればペンは実行されない
        // context.clearRect(x,y,lineWidth,lineWidth);
        context.strokeStyle = "#ffffff";
    }
    else{
        context.strokeStyle = lineColor; // 線の色
    }

    // else{

    // 線の状態を定義する
    context.lineCap = "round"; // 丸みを帯びた線にする
    context.lineJoin = "round"; // 丸みを帯びた線にする
    context.lineWidth = lineWidth; // 線の太さ

    // 「context.beginPath()」と「context.closePath()」を都度draw関数内で実行するよりも、
    // 線の描き始め(dragStart関数)と線の描き終わり(dragEnd)で1回ずつ読んだほうがより綺麗に線画書ける

    // 書き始めは lastPosition.x, lastPosition.y の値はnullとなっているため、
    // クリックしたところを開始点としている。
    // この関数(draw関数内)の最後の2行で lastPosition.xとlastPosition.yに
    // 現在のx, y座標を記録することで、次にマウスを動かした時に、
    // 前回の位置から現在のマウスの位置まで線を引くようになる。
    if (lastPosition.x === null || lastPosition.y === null) {
        // ドラッグ開始時の線の開始位置
        context.moveTo(x, y);
    } else {
        // ドラッグ中の線の開始位置
        context.moveTo(lastPosition.x, lastPosition.y);
    }
    // context.moveToで設定した位置から、context.lineToで設定した位置までの線を引く。
    // - 開始時はmoveToとlineToの値が同じであるためただの点となる。
    // - ドラッグ中はlastPosition変数で前回のマウス位置を記録しているため、
    //   前回の位置から現在の位置までの線(点のつながり)となる
    context.lineTo(x, y);

    // context.moveTo, context.lineToの値を元に実際に線を引く
    context.stroke();

    // 現在のマウス位置を記録して、次回線を書くときの開始点に使う
    lastPosition.x = x;
    lastPosition.y = y;
    // }
});


//消しゴム
let eraserFlg = false;
// let nowColor;//不要？

function erase(bool){
    if(bool == false){
        eraser.style.backgroundColor = "#ffffff";
        // lineColor = nowColor;
        eraserFlg = false;
    }
    else{
        eraser.style.backgroundColor = "#3876ff";
        // nowColor = lineColor;
        eraserFlg = true;
    }
};

eraser.addEventListener("click", ()=>{
    if(eraserFlg==true){
        erase(false);
    }
    else{
        erase(true);
    }
    
});

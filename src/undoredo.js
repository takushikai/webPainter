//undo,redo
// スタックしておく最大回数。キャンバスの大きさの都合などに合わせて調整したら良いです。
//const STACK_MAX_SIZE = 5;
// スタックデータ保存用の配列
let undoDataStack = [];
let redoDataStack = [];

// canvasへの描画処理を行う前に行う処理
function recordCanvas() {
    // やり直し用スタックの中身を削除
    redoDataStack = [];
    // 元に戻す用の配列が最大保持数より大きくなっているかどうか
    // if (undoDataStack.length >= STACK_MAX_SIZE) {
    //     // 条件に該当する場合末尾の要素を削除
    //     undoDataStack.pop();
    // }
    // 元に戻す配列の先頭にcontextのImageDataを保持する
    undoDataStack.unshift(canvas.toDataURL());
}


function undo () {
    // 戻す配列にスタックしているデータがなければ処理を終了する
    if (undoDataStack.length <= 0) return;
    // やり直し用の配列に元に戻す操作をする前のCanvasの状態をスタックしておく
    const nowImg = canvas.toDataURL();
    redoDataStack.unshift(nowImg);
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 元に戻す配列の先頭からイメージデータを取得して
    var imageData = new Image();
    imageData.src = undoDataStack.shift();
    // 描画する
    imageData.onload = function(){
    context.drawImage(imageData, 0, 0);
    }
}

function redo () {
    // やり直し用配列にスタックしているデータがなければ処理を終了する
    if (redoDataStack.length <= 0) return;
    // 元に戻す用の配列にやり直し操作をする前のCanvasの状態をスタックしておく
    undoDataStack.unshift(canvas.toDataURL());
    context.clearRect(0, 0, canvas.width, canvas.height);
    // やり直す配列の先頭からイメージデータを取得して
    var imageData = new Image();
    imageData.src = redoDataStack.shift();
    // 描画する
    imageData.onload = ()=>{
    context.drawImage(imageData, 0, 0,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
    }
}

undo_button.$addEventListener("mousedown touchstart",()=>{
    undo();
    undo_button.style.backgroundColor = "#3876ff";
});
undo_button.$addEventListener("mouseup touchend",()=>{
    undo_button.style.backgroundColor = "#ffffff";
})
redo_button.$addEventListener("mousedown touchstart",()=>{
    redo();
    redo_button.style.backgroundColor = "#3876ff";
});
redo_button.$addEventListener("mouseup touchend",()=>{
    redo_button.style.backgroundColor = "#ffffff";
});
const pageframe = $get("#pageframe"); 
const pages = $get("#slideRapper").getElementsByTagName("section");
const startmenu = $get("#startmenu");
let roomCode;
let page_countValue = 0;
let isPresenter = false;//プレゼンターであるか
let readInterval = 500; //サーバーへのアクセス間隔[ms]


// function sendToServer(obj) {
//    $.ajax({
//       type: "post",
//       url: "./fileWrite.php",
//       data: {
//          "message" : obj
//       }
//    })
//    .then(
//       function (data) {
//          // console.log(data);
//       },
//       function () {
//          console.log("Writing failed");
//       }
//    );
// }


// function readFromServer(str) {//arg:roomCode
//    $.ajax({
//       type: "post",
//       url: "./fileRead.php",
//       data: {"message" : str}
//       })
//    .done(
//       function (data) {
//          console.log(data);
//          const pageNum = parseInt(data ,10);
//          if(page_countValue != pageNum){
//             changePage(pageNum);
//          }
//       }
//    );
// }

// setInterval(function(){
//    if(isPresenter == false){
//       readFromServer(roomCode);//サーバーから読み込み
//    }
// }, readInterval);


//次へボタンがクリックされた時
$get("#goNextBtn").onclick=function(){
   goNextPage();
}

$get("#goPrevBtn").onclick = function(){
   goPrevPage();
}

//次のページへ
function goNextPage(){
   page_countValue++;
   if(page_countValue >= pages.length){
      page_countValue = pages.length;
   }
   changePage(page_countValue);
}

//前のページへ戻る
function goPrevPage(){
   page_countValue--;
   if(page_countValue<0){
      page_countValue=0;
   }
   changePage(page_countValue);
}

//最初のページだけを表示
function firstPageDisp(){
   pages[0].style.display="block";
   for(let i=1; i<pages.length; i++){
      pages[i].style.display="none";
      page_countValue=0;
   }
}
firstPageDisp();//一度実行しておく（しないと最初に全部表示される）



//ページ切替
function changePage(num){
   if(isNaN(num)){//数字でなければ
      num = 0;
   }
   //プレゼンターであるなら、ページの更新を送信
   if(isPresenter == true){
      sendToServer(JSON.stringify({
         "roomCode": roomCode,
         "page": num.toString()
      }));
   }


   page_countValue = num;
   if(num == pages.length){//最後のページより先に行ったら
      fullscreenExit()//フルスクリーン解除
   }
   else{
   // ▼指定のページだけを表示する
      for(let i=0; i<pages.length; i++) {
         if( i != num ) {
            pages[i].style.display = "none";
         }
         else{
            pages[i].style.display = "block";
         }
      }
   }
}


//矢印キー押したとき
document.addEventListener("keydown", function(){
   if( window.event.keyCode == 39 ){
      $get("#goNextBtn").click();
   }
   else if( window.event.keyCode == 37 ){
      $get("#goPrevBtn").click();
   }     
});





//右クリックメニュー
window.onload = function(){
    document.body.addEventListener("contextmenu",function (e){
        $get("#contextmenu").style.left=e.pageX+"px";
        $get("#contextmenu").style.top=e.pageY+"px";
        $get("#contextmenu").style.display = "block";
        
        //フルスクリーンであるか否かで動的に右クリックメニューを作成
        const FullScreenMenu = $get("#FullScreenMenu");
        if(isFullScreen()==true){
            FullScreenMenu.innerHTML = "全画面表示を終了"
            FullScreenMenu.onclick = function(){fullscreenExit();}
        }
        else{
            FullScreenMenu.innerHTML = "全画面表示";
            FullScreenMenu.onclick = function(){fullscreen();}
        }

        const Presenter = $get("#Presenter");
        if(isPresenter==true){
            Presenter.innerHTML = "閲覧者になる";
            Presenter.onclick = function(){
                isPresenter = false;
            }
        }
        else{
            Presenter.innerHTML = "プレゼンターになる";
            Presenter.onclick = function(){
                isPresenter = true;
            }
        }
    });

    document.body.addEventListener("click",function (){
        $get("#contextmenu").style.display="none";
    });
}

//デフォルトの右クリックを無効にする
document.oncontextmenu = function () {return false;}



//フルスクリーン
var html_all = $get("html");

function fullscreen(){
   html_all.requestFullscreen();
}
//フルスクリーン解除
function fullscreenExit(){
   document.exitFullscreen();
}

//https://blog.tsukumijima.net/article/javascript-fullscreen-decision/
// フルスクリーンならtrue、そうでないならfalseを返す
function isFullScreen(){
    if ((document.FullscreenElement !== undefined && document.FullscreenElement !== null) || // Firefox
        (document.webkitFullscreenElement !== undefined && document.webkitFullscreenElement !== null) || // Chrome・Safari など
        (document.msFullscreenElement !== undefined && document.msFullscreenElement !== null)){ // IE
      return true; // FullscreenElementに何か入ってる = フルスクリーン中
    } else {
      return false; // フルスクリーンではない or フルスクリーン非対応の環境(iOS Safariとか)
    }
}


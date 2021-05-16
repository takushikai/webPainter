//2021_05_08 by T.Kai

//issues
//コードが汚い
//若干アイコンがでかい
//ページ遷移（リロード）の禁止・警告
//id使用をやめる
//描画エンジン更新
//バニシングはcanvasを新しく作ろう。?
/**
 * webページ上に手書きメモを取る
 * @version 0.8(Beta)
 * @type Bookmarklet
 *  
 */

// console.log("KTJ Web Draw  ver 0.8 (Beta) is running!");

EventTarget.prototype.$addEventListener = function (str,func){
    let arr = str.split(" ");
    for(let i=0; i<arr.length; i++){
        this.addEventListener(arr[i],func);
    }
};

//元のページの高さと幅
const pageWidth = Math.max(document.documentElement.clientWidth , document.documentElement.scrollWidth);
const pageHeight = Math.max(document.documentElement.clientHeight , document.documentElement.scrollHeight);

//ツールバー
document.body.insertAdjacentHTML("beforeend",
`
<span id="web_draw_toolBarRapper" style="position: fixed; height: auto;  z-index: 9999; top:20%; left:10%; background-color: rgba(255,255,255,0);">
    <span id="web_draw_toolBar" style="position: absolute; width: 22pt; height: auto; border: solid 1px; top:auto; left:auto; background-color: rgba(255,255,255,1);">

        <svg id="web_draw_moveCorsor" width="20pt" height="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <polygon points="512,256 398,182.164 398,224.178 287.822,224.178 287.822,114 329.845,114 256.008,0 182.164,114 
                    224.195,114 224.195,224.178 114.017,224.178 114.017,182.164 0,256 114.017,329.836 114.017,287.822 224.195,287.822 224.195,398 
                    182.164,398 256.008,512 329.845,398 287.822,398 287.822,287.822 398,287.822 398,329.836 	" style="fill: rgb(75, 75, 75);">
                </polygon>
            </g>
        </svg>
            
        <br>

        <svg id="web_draw_pencil" width="20pt" height="20pt" viewBox="0 0 742.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M5812 12406 c-84 -216 -177 -454 -206 -529 l-54 -136 234 -152 c129
                -83 234 -153 234 -155 0 -7 -14 2 -255 154 -121 77 -223 137 -226 133 -3 -3
                -545 -1122 -1204 -2486 -659 -1364 -1288 -2666 -1398 -2894 l-201 -415 55
                -708 c46 -611 56 -707 69 -703 8 3 364 144 790 313 l775 308 727 1734 c401
                954 946 2255 1213 2890 l484 1155 286 519 c157 286 284 520 283 521 -8 5
                -1443 840 -1447 842 -3 2 -75 -174 -159 -391z"/>
                <path d="M2425 4456 c-362 -92 -623 -179 -798 -267 -84 -42 -441 -253 -585
                -346 -181 -116 -344 -255 -427 -363 -124 -161 -173 -333 -141 -488 20 -98 57
                -163 141 -248 114 -116 257 -200 650 -379 424 -193 584 -305 662 -462 25 -51
                28 -69 28 -153 0 -116 -18 -173 -86 -275 -187 -279 -694 -546 -1401 -739 -196
                -53 -419 -106 -448 -106 -13 0 -20 -5 -18 -14 4 -17 546 -616 558 -616 13 0
                353 123 470 170 380 152 739 336 994 510 373 254 596 554 596 802 0 133 -81
                293 -228 449 -92 98 -446 421 -517 471 -68 49 -181 104 -365 178 -85 34 -180
                75 -210 90 -133 67 -232 168 -259 265 -15 55 -14 179 3 241 44 164 173 336
                450 597 191 180 264 237 421 332 135 81 496 263 668 335 70 30 127 60 127 67
                0 20 -17 17 -285 -51z"/>
            </g>
        </svg>

        <br>

        <svg id="web_draw_circle" width="20pt" height="20pt" viewbox="-0.5 -0.5 2 2">
            <circle fill="#000000" cx="0.5" cy="0.5" r="0.5"></circle>
        </svg>

        <br>

        <svg id="web_draw_palette" width="20pt" height="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path d="M410.842,207.265c97.767-8.626,117.891-54.628,89.098-97.749C448.234,32.075,334.016,1.59,218.762,36.607
                    C73.721,80.672-22.226,214.687,4.453,335.938C31.13,457.19,170.334,519.762,315.375,475.697
                    c62.951-19.13,116.653-55.201,155.091-99.821c15.516-18.01,20.891-73.726-50.998-70.844
                    C342.812,308.106,332.197,214.206,410.842,207.265z M385.949,102.144c7.068-7.059,16.84-11.111,26.839-11.111
                    c9.998,0,19.762,4.052,26.838,11.111c7.067,7.076,11.119,16.848,11.119,26.847s-4.052,19.762-11.119,26.838
                    c-7.076,7.067-16.84,11.12-26.838,11.12c-9.999,0-19.771-4.052-26.839-11.12c-7.067-7.076-11.119-16.839-11.119-26.838
                    S378.882,109.22,385.949,102.144z M65.256,226.724c5.711-17.185,24.26-26.485,41.436-20.782
                    c17.185,5.711,26.493,24.261,20.79,41.437c-5.711,17.184-24.269,26.484-41.438,20.789C68.861,262.449,59.553,243.9,65.256,226.724z
                        M127.946,377.433c-11.794,12.451-31.455,12.998-43.905,1.214c-12.459-11.793-12.998-31.446-1.204-43.896
                    c11.785-12.459,31.437-13.006,43.896-1.213C139.182,345.323,139.73,364.975,127.946,377.433z M190.542,171.051
                    c-15.466,11.128-37.031,7.606-48.159-7.86c-11.128-15.474-7.606-37.03,7.859-48.159v-0.008
                    c15.475-11.119,37.032-7.598,48.159,7.868C209.53,138.358,206.009,159.923,190.542,171.051z M250.461,105.589
                    c-2.317-19.88,11.919-37.857,31.8-40.165c19.872-2.308,37.857,11.929,40.165,31.8c2.316,19.872-11.928,37.856-31.801,40.164
                    C270.746,139.706,252.769,125.461,250.461,105.589z M360.897,377.106c0,12.121-4.911,23.948-13.478,32.524
                    c-8.567,8.566-20.411,13.478-32.533,13.478c-12.113,0-23.965-4.912-32.524-13.478c-8.566-8.576-13.478-20.403-13.478-32.524
                    c0-12.122,4.912-23.974,13.478-32.542c8.559-8.559,20.411-13.47,32.524-13.47c12.122,0,23.966,4.911,32.533,13.47
                    C355.986,353.131,360.897,364.983,360.897,377.106z"></path>
            </g>
        </svg>

        <br>

        <svg id="web_draw_eraser" width="20pt" height="20pt" viewBox="0 0 1280.000000 1082.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1082.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M7850 10495 c-411 -198 -681 -323 -692 -320 -10 4 -184 -80 -455
                -219 -241 -123 -616 -309 -833 -414 -217 -104 -631 -303 -920 -442 -289 -139
                -869 -418 -1290 -620 -421 -202 -967 -465 -1215 -584 -247 -119 -509 -244
                -582 -279 l-132 -62 -2 -320 c-1 -176 -4 -410 -8 -520 l-6 -199 -525 -266
                c-312 -157 -568 -293 -630 -334 -121 -81 -313 -264 -380 -365 -58 -87 -124
                -221 -155 -316 l-25 -79 10 -1296 c10 -1205 12 -1305 31 -1445 25 -187 50
                -289 90 -371 62 -126 191 -236 354 -300 39 -16 763 -393 1610 -838 1035 -544
                1564 -817 1614 -832 209 -65 527 -89 787 -60 236 27 363 56 421 98 26 19 278
                200 558 403 281 202 515 368 521 368 5 0 170 -88 365 -196 195 -108 362 -199
                372 -202 13 -5 17 -2 17 13 0 15 186 177 684 595 376 316 694 580 707 587 12
                7 273 216 578 464 306 248 1043 846 1638 1329 l1082 879 3 55 3 56 645 542
                645 541 7 310 c3 170 11 584 17 919 6 336 16 846 22 1135 5 289 11 696 12 904
                l2 379 -355 137 c-195 75 -551 212 -790 304 -528 204 -1649 636 -2350 906
                -283 109 -562 217 -619 239 -58 23 -116 41 -130 41 -14 -1 -330 -147 -701
                -325z"/>
            </g>
        </svg>

        <br>

        <svg id="web_draw_trashBox" x="20pt" y="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297
                    C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297
                    c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695
                    h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z"/>
                <path d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269
                    l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296
                    c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288
                    c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241
                    c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z
                    M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125
                    c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z"/>
            </g>
        </svg>

        <br>

        <svg id="web_draw_undo" x="20pt" y="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path d="M292.497,168.968c-21.134,0-40.287,0-57.542,0V65.394L0,255.995l234.955,190.61V334.395
                    c7.132,0,14.331,0,21.578,0c95.305,0,227.772-2.396,237.359,100.701C541.847,322.408,501.086,168.968,292.497,168.968z"></path>
            </g>
        </svg>

        <br>

        <svg id="web_draw_redo" x="20pt" y="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path d="M512,255.995L277.045,65.394v103.574c-17.255,0-36.408,0-57.542,0c-208.59,0-249.35,153.44-201.394,266.128
                    c9.586-103.098,142.053-100.701,237.358-100.701c7.247,0,14.446,0,21.578,0v112.211L512,255.995z"></path>
            </g>
        </svg>

        <br>

        <svg id="web_draw_eye" x="20pt" y="20pt" viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path d="M512,319.761c-0.881-1.49-21.82-38.71-63.992-76.622c-8.616-7.728-18.184-15.47-28.604-22.926l25.519-44.207
                    c6.162-10.679,2.511-24.338-8.176-30.507l-1.636-0.936c-10.679-6.169-24.338-2.511-30.506,8.168l-24.996,43.305
                    c-3.679-1.853-7.427-3.665-11.274-5.392c-26.058-11.756-55.921-20.289-89.057-23.086v-53.942c0-12.33-10.001-22.331-22.331-22.331
                    h-1.888c-12.337,0-22.338,10.001-22.338,22.331v53.942c-33.136,2.804-62.999,11.33-89.064,23.086
                    c-3.854,1.742-7.498,3.644-11.197,5.518l-25.065-43.43c-6.169-10.679-19.828-14.338-30.507-8.168l-1.636,0.936
                    c-10.686,6.168-14.337,19.828-8.176,30.507l25.534,44.221c-23.184,16.582-41.934,34.625-56.285,50.662
                    C12.624,297.444,0.643,318.636,0,319.761l29.332,16.484l13.673,7.749l0.021-0.042l0.014-0.014
                    c0.895-1.63,20.324-34.689,56.482-66.328c18.071-15.848,40.248-31.332,66.278-42.787c26.066-11.456,55.915-18.96,90.198-18.974
                    c35.108,0.014,65.565,7.881,92.058,19.799c39.682,17.848,70.321,45.172,90.806,68.133c10.245,11.463,17.938,21.785,22.981,29.101
                    c2.532,3.657,4.392,6.566,5.581,8.49c0.588,0.965,1.021,1.679,1.28,2.119l0.259,0.448l0.042,0.063l9.708-5.518l-9.736,5.469
                    L512,319.761z"/>
                <path d="M255.997,247.936c-47.711,0-86.386,38.675-86.386,86.393c0,47.711,38.675,86.386,86.386,86.386
                    c47.718,0,86.393-38.675,86.393-86.386C342.39,286.611,303.715,247.936,255.997,247.936z"/>
            </g>
        </svg>
            

    </span>

    <!-- 文字の太さ valueは初期値-->
    <div id="web_draw_lineWidthPicker" style="position: relative; left: 21pt; top: 60pt; border: solid 1px; background-color: rgba(255,255,255,1);" hidden>
        <input
        id="web_draw_range-selector"
        type="range"
        value="5"
        min="1"
        max="20"
        step="1">
        <!-- 現在の線の太さを表す数値を表示するための要素 -->
        <!-- input要素のスライドを動かすたびに値が更新される -->
        <span id="web_draw_line-width">5</span>
    </div>

    <!-- カラーピッカー -->
    <input id="web_draw_colorPicker" type="color" style="position: relative; left: 21pt; top: 80pt; background-color: rgba(255,255,255,1);" hidden>

</span>
`);

const wrapper = document.createElement("div");//styleは後で追加
document.body.appendChild(wrapper);

const canvas = document.createElement("canvas");
wrapper.appendChild(canvas);
const context = canvas.getContext("2d");

const toolBarRapper = document.getElementById("web_draw_toolBarRapper");
const toolBar = document.getElementById("web_draw_toolBar");
const moveCorsor = document.getElementById("web_draw_moveCorsor");
const pencil = document.getElementById("web_draw_pencil");
const circle = document.getElementById("web_draw_circle");
const palette = document.getElementById("web_draw_palette");
const colorPicker = document.getElementById("web_draw_colorPicker");
const eraser = document.getElementById("web_draw_eraser");
const trashBox = document.getElementById("web_draw_trashBox");
const undo_button = document.getElementById("web_draw_undo");
const redo_button = document.getElementById("web_draw_redo");
const eye = document.getElementById("web_draw_eye");
const toolBarBrTags = toolBar.getElementsByTagName("br");
const toolBarChildren = toolBar.children;
const lineWidthPicker = document.getElementById("web_draw_lineWidthPicker");



//ラインカラー初期値
let lineColor = "#000000";
//太さ初期値
let lineWidth = 5;
//バニシング消えるまでの時間(s)
let vanishingTime = 0.1;


//wrapperをページのサイズに合わせる
wrapper.setAttribute("style", "width:" + pageWidth + "px;" 
                            + "height:" + pageHeight + "px;" 
                            + "position:absolute; z-index:9998; top:0px; left:0px;"
                    );

//canvasのサイズをwrapperに合わせる
canvas.setAttribute("width", wrapper.clientWidth);
canvas.setAttribute("height", wrapper.clientHeight);

eye.style.backgroundColor = "#3876ff";//キャンバス表示切替のアイコンは最初背景を青に


function touchScrollOK(e){
    e.preventDefault();
};


//キャンバスの表示・非表示を切り替え
let canvasDispFlg = true;
function canvasDisp(){
    if(canvasDispFlg == true){
        eye.style.backgroundColor = "#ffffff";
        wrapper.style.display = "none";
        //範囲選択を許可
        document.onselectstart = () => {
            return true;
        };
        canvasDispFlg = false;
        }

    else{
        eye.style.backgroundColor = "#3876ff";
        wrapper.style.display = "block";
        //範囲選択を禁止
        document.onselectstart = () => {
            return false;
        };
        canvasDispFlg = true;
    }
};


//ツールバー移動
let moveFlag = false;
let X,Y;
moveCorsor.$addEventListener("mousedown touchstart",()=>{
    moveFlag = true;
    moveCorsor.style.backgroundColor = "#3876ff";
    document.onselectstart = () => {
        return false;
    };
})
window.$addEventListener("mouseup touchend",()=>{
    moveFlag = false;
    moveCorsor.style.backgroundColor = "#ffffff";
    if(!canvasDispFlg){//キャンバスが表示されていなければ、範囲選択を許可
        document.onselectstart = () => {
            return true;
        };
    }
})
window.addEventListener("mousemove", (event)=>{
    if(!moveFlag){
        return;
    }
    else{
        Y = event.clientY;
        X = event.clientX;
        toolBarRapper.style.top = (Y - 10 ) + "px";
        toolBarRapper.style.left = (X - 10) + "px";
    }
});
window.addEventListener("touchmove", (event)=>{
    if(!moveFlag){
        return;
    }
    else{
        Y = event.changedTouches[0].clientY;
        X = event.changedTouches[0].clientX;
        toolBarRapper.style.top = Y + "px";
        toolBarRapper.style.left = X + "px";
    }
});



//moveCorsorダブルクリック時ツールバーの収納・展開
let toolBarDispFlg = true;
moveCorsor.addEventListener("dblclick",()=>{
    if(toolBarDispFlg == true){
        for(let i=0; i<toolBarChildren.length; i++){
            toolBarChildren[i].style.display = "none";
        }
        lineWidthPicker.style.display = "none";
        circle.style.backgroundColor = "#ffffff";
        circleFlg = false;
        colorPicker.style.display = "none";
        palette.style.backgroundColor = "#ffffff";
        paletteFlg = false;

        moveCorsor.style.display = "block";
        toolBarDispFlg = false;
    }
    else{
        for(let i=0; i<toolBarChildren.length; i++){
            toolBarChildren[i].style.display = "inline-block";
        }
        for(let i=0; i<toolBarBrTags.length; i++){
            toolBarBrTags[i].style.display = "none";
        }
        toolBarDispFlg = true;            
    }
});


//circleクリック時太さピッカーの展開・収納
let circleFlg = false;
circle.addEventListener("click",()=>{
    if(circleFlg == true){
        lineWidthPicker.style.display = "none";
        circle.style.backgroundColor = "#ffffff";
        circleFlg = false;
    }
    else{
        lineWidthPicker.style.display = "block";
        circle.style.backgroundColor = "#3876ff";
        circleFlg = true;
    }
});

//colorPaletteクリック時カラーピッカーの展開・収納
let paletteFlg = false;
palette.addEventListener("click",()=>{
    if(paletteFlg == true){
        colorPicker.style.display = "none";
        palette.style.backgroundColor = "#ffffff";
        paletteFlg = false;
    }
    else{
        colorPicker.style.display = "block";
        palette.style.backgroundColor = "#3876ff";
        paletteFlg = true;
    }
});


// 文字の太さの設定・更新を行う機能
function initConfigOfLineWidth() {
    const textForCurrentSize = document.getElementById("web_draw_line-width");
    const rangeSelector = document.getElementById("web_draw_range-selector");

    // 線の太さを記憶している変数の値を更新する
    lineWidth = rangeSelector.value;

    // "input"イベントをセットすることでスライド中の値も取得できるようになる。
    rangeSelector.addEventListener("input", event => {
    const width = event.target.value;

    // 線の太さを記憶している変数の値を更新する
    lineWidth = width;

    // 更新した線の太さ値(数値)を<input id="range-selector" type="range">の右側に表示する
    textForCurrentSize.innerText = width;
    });
}
initConfigOfLineWidth();

//カラーピッカー使用時lineColorを変更
colorPicker.addEventListener("change" ,()=>{
    lineColor = colorPicker.value;      
})

//canvas表示・非表示
eye.addEventListener("click", canvasDisp);

//全部消す
function allClear() {
    recordCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

//AllClear
trashBox.$addEventListener("mousedown touchstart", ()=>{
    allClear();
    trashBox.style.backgroundColor = "#3876ff";
});
trashBox.$addEventListener("mouseup touchend", ()=>{
    trashBox.style.backgroundColor = "#ffffff";
});


//最初は範囲選択禁止
document.onselectstart = () => {
    return false;
};

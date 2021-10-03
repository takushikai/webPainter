<?php
    $request = "";
    //Ajaxからのリクエストかを確認
    if (isset($_SERVER["HTTP_X_REQUESTED_WITH"])) {
        $request = strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]);
    }
    if ($request !== "xmlhttprequest") {
        exit;
    }
 
    $message = "";
    //POSTリクエストで送られてきたフォームの中身を取得
    if (isset($_POST["message"]) && is_string($_POST["message"])) {
        $message = htmlspecialchars($_POST["message"], ENT_QUOTES);
    }
    if ($message == "") {
        exit;
    }

    file_put_contents("pageCount.txt",$message);
?>
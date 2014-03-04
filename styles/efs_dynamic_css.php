<?php
header("Content-type: text/css");
if(!session_id())
    session_start();
echo $_SESSION['efs_dynamic_css'];

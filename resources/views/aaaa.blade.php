<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  </head>
<body>
  <a href="{{ URL('active?name='.$name.'&id='.$id.'&rcode='.$rcode) }}" target="_blank">点击激活你的账号</a>
  <b>或复制以下地址</b>
  {{ URL('active?name='.$name.'&id='.$id.'&rcode='.$rcode) }}
  <b>在新窗口中打开</b>
</body>
</html>
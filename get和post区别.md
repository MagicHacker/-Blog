+ 请求参数长度限制：get请求的URL长度限制好像是2kb吧，post没有限制。
+ get在浏览器回退时不会再次提交请求，而post会再次提交请求。
+ get的请求参数会被保留在浏览器历史记录里，而post的参数不会保留。
+ get请求参数是通过URL进行传递的，而post是通过请求体。
+ get请求会被浏览器默认缓存，而post请求默认不会，除非手动设置。
+ get请求产生一个数据包，post会产生两个数据包。因为get请求，浏览器会把HTTP header和data一起发送出去。而post请求，浏览器会先发送header，服务器响应100 continue，浏览器再发送data。好像是Firefox发post请求只发送一次。
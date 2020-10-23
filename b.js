const fs = require("fs");

var buf = Buffer.alloc(1024);
fs.open("/home/pingm/test/t.fifo", "r+", "0777", function(err, fd) {
  console.log(err, fd, 1);
  if (err) {
    if (fd) {
      fs.close(fd);
    }
    return
  }
  console.log("文件打开成功！");
  console.log("准备读取文件：");
  fs.read(fd, buf, 0, buf.length, null, function(err, bytes){
    if (err){
      console.log(err);
    }
    console.log(bytes + "  字节被读取");
    
    // 仅输出读取的字节
    if(bytes > 0){
       console.log(buf.slice(0, bytes).toString());
    }
 });
})

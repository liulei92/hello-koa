// nodejs环境控制和版本控制

const fs = require("fs");

var data = Buffer.from('some inputsome inputsome inputsome inputsome inputsome inputsome input');
// path = "e:/test/test.txt"
fs.open("/home/pingm/test/t.fifo", "r+", "0777", function(err, fd) {
  console.log(err, fd);
  if (err) {
    if (fd) {
      fs.close(fd, () => {
        console.log(1);
      });
    }
    return
  }
  console.log("写入ing");
  fs.write(fd, data, 0, data.length, function(error, written, buffer) {
    console.log(error, written, buffer);
    if (fd) {
      fs.close(fd, () => {
        console.log(2);
      });
    }
    if (error) {
      console.log('Error writing to fifo: ' + error);
    } else {
      if (written == data.length) {
        console.log('data has been written successfully!');
      } else {
        console.log('Error: Only wrote ' + written + ' out of ' + data.length + ' bytes to fifo.');
      }
    }
  })
})

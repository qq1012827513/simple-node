import net from 'node:net'
const server = net.createServer(socket => {
  console.log('有连接');
  socket.on('data', (data) => {
    console.log('接收到数据', data.toString());
  })
  socket.on('end', () => {
    console.log('连接结束');
  })
})
server.listen(6666)
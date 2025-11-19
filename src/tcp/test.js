process.on('SIGTERM', (msg) => {
  console.log('收到消息', msg);
  exit(1)
})
let i = 2
while (i < 1000000000) {
  i = i + 1
}
console.log(i);


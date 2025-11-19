import cp from 'node:child_process'
import path from 'node:path'
const __dirname = import.meta.dirname
const child = cp.spawn('node',[path.join(__dirname, 'test.js')])
child.stdout.pipe(process.stdout)
setTimeout(() => {
  child.kill('SIGABRT');
}, 1000);

await import('./test.js')
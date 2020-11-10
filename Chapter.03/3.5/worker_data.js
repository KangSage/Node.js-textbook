const {
  Worker, isMainThread, parentPort, workerData
} = require('Chapter.03/3.5/worker_threads');

if (isMainThread) { // 부모일 때
  const threads = new Set();
  threads.add(new Worker(__filename, {
    workerData: { start: 1 },
  }))
  threads.add(new Worker(__filename, {
    workerData: { start: 2 },
  }))
  for (let worker of threads) {
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('job done');
      }
    });
  }
} else { // 워커일 때
  parentPort.postMessage(workerData.start + 100);
}

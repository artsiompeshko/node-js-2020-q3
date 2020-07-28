import { Transform, TransformCallback, pipeline } from 'stream';

function reverseStream(from: NodeJS.ReadStream, to: NodeJS.WriteStream) {
  // create duplex transform stream
  const reverseTransform = new Transform({
    transform(chunk: string, encoding: BufferEncoding, callback: TransformCallback) {
      // reverse chunk
      const reversedChunk = chunk?.toString().split('').reverse().join('');
      // pipe to read stream
      callback(null, `${reversedChunk}\n`);
    },
  });

  pipeline(from, reverseTransform, to, err => {
    if (err) {
      console.error('Failed to reverse.', err);
    }
  });
}

reverseStream(process.stdin, process.stdout);

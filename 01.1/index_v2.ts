// implementation with async for of
async function reverseStream(from: NodeJS.ReadStream, to: NodeJS.WriteStream) {
  for await (const chunk of from) {
    const reversedChunk = chunk?.toString().split('').reverse().join('');

    to.write(reversedChunk);
  }
}

reverseStream(process.stdin, process.stdout);

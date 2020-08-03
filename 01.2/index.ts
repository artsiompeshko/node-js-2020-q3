import * as fs from 'fs';
import { Dir } from 'fs';

import * as path from 'path';

import { pipeline } from 'stream';

import * as csv from 'csvtojson';

// extract file names from given directory
async function getFileNames(dirPath: string): Promise<string[]> {
  const dir: Dir = await fs.promises.opendir(path.resolve(__dirname, dirPath));
  const result: string[] = [];

  for await (const dirent of dir) {
    result.push(dirent.name);
  }

  return result;
}

// transform all csv to txt files inside given directory
async function transformCsvToJson(dirPath: string): Promise<void> {
  const fileNamesToTransform = await getFileNames(dirPath);

  for (const fileName of fileNamesToTransform) {
    pipeline(
      fs.createReadStream(path.resolve(__dirname, dirPath, fileName)),
      csv(),
      fs.createWriteStream(
        path.resolve(__dirname, 'txt', `${path.basename(fileName, path.extname(fileName))}.txt`),
      ),
      err => {
        if (err) {
          console.error(err);
        }
      },
    );
  }
}

transformCsvToJson('csv');

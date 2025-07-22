
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import os from 'os';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export class FileCompressor {
  static async compressImage(buffer: Buffer): Promise<Buffer> {
    console.log('Compressing image...');
    try {
      return await sharp(buffer)
        .resize(800)
        .webp({ quality: 80 })
        .toBuffer();
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Image compression failed');
    }
  }

  static async compressVideo(buffer: Buffer): Promise<Buffer> {
    const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.mp4`);
    const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.mp4`);

    try {
      await writeFile(inputPath, buffer);
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions('-t 00:01:00')
          .outputOptions('-b:v 500k')
          .save(outputPath)
          .on('end', () => {
            console.log('Video compression completed');
            resolve();
          })
          .on('error', (err) => {
            console.error('Error during video compression:', err);
            reject(err);
          });
      });

      const compressedBuffer = await fs.promises.readFile(outputPath);
      return compressedBuffer;
    } catch (error) {
      console.error('Error compressing video:', error);
      throw new Error('Video compression failed');
    } finally {
      await unlink(inputPath).catch(() => {});
      await unlink(outputPath).catch(() => {});
    }
  }
}
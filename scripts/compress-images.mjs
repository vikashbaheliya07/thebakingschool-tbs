import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

async function compressImage(inputPath, outputPath, options = {}) {
    const { quality = 80, maxWidth = 1920 } = options;

    try {
        const metadata = await sharp(inputPath).metadata();
        let pipeline = sharp(inputPath);

        // Resize if wider than maxWidth
        if (metadata.width > maxWidth) {
            pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
        }

        await pipeline
            .webp({ quality })
            .toFile(outputPath);

        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} | ${(inputSize / 1024 / 1024).toFixed(1)}MB → ${(outputSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);

        return { inputSize, outputSize };
    } catch (err) {
        console.error(`❌ Failed: ${inputPath} - ${err.message}`);
        return null;
    }
}

async function processDirectory(dir, options = {}) {
    const files = fs.readdirSync(dir);
    let totalInput = 0;
    let totalOutput = 0;
    let count = 0;

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subResult = await processDirectory(filePath, options);
            totalInput += subResult.totalInput;
            totalOutput += subResult.totalOutput;
            count += subResult.count;
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

        // Skip already small files (< 100KB)
        if (stat.size < 100 * 1024) {
            console.log(`⏭️  Skipping ${file} (already small: ${(stat.size / 1024).toFixed(0)}KB)`);
            continue;
        }

        const outputName = path.basename(file, path.extname(file)) + '.webp';
        const outputPath = path.join(dir, outputName);

        // Set higher quality for hero images
        const isHero = file.toLowerCase().includes('hero');
        const quality = isHero ? 85 : options.quality || 80;

        const result = await compressImage(filePath, outputPath, { ...options, quality });
        if (result) {
            totalInput += result.inputSize;
            totalOutput += result.outputSize;
            count++;
        }
    }

    return { totalInput, totalOutput, count };
}

async function main() {
    console.log('🔄 Starting image compression...\n');

    const result = await processDirectory(publicDir, { maxWidth: 1920 });

    console.log('\n========================================');
    console.log(`📊 Compressed ${result.count} images`);
    console.log(`📁 Before: ${(result.totalInput / 1024 / 1024).toFixed(1)} MB`);
    console.log(`📁 After:  ${(result.totalOutput / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎯 Saved:  ${((result.totalInput - result.totalOutput) / 1024 / 1024).toFixed(1)} MB (${((1 - result.totalOutput / result.totalInput) * 100).toFixed(1)}%)`);
    console.log('========================================\n');

    console.log('✅ Done! Now you can safely delete the original .jpg/.JPG files.');
}

main().catch(console.error);

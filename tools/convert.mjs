import sharp from 'sharp';
import fs from 'fs';

const files = [
    'e:/thebakingschool-26/thebakingschool-tbs/public/1.png',
    'e:/thebakingschool-26/thebakingschool-tbs/public/2.png',
    'e:/thebakingschool-26/thebakingschool-tbs/public/3.png'
];

async function main() {
    for (const file of files) {
        const out = file.replace('.png', '.webp');
        await sharp(file).webp({ quality: 80 }).toFile(out);
        console.log(`Converted ${file} to ${out}`);
    }
}

main().catch(console.error);

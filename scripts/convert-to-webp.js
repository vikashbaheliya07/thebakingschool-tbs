/**
 * Script to convert JPG/PNG images to WebP format
 * 
 * Usage:
 * 1. Install sharp: npm install sharp
 * 2. Place your JPG images in the 'input' folder
 * 3. Run: node scripts/convert-to-webp.js
 * 4. WebP images will be saved in public/gallery/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_FOLDER = './input-images';
const OUTPUT_FOLDER = './public/gallery';
const QUALITY = 80; // WebP quality (1-100)

// Create folders if they don't exist
const createFolders = () => {
  if (!fs.existsSync(INPUT_FOLDER)) {
    fs.mkdirSync(INPUT_FOLDER, { recursive: true });
    console.log(`📁 Created input folder: ${INPUT_FOLDER}`);
    console.log('📝 Place your JPG/PNG images in this folder');
  }
  
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
  }
  
  // Create category subfolders
  const categories = ['pastries', 'cakes', 'breads', 'confections', 'pies', 'cupcakes', 'student-work'];
  categories.forEach(category => {
    const categoryPath = path.join(OUTPUT_FOLDER, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }
  });
};

// Convert images to WebP
const convertToWebP = async () => {
  try {
    createFolders();
    
    const files = fs.readdirSync(INPUT_FOLDER);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    if (imageFiles.length === 0) {
      console.log('❌ No JPG/PNG images found in input folder');
      console.log(`📁 Please add images to: ${INPUT_FOLDER}`);
      return;
    }
    
    console.log(`🔄 Converting ${imageFiles.length} images to WebP...`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_FOLDER, file);
      const fileName = path.parse(file).name;
      const outputPath = path.join(OUTPUT_FOLDER, `${fileName}.webp`);
      
      try {
        await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);
        
        console.log(`✅ Converted: ${file} → ${fileName}.webp`);
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error.message);
      }
    }
    
    console.log('🎉 Conversion complete!');
    console.log(`📁 WebP images saved to: ${OUTPUT_FOLDER}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Run the conversion
convertToWebP();
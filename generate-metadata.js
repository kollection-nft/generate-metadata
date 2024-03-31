// this is a simple metadata generator for NFT metadata
// each file is named with the hex string of the NFT number

const fs = require('fs');
const path = require('path');
const utils = require("koilib").utils;

// Parameters
const namePrefix = "NFT Image #"; // Example name prefix
const description = "This is the description for all NFTs";
const imageUrlPrefix = ""; // example: "https://bafybeifj6zjkuvu445d3izou6ys3ke7rqtjoucprniuf64qln5nxapgj6m.ipfs.nftstorage.link/"
const totalNFTs = 55; // total number of NFTs
const fileExtension = "png"; // file extension of the image
const outputDir = path.join(__dirname, 'nft-metadata');

function encodeHex(str) {
    let buffer = new TextEncoder().encode(str);
    return `0x${utils.toHexString(buffer)}`;
}

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

for (let i = 1; i <= totalNFTs; i++) {
    // Generate metadata
    const metadata = {
        name: `${namePrefix}${i}`,
        description: description,
        image: `${imageUrlPrefix}${i}.${fileExtension}`
    };

    // Convert i to a hex string and create a filename
    const filename = encodeHex(i);

    // Write the metadata to a file in the output directory
    fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(metadata, null, 2));

    console.log(`Metadata for NFT ${i} saved to ${filename}`);
}

console.log('All metadata files have been generated.');
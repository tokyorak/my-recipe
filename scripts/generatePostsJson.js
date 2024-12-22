const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, '../_posts');
const outputFilePath = path.join(__dirname, '../posts.json');

fs.readdir(postsDirectory, (err, files) => {
    if (err) {
        console.error('Error reading posts directory:', err);
        process.exit(1); // Exit with an error code
    }

    const posts = files
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const filePath = path.join(postsDirectory, file);
            try {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                return {
                    title: content.title,
                    date: content.date,
                    image: content.image,
                    url: `_posts/${file}`
                };
            } catch (error) {
                console.error('Error parsing JSON file:', filePath, error);
                process.exit(1); // Exit with an error code
            }
        });

    try {
        fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
        console.log('Posts JSON generated successfully');
    } catch (error) {
        console.error('Error writing posts.json:', error);
        process.exit(1); // Exit with an error code
    }
});
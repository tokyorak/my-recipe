const fs = require('fs');
const { url } = require('inspector');
const path = require('path');

const postsDirectory = path.join(__dirname, '../_posts');
const outputFilePath = path.join(__dirname, '../posts.json');

fs.readdir(postsDirectory, (err, files) => {
    if (err) {
        console.error('Error reading posts directory:', err);
        return;
    }

    const posts = files
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const filePath = path.join(postsDirectory, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return {
                title: content.title,
                date: content.date,
                image: content.image,
                url: `/posts/${file}`
            };
        });

    fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
    console.log('Posts JSON generated successfully');
});
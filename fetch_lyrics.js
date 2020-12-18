const fetchLyrics = (geniusAPIClient, artist, song) => {
	let query = encodeURIComponent(artist + ' ' + song);
	geniusAPIClient.search(query).then(results => {
		if(results.length){
			geniusAPIClient.song(results[0].id, {fetchLyrics: true}).then(lyrics => {
				console.log(`${artist} - ${song} Lyrics`);
				console.log(lyrics.lyrics);
			});
		}
		else {
			findLyricsFile(artist, song);
		}
	});
};

const findLyricsFile = (artist, song) => {
	let fs = require('fs');
	let lyricsFolder = 'resources/lyrics/';
	return fs.readdir(lyricsFolder, function(err, filenames) {
		if (err) {
			return console.log(err);
		}
		let found = filenames.find(function(filename) {
			let lower = filename.toLowerCase();
			if (lower.includes(artist.toLowerCase()) && lower.includes(song.replace(/[^a-zA-Z ]/g, '').toLowerCase())) {
				fs.readFile(lyricsFolder + filename, 'utf-8', function (err, content) {
					if (err) {
						console.log(err);
					}
					else {
						console.log(content);
					}
					return true;
				});
				return true;
			}
			return false;
		});
		if (!found) {
			console.log(`No lyrics found for ${artist} - ${song}`);
		}
	});
};

module.exports = {
	fetchLyrics: fetchLyrics
};

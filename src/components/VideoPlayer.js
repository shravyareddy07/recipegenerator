import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoName }) => {
  // const apiKey = 'AIzaSyBznYhVif-GUdNe_5g_w2u270o_5E7-mZk'; // Replace with your YouTube Data API key
  const apiKey = 'AIzaSyCNyWjYmRFszaLrzdgR98PBFqsXRg5SC90'; // Replace with your YouTube Data API key
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const fetchMostWatchedVideo = async () => {
      try {
        const encodedVideoName = encodeURIComponent(videoName);
        // Step 1: Search for videos
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${videoName}&type=video`
        );
        

        if (!searchResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const searchData = await searchResponse.json();

        // Check if any videos were found
        if (searchData.items && searchData.items.length > 0) {
          // Step 2: Fetch video statistics to determine the view counts
          const videoIds = searchData.items.map(item => item.id.videoId).join(',');
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=statistics`
          );

          if (!statsResponse.ok) {
            throw new Error('Network response for video statistics was not ok');
          }

          const statsData = await statsResponse.json();

          // Find the video with the highest view count
          let mostWatchedVideo = searchData.items[0];
          let highestViewCount = 0;

          searchData.items.forEach(item => {
            const videoId = item.id.videoId;
            const videoStats = statsData.items.find(stats => stats.id === videoId);
            const viewCount = videoStats.statistics.viewCount;

            if (parseInt(viewCount, 10) > highestViewCount) {
              highestViewCount = parseInt(viewCount, 10);
              mostWatchedVideo = item;
            }
          });

          // Set the video link to the most-watched video
          const mostWatchedVideoId = mostWatchedVideo.id.videoId;
          const videoLink = `https://www.youtube.com/watch?v=${mostWatchedVideoId}`;
          setVideoLink(videoLink);
        } else {
          throw new Error('No videos found for the given query');
        }
      } catch (error) {
        console.error('Error:', error);
        setVideoLink('Error: Video not found');
      }
    };

    fetchMostWatchedVideo();
  }, [videoName, apiKey]);

  return (
    <div className='videoPlayer'>
      {videoLink === '' ? (
        'Loading...'
      ) : videoLink.startsWith('Error') ? (
        <div>{videoLink}</div>
      ) : (
        <YouTube videoId={videoLink.split('v=')[1]} opts={{ width: '640', height: '360' }} />
        // <YouTube videoId={'IGlWE4AFQ5Q'} />
      )}
    </div>
  );
};

export default VideoPlayer;

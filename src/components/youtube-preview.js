import React from 'react';

function YoutubePreview({ link }) {
    function YouTubeGetID(url) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return url[2] !== undefined ? url[2].split(/[^0-9a-z_]/i)[0] : url[0];
    }
    const embedId = YouTubeGetID(link);

    return (
        <div className="video-responsive">
            <iframe
                minWidth="100"
                height="100"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
}
export default YoutubePreview;

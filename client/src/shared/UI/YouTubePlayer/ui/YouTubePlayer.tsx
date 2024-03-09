import { memo, useCallback, useEffect, useState } from 'react';

interface YouTubePlayerProps {
    videoUrl: string;
    setIsVideoReady: (value: boolean) => void;
}

export const YouTubePlayer = memo((props: YouTubePlayerProps) => {
    const { videoUrl, setIsVideoReady } = props;

    const [videoId, setVideoId] = useState<string>('');

    useEffect(() => {
        const videoIdRegex = /youtu\.be\/([^?]+)/;
        const match = videoUrl.match(videoIdRegex);

        if (match && match[1]) {
            const videoId = match[1];
            setVideoId(videoId);
        } else {
            console.log('Идентификатор видео не найден');
        }
    }, [videoUrl]);

    function onPlayerReady(event: any) {
        console.log('Видео загружено');
        setIsVideoReady(true);
    }
    function onPlayerError(event: any) {
        console.log('event');
    }

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // @ts-ignore
        window.onYouTubeIframeAPIReady = () => {
            // @ts-ignore
            new window.YT.Player('player', {
                height: '360',
                width: '640',
                videoId,
                events: {
                    onReady: onPlayerReady,
                    onError: onPlayerError,
                },
            });
        };
    }, [videoId]);

    return <div id="player" />;
});

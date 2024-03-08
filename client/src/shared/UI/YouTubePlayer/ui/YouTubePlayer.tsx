import { memo, useCallback, useEffect } from 'react';

interface YouTubePlayerProps {
    videoId: string;
    setIsVideoReady: (value: boolean) => void;
}

export const YouTubePlayer = memo((props: YouTubePlayerProps) => {
    const { videoId, setIsVideoReady } = props;

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

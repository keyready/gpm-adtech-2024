import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useRef, useState, DragEvent, useCallback } from 'react';
import { Text } from 'shared/UI/Text';
import classes from './VideoUploader.module.scss';

interface VideoUploaderProps {
    className?: string;
    setLocalVideo: (file: File) => void;
}

export const VideoUploader = memo((props: VideoUploaderProps) => {
    const { className, setLocalVideo } = props;

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files ? event.target.files[0] : null;
            if (file) {
                setLocalVideo(file);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        },
        [setLocalVideo],
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (e.dataTransfer.items) {
                const file = e.dataTransfer.items[0].getAsFile();
                if (file) {
                    setLocalVideo(file);
                    const url = URL.createObjectURL(file);
                    setPreviewUrl(url);
                }
            }
        },
        [setLocalVideo],
    );

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragEnd}
            className={classNames(classes.VideoUploader, {}, [className])}
        >
            {!previewUrl && (
                <button
                    className={classNames(classes.selectBtn, { [classes.dragging]: isDragging })}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {isDragging ? (
                        <Text size="small" align="center" text="Теперь отпустите видео!" />
                    ) : (
                        <Text
                            size="small"
                            align="center"
                            text="Выберите видео или перетащите его сюда"
                        />
                    )}
                </button>
            )}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="video/*"
            />
            {previewUrl && <video muted controls src={previewUrl} style={{ width: '100%' }} />}
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { Icon } from 'shared/UI/Icon/Icon';
import MainLogoIcon from 'shared/assets/icons/main-logo.svg';
import { Divider } from 'primereact/divider';
import { HStack, VStack } from 'shared/UI/Stack';
import { getVideoSubtitlesData, VideoSubtitles } from 'entities/VideoSubtitles';
import { useSelector } from 'react-redux';
import { Text } from 'shared/UI/Text';
import YouTube from 'react-youtube';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { distance } from 'framer-motion';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createTranslation } from 'entities/VideoSubtitles/model/service/createTranslation';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from 'shared/UI/PageLoader';
import { createVoiceover } from 'entities/VideoSubtitles/model/service/createVoiceover';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './SubtitlesEditPage.module.scss';

interface SubtitlesEditPageProps {
    className?: string;
}

const SubtitlesEditPage = memo((props: SubtitlesEditPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Проверьте перевод видео';
    }, []);

    const [isVideoTranslated, setIsVideoTranslated] = useState<boolean>(false);
    const [isVideoTranslating, setIsVideoTranslating] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string>('');
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [editedSubtitles, setEditedSubtitles] = useState<VideoSubtitles>();

    const subtitles = useSelector(getVideoSubtitlesData);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setEditedSubtitles(subtitles);
    }, [subtitles]);

    useEffect(() => {
        if (subtitles?.videoId) {
            const id = subtitles?.videoId.match(
                /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/,
            );
            if (id) setVideoId(id[1]);
        }
    }, [subtitles?.videoId]);

    const handleSubtitleChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        if (editedSubtitles?.subtitles) {
            const newSubtitles = [...editedSubtitles.subtitles];
            const updatedSubtitle = { ...newSubtitles[index], text: event.target.value };
            newSubtitles[index] = updatedSubtitle;
            setEditedSubtitles((prevState) => ({ ...prevState, subtitles: newSubtitles }));
        }
    };

    const handleTranslateFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (editedSubtitles && !isVideoTranslated) {
                setIsVideoTranslating(true);
                const result = await dispatch(createVoiceover(editedSubtitles));
                setIsVideoTranslating(false);

                if (result.meta.requestStatus === 'fulfilled') {
                    document.title = 'Проверьте перевод видео';
                    setIsVideoTranslated(true);
                }
            } else if (editedSubtitles && isVideoTranslated) {
                setIsVideoTranslating(true);
                const result = await dispatch(createVoiceover(editedSubtitles));
                setIsVideoTranslating(false);

                if (result.meta.requestStatus === 'fulfilled') {
                    navigate(RoutePath.result);
                }
            }
        },
        [dispatch, editedSubtitles, isVideoTranslated, navigate],
    );

    if (!subtitles?.subtitles?.length) {
        return (
            <Page className={classNames(classes.SubtitlesEditPage, {}, [className])}>
                <VStack maxW align="center">
                    <Icon Svg={MainLogoIcon} className={classes.logo} />
                    <Divider className={classes.divider} />

                    <Text
                        align="center"
                        title="Не найдены результаты обработки видео"
                        text="Попробуйте перейти на главную и начать заново"
                    />
                </VStack>
            </Page>
        );
    }

    if (isVideoTranslating) {
        return (
            <Page className={classNames(classes.SubtitlesEditPage, {}, [])}>
                <PageLoader />
            </Page>
        );
    }

    return (
        <Page className={classNames(classes.SubtitlesEditPage, {}, [className])}>
            <VStack maxW align="center">
                <Icon Svg={MainLogoIcon} className={classes.logo} />
                <Divider className={classes.divider} />

                {editedSubtitles?.videoId && (
                    <>
                        <Text title={videoTitle} className={classes.videoTitle} />
                        <div className={classes.videoWrapper}>
                            <YouTube
                                key={videoId}
                                className={classes.video}
                                videoId={videoId}
                                onReady={(event: any) => setVideoTitle(event.target.videoTitle)}
                            />
                        </div>

                        <Divider className={classes.divider} />
                        <form onSubmit={handleTranslateFormSubmit}>
                            <VStack className={classes.subtitles} maxW justify="start" gap="8">
                                {editedSubtitles?.subtitles &&
                                    editedSubtitles?.subtitles.map((st, index) => (
                                        <HStack
                                            align="start"
                                            key={st.startAt + st.endAt}
                                            justify="start"
                                            gap="16"
                                            maxW
                                        >
                                            <InputText
                                                disabled
                                                value={`${st.startAt} - ${st.endAt}`}
                                            />
                                            <InputTextarea
                                                className={classes.textarea}
                                                autoResize
                                                value={st.text}
                                                onChange={(e) => handleSubtitleChange(e, index)}
                                                rows={5}
                                            />
                                        </HStack>
                                    ))}
                                <Button className={classes.button} severity="secondary">
                                    {isVideoTranslated ? 'Озвучить' : 'Перевести'}
                                </Button>
                            </VStack>
                        </form>
                    </>
                )}
            </VStack>
        </Page>
    );
});

export default SubtitlesEditPage;

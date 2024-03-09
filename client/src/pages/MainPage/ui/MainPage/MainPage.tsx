import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { YouTubePlayer } from 'shared/UI/YouTubePlayer';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from 'shared/UI/PageLoader';
import { createSubtitles } from 'entities/VideoSubtitles/model/service/createSubtitles';
import { useSelector } from 'react-redux';
import {
    getVideoSubtitlesData,
    getVideoSubtitlesError,
    VideoSubtitlesReducer,
} from 'entities/VideoSubtitles';
import { InputTextarea } from 'primereact/inputtextarea';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';
import classes from './MainPage.module.scss';

interface ILanguage {
    value: string;
    code: string;
}

const groupedLanguage: ILanguage[] = [
    { value: 'Болгарский', code: 'BG' },
    { value: 'Чешский', code: 'CS' },
    { value: 'Дацкий', code: 'DA' },
    { value: 'Немецкий', code: 'DE' },
    { value: 'Грецкий', code: 'EL' },
    { value: 'Английский', code: 'EN' },
    { value: 'Испанский', code: 'ES' },
    { value: 'Эстонский', code: 'ET' },
    { value: 'Финский', code: 'FI' },
    { value: 'Французкий', code: 'FR' },
    { value: 'Венгерский', code: 'HU' },
    { value: 'Индонезский', code: 'ID' },
    { value: 'Итальянский', code: 'IT' },
    { value: 'Японский', code: 'JA' },
    { value: 'Корейский', code: 'KO' },
    { value: 'Литовский', code: 'LT' },
    { value: 'Латышский', code: 'LV' },
    { value: 'Норвежский', code: 'NB' },
    { value: 'Голландский', code: 'NL' },
    { value: 'Польский', code: 'PL' },
    { value: 'Португальский', code: 'PT' },
    { value: 'Румынский', code: 'RO' },
    { value: 'Словацкий', code: 'SK' },
    { value: 'Словенский', code: 'SL' },
    { value: 'Шведский', code: 'SV' },
    { value: 'Турецкий', code: 'TR' },
    { value: 'Украинский', code: 'UK' },
    { value: 'Китайский', code: 'ZH' },
];

const MainPage = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');

    const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
    const [isVideoProcessing, setIsVideoProcessing] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();

    const subtitles = useSelector(getVideoSubtitlesData);
    const videoError = useSelector(getVideoSubtitlesError);

    const dispatch = useAppDispatch();

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsVideoProcessing(true);
            const result = await dispatch(
                createSubtitles({ url: videoUrl, targetLanguage: selectedLanguage?.code || '' }),
            );
            setIsVideoProcessing(false);
        },
        [dispatch, selectedLanguage?.code, videoUrl],
    );

    const handleLanguageChange = useCallback((event: DropdownChangeEvent) => {
        event.preventDefault();
        const language = groupedLanguage.find((gl) => gl.value === event.value);
        setSelectedLanguage(language);
    }, []);

    useEffect(() => {
        console.log(selectedLanguage);
    }, [selectedLanguage]);

    const selectedCountryTemplate = (option: ILanguage, props: DropdownProps) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img
                        alt={option.value}
                        src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                        className={classNames(classes.flagIcon, {}, [
                            `flag flag-${option.code.toLowerCase()}`,
                        ])}
                        style={{ width: '18px' }}
                    />
                    <span>{option.value}</span>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option: ILanguage) => (
        <div className="flex align-items-center">
            <img
                alt={option.value}
                src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                className={classNames(classes.flagIcon, {}, [
                    `flag flag-${option.code.toLowerCase()}`,
                ])}
                style={{ width: '18px' }}
            />
            <span>{option.value}</span>
        </div>
    );

    return (
        <DynamicModuleLoader reducers={{ video: VideoSubtitlesReducer }}>
            <Page className={classNames(classes.MainPage, {}, [])}>
                {isVideoProcessing && <PageLoader />}
                <span className="fi fi-gr" /> <span className="fi fi-gr fis" />
                <form onSubmit={handleFormSubmit}>
                    <VStack gap="32" maxW justify="center" align="center">
                        <InputText
                            placeholder="Введите ID-видео YouTube"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <Dropdown
                            disabled={!videoUrl}
                            value={selectedLanguage?.value}
                            onChange={handleLanguageChange}
                            options={groupedLanguage}
                            optionLabel="value"
                            placeholder="Выберите язык перевода"
                            itemTemplate={countryOptionTemplate}
                            valueTemplate={selectedCountryTemplate}
                        />
                        <div className={classes.videoWrapper}>
                            {videoUrl && (
                                <YouTubePlayer
                                    setIsVideoReady={setIsVideoReady}
                                    videoUrl={videoUrl}
                                />
                            )}
                        </div>
                        {!subtitles?.subtitles && (
                            <Button disabled={!isVideoReady || !videoUrl}>
                                Отправить на перевод
                            </Button>
                        )}
                    </VStack>
                </form>
                {subtitles?.subtitles && (
                    <>
                        <VStack className={classes.subtitles} maxW justify="start" gap="8">
                            {subtitles?.subtitles.map((st) => (
                                <HStack
                                    align="start"
                                    key={st.startAt + st.endAt}
                                    justify="start"
                                    gap="16"
                                    maxW
                                >
                                    <InputText disabled value={`${st.startAt} - ${st.endAt}`} />
                                    <InputTextarea
                                        className={classes.textarea}
                                        autoResize
                                        value={st.text}
                                        rows={5}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                        <Button>Отправить на озвучку</Button>
                    </>
                )}
                {videoError && <Text title={videoError} variant="error" />}
            </Page>
        </DynamicModuleLoader>
    );
};

export default MainPage;

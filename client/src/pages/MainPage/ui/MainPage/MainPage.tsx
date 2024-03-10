import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/UI/Stack';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from 'shared/UI/PageLoader';
import { createSubtitles } from 'entities/VideoSubtitles/model/service/createSubtitles';
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';
import { Icon } from 'shared/UI/Icon/Icon';
import MainLogoIcon from 'shared/assets/icons/main-logo.svg';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
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
    const [videoId, setVideoId] = useState<string>('');

    const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
    const [isVideoProcessing, setIsVideoProcessing] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsVideoProcessing(true);
            const result = await dispatch(
                createSubtitles({ url: videoUrl, targetLanguage: selectedLanguage?.code || '' }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.not_found);
            }
            setIsVideoProcessing(false);
        },
        [dispatch, selectedLanguage?.code, videoUrl],
    );

    useEffect(() => {
        const id = videoUrl.match(
            /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/,
        );
        if (id) setVideoId(id[1]);
    }, [videoUrl]);

    const handleLanguageChange = useCallback((event: DropdownChangeEvent) => {
        event.preventDefault();
        const language = groupedLanguage.find((gl) => gl.value === event.value);
        setSelectedLanguage(language);
    }, []);

    const selectedCountryTemplate = (option: ILanguage, props: DropdownProps) => {
        if (option) {
            return (
                <HStack maxW justify="start">
                    <img
                        alt={option.value}
                        src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                        className={classNames(classes.flagIcon, {}, [
                            `flag flag-${option.code.toLowerCase()}`,
                        ])}
                        style={{ width: '18px' }}
                    />
                    <span>{option.value}</span>
                </HStack>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const countryOptionTemplate = (option: ILanguage) => (
        <HStack maxW justify="start">
            <img
                alt={option.value}
                src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                className={classNames(classes.flagIcon, {}, [
                    `flag flag-${option.code.toLowerCase()}`,
                ])}
                style={{ width: '18px' }}
            />
            <span>{option.value}</span>
        </HStack>
    );

    if (isVideoProcessing) {
        return (
            <Page>
                <PageLoader />
            </Page>
        );
    }

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack maxW align="center">
                <Icon Svg={MainLogoIcon} className={classes.logo} />
                <Divider className={classes.divider} />

                <form onSubmit={handleFormSubmit}>
                    <VStack maxW gap="16">
                        <Dropdown
                            className={classes.dropdown}
                            value={selectedLanguage?.value}
                            onChange={handleLanguageChange}
                            options={groupedLanguage}
                            optionLabel="value"
                            placeholder="Язык перевода"
                            itemTemplate={countryOptionTemplate}
                            valueTemplate={selectedCountryTemplate}
                        />
                        <InputText
                            value={videoUrl}
                            onChange={(event) => setVideoUrl(event.target.value)}
                            className={classes.dropdown}
                            placeholder="Ссылка на видео, например: https://www.youtube.com/watch?v=Va17GepmQjo"
                        />
                        <div className={classes.videoWrapper}>
                            {isVideoProcessing || !videoUrl || !selectedLanguage ? (
                                <Skeleton width="100%" height="360px" />
                            ) : (
                                <YouTube
                                    key={videoUrl}
                                    className={classes.video}
                                    videoId={videoId}
                                    id={videoId}
                                    onReady={() => setIsVideoReady(true)}
                                />
                            )}
                        </div>
                        <Button
                            disabled={!videoUrl || !selectedLanguage || !isVideoReady}
                            className={classes.button}
                        >
                            Перевести
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Page>
    );
};

export default MainPage;

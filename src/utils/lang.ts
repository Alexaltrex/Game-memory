import {LangType} from "../types/type";

export const rulesEng = [
    'The field size NxN contains NxN/2 paired cards with different icons arranged in random order',
    'When you press the card, it opens, within 5 seconds the player needs to open the second card, if the icons on the pair of open cards match they are deleted, if not - the pair of open cards close',
    'The game ends when all card pairs are found'
];
export const rulesRus = [
    'Поле размером NхN содержит NхN/2 парных карточек с различными иконками, расположенными в случайном порядке',
    'По нажатию на карточку она открывается, в течении 5 сек игроку нужно открыть вторую карточку, если иконки на паре открытых карт совпадают они удаляются, если нет - пара открытых карт закрываются',
    'Игра заканчивается когда все пары карт найдены'
];

export const Lang: LangObjectType = {
    'English': {
        'eng': 'English',
        'rus': 'Русский'
    },
    'Change language': {
        'eng': 'Change language',
        'rus': 'Сменить язык'
    },
    'Game Memory': {
        'eng': 'Game Memory',
        'rus': 'Игра-На-Память'
    },
    'Game': {
        'eng': 'Game',
        'rus': 'Игра'
    },
    'Rules': {
        'eng': 'Rules',
        'rus': 'Правила'
    },
    'Settings': {
        'eng': 'Settings',
        'rus': 'Настройки'
    },
    'Statistic': {
        'eng': 'Statistic',
        'rus': 'Статистика'
    },
    'Size of game field': {
        'eng': 'Size of game field',
        'rus': 'Размер игрового поля'
    },
    'Start': {
        'eng': 'Start',
        'rus': 'Старт'
    },
    'Stop': {
        'eng': 'Stop',
        'rus': 'Стоп'
    },
    'Total time': {
        'eng': 'Total time',
        'rus': 'Общее время'
    },
    'Step time': {
        'eng': 'Step time',
        'rus': 'Время хода'
    },
    'Count of opened cards': {
        'eng': 'Count of opened cards',
        'rus': 'Количество открытых карт'
    },
    'You win!': {
        'eng': 'You win!',
        'rus': 'Вы выиграли!'
    },
    [rulesEng[0]]: {
        'eng': rulesEng[0],
        'rus': rulesRus[0]
    },
    [rulesEng[1]]: {
        'eng': rulesEng[1],
        'rus': rulesRus[1]
    },
    [rulesEng[2]]: {
        'eng': rulesEng[2],
        'rus': rulesRus[2]
    }
};

// const lang = useSelector(getLang);
// {translate(lang, '')}

export const translate = (lang: LangType, phrase: string): string => {
    return lang === 'rus' ? Lang[phrase].rus : Lang[phrase].eng
};

type LangObjectType = {
    [key: string]: {
        'eng': string
        'rus': string
    }
}


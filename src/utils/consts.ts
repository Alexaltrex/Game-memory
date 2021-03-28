export const headerHeight = 50;
export const sidebarWidth = 150;
export const sizeMin = 4;
export const sizeMax = 8;
export const stepTime = 5;
export const animOpenDuration = 400; // продожительность анимации открытия карточки
                                     // = ожидание обработки сравнения карточек
export const animCloseDuration = 200; // продожительность анимации закрытия карточки

// firstCardIsOpen: boolean (false)
// card.status = 'close' | 'open' | 'end'
// firstCardIndex: null as null | number
// secondCardIndex: null as null | number
// endCardCount: 0 // количество угаданных пар
// stepCount: 0 // количество ходов (для статистики)
// если firstCardIsOpen = true, то stepStart = true (взаимосвязаны)
//
// При нажатии на карточку:
// если ее статус 'open' или 'end' - ничего не делать (сделать такие карточки не нажимаемыми)
//
// если ее статус 'close' и firstCardIsOpen = false (значит выбрана первая карточка):
// 1. Запустить обратный таймер хода
// 2. firstCardIndex => card.index
// 3. firstCardIsOpen => true (stepStart => true)
// 4. cards[card.index].status => 'open'
//
// если таймер хода истек и вторая карточка не выбрана:
// cards[firstCardIndex].status = 'close'
// firstCardIndex => null
//
// если ее статус 'close', firstCardIsOpen = true и таймер не истек (значит выбрана вторая карточка):
// 1. card.status => 'open'

// 2. Проверка совпадения: cards[firstCardIndex].symbol === cards[card.index].symbol

// 2.1. совпадение:
// 2.1.1. cards[firstCardIndex].status = 'end'
// 2.1.2. cards[card.index].status = 'end'
// stepCount = stepCount + 1
// 2.1.3. firstCardIsOpen => false (stepStart => false)
// 2.1.3. остановка и сброс таймера хода (stepStart => false)

// 2.2. нет совпадения:
// 2.2.1. cards[firstCardIndex].status = 'close'
// 2.2.2. cards[card.index].status = 'close'
// 2.2.3. firstCardIsOpen => false (stepStart => false)
// 2.2.3. остановка и сброс таймера хода (stepStart => false)
//
//
//



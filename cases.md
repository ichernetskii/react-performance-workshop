## LayoutTrashing:
***Симптом: долго изменяет размера куба***

***Решение:***
Использовать Chrome profiler

`App.js: <Pixel />`:
1. `CSS` only solution
2. `requestAnimationFrame` or `setTimeout`
3. Обратить внимание на CSS анимации

## Debouncing:
***Симптом: лагает при изменении размера куба***

***Решение:***
`App.js` → `input[range]` → `onChange`: обернуть в `debounce`

## Concurrent mode:
***Симптом: UI фризится при изменении размера куба***

***Решение:***
React profiler → `<App />` hook 2 changed → `App.jsx` → `input[type=range]` → `onChange` → `startTransition(() => { setSize(size) })`

## React: Вынесение state в компонент:
***Симптом: Нажать Checkbox у title: ререндерится всё приложение***

***Решение:***
"Highlight updates" в React profiler → React profiler → `<App />` hook 5 and 13 changed → `App.js` → где используется `setBoldTitle` → в отдельный компонент `<Title />` (чтобы не обновлялось все приложение)

## React: Объект в контексте:
***Симптом: При нажатии Show/Hide loaders ререндерится Dark theme.***

***Решение:***

1. `StyleProvider.js`: обернуть контекст в useMemo
2. `ThemeSwitcher.js` обернуть компонент в memo

## Redux: Обновление state таким же state:
***Симптом: Нажимать "Close loaders" при уже закрытых лоадерах: всё приложение ререндерится***

***Решение:***

В редьюсере: `loaderSlice.js`
1. Проверять `isVisible` перед изменением: `if (state.isVisible) {state.isVisible = false}`
2. Использовать `produce` из `immer`: `return produce(state, draft => {draft.isVisible = false});`

## Redux: Функция внутри `useSelector` возвращает разные объекты:
***Симптом: При нажатии "Show/close loader" ререндерится `App.js` - `<Select />`***

***Решение:***

1. `state => state.logItems`, а фильтровать в `<Select />`
2. Возвращать примитив: `state => state.logItems.filter(item => item.size >= 100).map(item => `size: ${item.size}, color: ${item.color}`).join(“;”)`
3. В селектор добавить `isEqual` from lodash - может быть дорого
4. Своя функция сравнения: `(a, b) => a.length === b.length`
5. `Reselect`: Селектор заменить на `createSelector(state => state.logItems, logItems => logItems.filter(item => item.size >= 100))`

## MobX
1. Деструктурировать значения стора как можно ниже в дереве компонентов
2. Лучше дробить на более мелкие компоненты
3. Изменять состояние нужно внутри функций `action`, `runInAction` или метода стора (если помечен как `action`)

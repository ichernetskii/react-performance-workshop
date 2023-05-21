## LayoutTrashing:
`App.js: <Pixel />`
1. `CSS` only solution
2. `rAF` or setTimeout

## Debouncing:
`App.js`: input[range], `onChange`: `debounce`

Concurrent mode:
`App.js` - input[range], `onChange`: `startTransition`

## React: Вынесение state в компонент:
***Симптом: Checkbox у title: ререндерится все приложение***

`App.js` - `div.controlsTitleWrapper` - в отдельный компонент (чтобы не обновлялось все приложение)

## React: Объект в контексте:
***Симптом: При нажатии Show/Hide loaders ререндерится Dark theme.***

`StyleProvider.js`: обернуть контект в useMemo
`ThemeSwitcher.js` обернуть компонент в memo

## Redux: Обновление state таким же state:
***Симптом: Нажимать Close loaders при уже закрытых лоадерах - всё приложение ререндерится***

В редьюсере: `loaderSlice.js`
1. Проверять `isVisible`
2. produce из `immer`: `return produce(state, draft => {draft.isVisible = false});`

### Redux: Функция внутри useSelector возвращает разные объекты:
***Симптом: При нажатии Show/close loader ререндерится `App.js` - `<Select />`***

1. `state => state.logItems`, а фильтровать в <Select />
2. Возвращать примитив: `state => state.logItems.filter(item => item.size >= 100).map(item => `size: ${item.size}, color: ${item.color}`).join(“;”)`
3. В селектор добавить `isEqual` from lodash - может быть дорого
4. Своя функция сравнения: `(a, b) => a.length === b.length`
5. `Reselect`: Селектор заменить на `createSelector(state => state.logItems, logItems => logItems.filter(item => item.size >= 100))`

### MobX
1. Деструктурировать значения стора как можно ниже в дереве компонентов
2. Лучше дробить на более мелкие компоненты
3. Изменять состояние нужно внутри функций `action`, `runInAction` или метода стора (если помечен как `action`)

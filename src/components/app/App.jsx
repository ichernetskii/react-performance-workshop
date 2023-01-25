import styles from "./App.module.css";
import {useLayoutEffect, useRef, useState} from "react";
import {Loader} from "../loader/Loader";
import {Button} from "../button/button";
import {getRandomColor} from "../../utils";
import {ThemeSwitcher} from "../style/ThemeSwitcher";
import {StyleProvider} from "../style/StyleProvider";
import {useDispatch, useSelector} from "react-redux";
import {add} from "../../redux/logSlice";
import {toggleLoader, closeLoader} from "../../redux/loaderSlice";

const Pixel = ({color = "#000", size = 1}) => {
	const ref = useRef(null);
	const contentSize = size - 1;
	useLayoutEffect(() => {
		if (ref.current) {
			ref.current.style.backgroundColor = color;
			ref.current.style.width = `${contentSize}px`;
			ref.current.style.height = `${contentSize}px`;

			if (ref.current.clientWidth > 10) {
				ref.current.style.borderRadius = "50%";
			}
		}
	}, [color, contentSize]);

	return (
		<div
			ref={ref}
			className={styles.pixel}
		/>
	);
};

const pixelSize = 5;

const Select = ({items}) => (
	<select className={styles.log} multiple={true} size="5" >
		{
			items.map(({id, size, color}) => (
				<option key={id}>size: {size}, color: {color}</option>
			))
		}
	</select>
);

function App() {
	const [color, setColor] = useState("#F00");
	const [size, setSize] = useState(20);

	const loader = useSelector(state => state.loader);
	const logBigItems = useSelector(
		state => state.logItems.filter(item => item.size >= 100),
	);
	const dispatch = useDispatch();

	return (
		<StyleProvider>
			<div className={styles.app}>
				<div className={styles.controls}>
					<input
						type="range"
						min={50}
						max={700}
						step={10}
						onChange={e => {
							const size = +e.target.value;
							setSize(size);
							dispatch(add({ size, color }));
						}}
					/>
					Size: {size}
					<Select items={logBigItems} />
					<Button
						text="Change color"
						onClick={() => {
							const color = getRandomColor();
							setColor(color);
							dispatch(add({ size, color }));
						}}
					/>
					<Button
						text={`${loader.isVisible ? "Hide" : "Show"} loaders`}
						onClick={() => {
							dispatch(toggleLoader());
						}}
					/>
					<Button
						text="Close loaders"
						onClick={() => {
							dispatch(closeLoader());
						}}
					/>
					{loader.isVisible && (
						<>
							<span style={{ marginTop: 15 }}>width, height</span><Loader />
							<span>transform: scale</span><Loader transform={true}/>
						</>)
					}
					<ThemeSwitcher />
				</div>
				<div className={styles.content}>
					<div
						className={styles.pixelsWrapper}
						style={{
							width: size,
							height: size,
						}}
					>
						{
							Array
								.from({ length: (size / pixelSize) ** 2 })
								.map((_, i) => <Pixel key={i} size={pixelSize} color={color} />)
						}
					</div>
				</div>
			</div>
		</StyleProvider>
	);
}

export default App;

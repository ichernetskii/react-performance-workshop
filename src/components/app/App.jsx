import styles from "./App.module.css";
import {useLayoutEffect, useRef, useState} from "react";
import {Loader} from "../loader/Loader";
import {Button} from "../button/button";
import {getRandomColor} from "../../utils";
import {ThemeSwitcher} from "../style/ThemeSwitcher";
import {StyleProvider} from "../style/StyleProvider";

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

function App() {
	const [color, setColor] = useState("#FF0000");
	const [size, setSize] = useState(30);
	const [isLoaderVisible, setLoaderVisible] = useState(false);

	return (
		<StyleProvider>
			<div className={styles.app}>
				<div className={styles.controls}>
					<input
						type="range"
						min={50}
						max={700}
						step={10}
						onChange={e => setSize(+e.target.value)}
					/>
					Size: {size}
					<Button
						text="Change color"
						onClick={() => {
							setColor(getRandomColor());
						}}
					/>
					<Button
						text={`${isLoaderVisible ? "Hide" : "Show"} spinners`}
						onClick={() => setLoaderVisible(!isLoaderVisible)}
					/>
					{isLoaderVisible && (
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

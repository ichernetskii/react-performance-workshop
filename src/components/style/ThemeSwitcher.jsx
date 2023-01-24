import {useContext} from "react";
import {StyleContext} from "./StyleProvider";

export const ThemeSwitcher = () => {
	const {style: {theme}, setStyle} = useContext(StyleContext);

	return (
		<div>
			<input
				checked={theme === "dark"}
				type="checkbox"
				id="input-theme"
				onChange={() => setStyle(style => ({...style, theme: theme === "dark" ? "light" : "dark"}))}
			/>
			<label htmlFor="input-theme">Dark theme</label>
		</div>
	);
};

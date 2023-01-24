import {createContext, useEffect, useState} from "react";

export const StyleContext = createContext(null);

export function StyleProvider({ children }) {
	const [style, setStyle] = useState({ theme: "light", buttonColor: "#F00" });
	const {theme} = style;

	useEffect(() => {
		document.body.classList.add(theme);
		return () => document.body.classList.remove(theme);
	});

	return (
		<StyleContext.Provider value={{style, setStyle}}>
			{children}
		</StyleContext.Provider>
	);
}

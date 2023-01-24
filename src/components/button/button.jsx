import styles from "./button.module.css";
export const Button = ({text, onClick}) => (
	<button
		className={styles.button}
		onClick={onClick}
	>
		{text}
	</button>
);

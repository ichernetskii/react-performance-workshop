import styles from "./Loader.module.css";
import classnames from "classnames";

export const Loader = ({transform = false}) => (
	<div className={styles.loaderWrapper}>
		<div className={classnames(styles.loader, transform && styles.loaderTransform)} />
	</div>
);

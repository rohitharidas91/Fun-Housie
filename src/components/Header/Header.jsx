import { useTheme } from '../Theme/ThemeProvider';
import styles from './Header.module.css'
import { FaSun, FaMoon } from 'react-icons/fa';
//Header of the application
function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className={styles.appHeader}>
                <h1>Fun Housie</h1>
                <button className={styles.themeButton} onClick={toggleTheme} data-theme={theme}>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
            </div>
        </>
    )
}

export default Header;
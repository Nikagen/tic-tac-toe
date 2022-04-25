import styles from './Home.module.sass'

import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <span>sdfsdfffffffffffffffffffffffffffffffffffffffffffff</span>Test sdfsdfffffffffffffffffffffffffffffffffffffffffffff

            <Link to='/game' className={styles.playBtn}>Play</Link>
        </>
    );
}

export default Home;
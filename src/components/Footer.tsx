import React from 'react';
import styles from '../styles/footer.module.css'

import web from '/icons/web.svg'
import github from '/icons/github.svg'

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <a href='https://github.com/agusdubreucq1?tab=repositories' target='_blank'><img src={github}></img></a>
                <a href='https://agusdubreucq.com/' target='_blank'><img src={web}></img></a>
            </div>
        </footer>
    );
};

export default Footer
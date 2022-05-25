import styles from './Square.module.sass';

interface Properties {
    value: string
    click: any
}

function Square(props: Properties) {
    const {value, click} = props

    return (
        <button className={styles.square} onClick={click}>
            {value}
        </button>
    )
}
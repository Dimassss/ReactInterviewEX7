import styles from "../../styles/ModalContainer.module.css"

type Props = {
    children: any,
    show: boolean
}

export default function ModalContainer({children, show}: Props){

    return (<div className={styles.container} style={show ? {display: "flex"} : {}}>
        <div className={styles.innerContainer}>
            {children}
        </div>
    </div>)
}
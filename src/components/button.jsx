export default function Button({style, onBtnClick, value}) {
    return <button className={`${style}`} onClick={onBtnClick}>{value}</button>
}

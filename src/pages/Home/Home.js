import clsx from 'clsx'
import style from '~/pages/Home/Home.module.scss'


function Home ({disable}) {
    // const classes = clsx({
    //     [style.disable] : disable
    // }, 'header', 'awdawd')
    return <h1 className={style.header}>Đây là trang chủ</h1>
}


export default Home
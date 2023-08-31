import { Inter, Readex_Pro } from "next/font/google";
import styles from './index.module.scss';
import Link from "next/link";
import { cn } from "@/utils/tw";

const readex = Readex_Pro({subsets: ["latin"]})
const inter = Inter({subsets: ['latin']})

const Landing = () => {
    return (
        <div className={inter.className}>
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <svg height="48px" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M54.8634 7.49422L54.8463 6.80276L54.2364 6.48866C45.947 2.23607 36.7631 0.0119833 27.4427 0C18.1222 0.0116106 8.93823 2.23571 0.648958 6.48866L0.0390675 6.80276L0.0220037 7.49422C-0.203873 15.8509 1.31136 24.1634 4.47176 31.9052C9.9437 45.3135 19.0359 53.8595 25.6764 58.6511L27.4427 60L29.187 58.6706C35.8519 53.8595 44.9441 45.3135 50.4112 31.9052C53.5716 24.1633 55.0876 15.851 54.8634 7.49422ZM48.2082 31.0263C42.9461 43.9305 34.1954 52.143 27.7549 56.791L27.4402 57.0344L27.1012 56.7764C20.6875 52.1503 11.9368 43.9232 6.67467 31.0287C3.72358 23.8018 2.26487 16.0546 2.38593 8.25143C9.89614 4.51529 18.1474 2.49978 26.5376 2.35199C27.1524 2.35199 27.7574 2.35199 28.3624 2.35199C36.7526 2.49987 45.0038 4.51537 52.5141 8.25143C52.628 16.0571 51.1635 23.8056 48.2082 31.0336V31.0263Z" fill="black"/>
                        <path d="M29.9748 11.5213C36.5242 11.8001 42.9825 13.1567 49.0888 15.5363L49.2254 10.0093C42.5877 7.46951 35.5442 6.1497 28.4355 6.1137H28.0915C21.2336 6.11026 14.4277 7.30087 7.97976 9.63196L5.42552 10.45C5.33637 14.7892 6.01269 19.1102 7.42354 23.2155C8.25543 22.972 9.44592 22.6434 10.8877 22.3195C17.76 20.7759 23.2197 20.9147 26.9742 21.0072C31.9599 21.1321 36.9213 21.7445 41.7872 22.8357C41.9722 23.6578 41.939 24.5139 41.6908 25.3192C41.4427 26.1246 40.9882 26.8514 40.3723 27.4277C31.2611 28.5997 22.0149 28.177 13.0492 26.1786L7.81386 25.0246L9.94115 29.8746C11.6468 33.7578 13.7807 37.4392 16.3036 40.8506C19.645 45.3691 23.6293 49.3768 28.1306 52.7468L31.4191 48.4689C29.2085 46.8103 27.1325 44.9802 25.2104 42.9956C26.0228 43.0589 26.8351 43.1076 27.65 43.1344C28.229 43.1538 28.8071 43.1636 29.3845 43.1636C32.4258 43.1624 35.4613 42.8993 38.4572 42.3772L37.5107 37.0864C31.7488 38.0954 25.8487 38.0211 20.1141 36.8673C19.1012 35.4403 18.1616 33.963 17.2989 32.4408C25.7737 33.7549 34.3994 33.7746 42.8801 32.4993L44.5878 32.2558C46.7553 28.1401 48.136 23.6576 48.6595 19.0375L45.9394 18.307C40.6593 16.9181 35.253 16.0609 29.8016 15.7481C29.3318 14.3637 29.3988 12.8539 29.9895 11.5165L29.9748 11.5213ZM10.7608 14.1801C15.1516 12.8011 19.6893 11.9406 24.2809 11.6163C24.1414 12.2874 24.0598 12.9692 24.037 13.6542C24.0078 14.4514 24.0551 15.2496 24.1784 16.0378C19.8788 16.0849 15.5881 16.4389 11.339 17.0969C11.0859 16.9309 10.8711 16.7131 10.7087 16.4578C10.5464 16.2026 10.4402 15.9159 10.3973 15.6166C10.3395 15.1096 10.4687 14.5989 10.7608 14.1801Z" fill="black"/>
                    </svg>
                    <div className={styles.container__header__links}>
                        <Link href={"https://google.com"}>
                            <span className={styles.container__header__links__link}>Features</span>
                        </Link>
                        <Link href={"https://google.com"}>
                            <span className={styles.container__header__links__link}>How it works</span>
                        </Link>
                        <button className={styles.container__header__links__button}>
                            Order Now
                        </button>
                    </div>
                </div>
                <div className={styles.container__content}>
                    <div className={readex.className}>
                        <h1 className={styles.container__content__heading}>Level up your Privacy.</h1>
                        <h2 className={styles.container__content__subheading}>Get an ASFALT now.</h2>
                    </div>
                    <div className={styles.container__bottom}>
                      
                        <div style={{position: 'relative'}}>
                        <div className={styles.container__image}>

                        </div>
                            <h1 className={cn(styles.container__bottom__heading, readex.className)}>ASFALT</h1>
                        </div>
                        <h2 className={styles.container__bottom__tagline}>Not even DADA-CON can track you.</h2>
                        <button className={styles.container__bottom__button}>
                            Buy Now
                            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.12549 2.75049L7.87638 6.4996L4.12726 10.2505" stroke="#454545" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;
import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Nhiel T. Repairs</span></h1>
            </header>
            <main className="public__main">
                <p>Located at Concepcion Tarlac, Nhiel T. Repairs provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                   Nhiel T. Repairs<br />
                    Sta Rosa Concepcion<br />
                    Tarlac, CA 12345<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Nhiel Tanedo</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public
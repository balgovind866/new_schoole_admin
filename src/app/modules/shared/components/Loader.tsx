import { Spinner } from "react-bootstrap"

const Loader = () => {
    const styles = {
        fontWeight: '900',
        margin: '0',
        width: 'auto',
        padding: '1rem 2rem',
        top: 'calc(50% - 2rem)',
        left: 'calc(50% - 5rem)',
    }

    const spinnerStyle = {
        top: 'calc(50% - 4rem)',
        left: 'calc(50% - 1rem)',
    }

    return (
        <>
            <Spinner
                animation="border"
                role="status"
                variant="primary"
                style={{ ...spinnerStyle, position: 'absolute', textAlign: 'center' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h3 style={{ ...styles, position: 'absolute', textAlign: 'center' }}>Processing...</h3>
        </>

    )
}

export { Loader }
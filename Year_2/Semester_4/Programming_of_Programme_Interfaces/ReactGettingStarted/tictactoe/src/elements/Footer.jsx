const Footer = () => {
    const FooterStyle = {
        color: "black",
        padding: "10px",
        fontFamily: "Century Gothic",
        textAlign: "center",
        position: "sticky",
    };
    return (
        <>
            <footer style={FooterStyle}>
                <p>&copy; Bogomil Ivanov, 2025.</p>
            </footer>
        </>
    );
}

export default Footer;
export default function PageFooter({ version }) {
    return (

        <footer>
            <h1>
                <div>Copyright &copy;2025 Tim Stanford - <a href="https://github.com/tstanford/bookmark-homepage">Github Project</a></div>
                <div className="version">Version: {version}</div>
            </h1>
        </footer>
    )
}
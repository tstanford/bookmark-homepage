export default function PageFooter({ version }) {
    return (

        <footer>
            <h1>
                <div role="copyright">Copyright &copy;2025 Tim Stanford - <a href="https://github.com/tstanford/bookmark-homepage">Github Project</a></div>
                <div role="version" className="version">Version: {version}</div>
            </h1>
        </footer>
    )
}
export default function PageFooter({ version }) {
    return (

        <footer>
            <h1>
                <div>Created By Tim Stanford - <a href="https://github.com/tstanford/bookmark-homepage">Github Project</a></div>
                <div className="version">bookmark-bomepage build: {version}</div>
            </h1>
        </footer>
    )
}
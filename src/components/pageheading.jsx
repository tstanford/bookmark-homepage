export default function PageHeading({ version, date, appDropHandler, appDragoverHandler }) {
    return (

        <header onDrop={appDropHandler} onDragOver={appDragoverHandler}>
            <h1>
                <div className="titlecase">Tim's Home Page</div>
                <div className="date">{date} - {version}</div>
            </h1>
        </header>
    )
}
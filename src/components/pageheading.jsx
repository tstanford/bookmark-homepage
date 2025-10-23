export default function PageHeading({ date, appDropHandler, appDragoverHandler }) {
    return (

        <header onDrop={appDropHandler} onDragOver={appDragoverHandler}>
            <h1>
                <div className="titlecase">Tim's Home Page</div>
                <div className="date">{date}</div>
            </h1>
        </header>
    )
}
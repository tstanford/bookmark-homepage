export default function PageHeading({ date }) {
    return (

        <header>
            <h1>
                <div className="titlecase">Tim's Home Page</div>
                <div className="date">{date}</div>
            </h1>
        </header>
    )
}
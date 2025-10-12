export default function PageHeading({ date }) {
    return (

        <header>
            <h1>
                <div class="titlecase">Tim's Home Page</div>
                <div class="date">{date}</div>
            </h1>
        </header>
    )
}
import PageFooter from "./components/pagefooter";
import PageHeading from "./components/pageheading";

export default function Admin({logout}){
    return (

        <>
            <PageHeading logout={logout} adminMode={true}></PageHeading>
            
            <h1>Hello admin</h1>

            <PageFooter></PageFooter>
        </>

    );
}
import PageFooter from "../components/pagefooter";
import PageHeading from "../components/pageheading";

export default function Admin({logout}){
    const APP_VERSION = window.env.BMS_VERSION;

    return (

        <>
            <PageHeading logout={logout} adminMode={true}></PageHeading>
            
            <h1>Hello admin</h1>

            <PageFooter version={APP_VERSION}></PageFooter>
        </>

    );
}
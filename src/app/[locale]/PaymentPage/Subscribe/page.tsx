import Header from "@/app/[locale]/Home/Components/Header";
import ChooseAPlan from "./components/ChooseAPlan";
import Btn_Continue from "./components/Btn_Continue";

function index() {
    return (

        <>
            <Header/>

            <main className="px-4 h-[calc(100vh-30vh)]  flex flex-col justify-between">
                <ChooseAPlan/>
            </main>
        </>
    );
}

export default index;
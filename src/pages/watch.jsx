import NavBar from "../components/NavBar"

export default function Watch() {
    return(
    <>
        <NavBar />
        <div className="not-downloaded">
            <img src="stickman.png" />
            Seems you haven't downloaded this one
        </div>

    </>
    )
}
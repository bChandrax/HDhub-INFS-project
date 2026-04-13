import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { SocialIcon } from "react-social-icons"

export default function LoginPage() {

    const sliderRef = useRef(null);
    const passRef = useRef(null);
    const [hasSlid, setHasSlid] = useState(false);

    // signin refs
    const signinHeaderRef = useRef(null);
    const signinLinksRef = useRef(null);
    const signinAltRef = useRef(null);
    const signinForgotRef = useRef(null);
    const signinInputRef = useRef(null);
    const signinButtonRef = useRef(null);

    // createacc refs
    const creHeaderRef = useRef(null);
    const creLinksRef = useRef(null);
    const creAltRef = useRef(null);
    const creForgotRef = useRef(null);
    const creInputRef = useRef(null);
    const creButtonRef = useRef(null);

    function shiftSignElements(direction) {
        const val = direction === "right" ? "translateX(30vw)" : "translateX(0)";
        const transition = direction === "right"
            ? "transform 0.5s ease"
            : "transform 0.5s ease 0.25s";
        [signinHeaderRef, signinLinksRef, signinAltRef, signinForgotRef, signinInputRef, signinButtonRef].forEach(ref => {
            if (ref.current) {
                ref.current.style.transition = transition;
                ref.current.style.transform = val;
            }
        });
    }

    function shiftCreElements(direction) {
        const val = direction === "left" ? "translateX(-30vw)" : "translateX(0)";
        const transition = direction === "left"
            ? "transform 0.5s ease"
            : "transform 0.5s ease 0.25s";
        [creHeaderRef, creLinksRef, creAltRef, creForgotRef, creInputRef, creButtonRef].forEach(ref => {
            if (ref.current) {
                ref.current.style.transition = transition;
                ref.current.style.transform = val;
            }
        });
    }

    function ToCre() {
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform = "translateX(-33.33%)";
        passRef.current.style.transition = "border-radius 1s ease";
        passRef.current.style.borderRadius = "1vw 20% 20% 1vw";
        shiftSignElements("right");
        shiftCreElements("none");
    }

    function ToSi() {
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform = "translateX(0px)";
        passRef.current.style.transition = "border-radius 1s ease";
        passRef.current.style.borderRadius = "20% 1vw 1vw 20%";
        shiftSignElements("none");
        shiftCreElements("left");
    }

    function Slide() {
        if (!hasSlid) {
            ToCre();
            setHasSlid(true);
        } else {
            ToSi();
            setHasSlid(false);
        }
    }

    return (
        <div className="login-wrapper">
        <div className="overflow-cutoff">
            <div className="cont" id="slider" ref={sliderRef}>

                <div className="signin">
                    <h1 ref={signinHeaderRef}>Sign in</h1>
                    <div className="inputholder" ref={signinInputRef}>
                        <input placeholder="Email" /><br />
                        <input placeholder="Password" />
                    </div>
                    <p className="forgot" ref={signinForgotRef}>Forgot your password?</p>
                    <button className="done" ref={signinButtonRef}>
                        <b>Sign In</b>
                    </button>
                </div>

                <div className="pass" ref={passRef}>
                    <div className="default" id="PD" style={{ display: hasSlid ? "none" : "flex" }}>
                        <h2>Hi, Friend</h2>
                        <p>first time together?</p>
                        <button className="switch" onClick={Slide}>
                            Create Account
                        </button>
                    </div>

                    <div className="pass-alt" id="PA" style={{ display: hasSlid ? "flex" : "none" }}>
                        <h2>Been Here Before?</h2>
                        <p>No problem, Let's sign in</p>
                        <button className="switch" onClick={Slide}>
                            Log In
                        </button>
                    </div>
                </div>

                <div className="CreateAcc">
                    <h1 ref={creHeaderRef}>Register</h1>
                    <div className="inputholder" ref={creInputRef}>
                        <input placeholder="Name" /><br />
                        <input placeholder="Email" /><br />
                        <input placeholder="Password" />
                    </div>
                    <p className="forgot" ref={creForgotRef}>Forgot your password?</p>
                    <button className="done" ref={creButtonRef}>
                        Sign Up
                    </button>
                </div>

            </div>
        </div>
        </div>
    );
}
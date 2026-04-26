import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const MOBILE_BP = 768;

function isMobile() {
    return window.innerWidth <= MOBILE_BP;
}

export default function LoginPage() {

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const sliderRef = useRef(null);
    const passRef   = useRef(null);
    const [hasSlid, setHasSlid] = useState(false);

    // signin refs
    const signinHeaderRef = useRef(null);
    const signinLinksRef  = useRef(null);
    const signinAltRef    = useRef(null);
    const signinForgotRef = useRef(null);
    const signinInputRef  = useRef(null);
    const signinButtonRef = useRef(null);

    // createacc refs
    const creHeaderRef = useRef(null);
    const creLinksRef  = useRef(null);
    const creAltRef    = useRef(null);
    const creForgotRef = useRef(null);
    const creInputRef  = useRef(null);
    const creButtonRef = useRef(null);

    // form state
    const [signInEmail,    setSignInEmail]    = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [regName,        setRegName]        = useState("");
    const [regEmail,       setRegEmail]       = useState("");
    const [regPassword,    setRegPassword]    = useState("");
    const [error,          setError]          = useState("");
    const [loading,        setLoading]        = useState(false);

    // ── Element shift helpers (direction-aware) ───────────────────────────────

    function shiftSignElements(direction) {
        const mobile = isMobile();
        let val, transition;
        if (direction === "out") {
            val        = mobile ? "translateY(-30vh)" : "translateX(30vw)";
            transition = "transform 0.5s ease";
        } else {
            val        = mobile ? "translateY(0)"     : "translateX(0)";
            transition = "transform 0.5s ease 0.25s";
        }
        [signinHeaderRef, signinLinksRef, signinAltRef, signinForgotRef, signinInputRef, signinButtonRef].forEach(ref => {
            if (ref.current) {
                ref.current.style.transition = transition;
                ref.current.style.transform  = val;
            }
        });
    }

    function shiftCreElements(direction) {
        const mobile = isMobile();
        let val, transition;
        if (direction === "out") {
            val        = mobile ? "translateY(30vh)"  : "translateX(-30vw)";
            transition = "transform 0.5s ease";
        } else {
            val        = mobile ? "translateY(0)"     : "translateX(0)";
            transition = "transform 0.5s ease 0.25s";
        }
        [creHeaderRef, creLinksRef, creAltRef, creForgotRef, creInputRef, creButtonRef].forEach(ref => {
            if (ref.current) {
                ref.current.style.transition = transition;
                ref.current.style.transform  = val;
            }
        });
    }

    // ── Slide to Register ─────────────────────────────────────────────────────

    function ToCre() {
        const mobile = isMobile();
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = mobile ? "translateY(-100%)" : "translateX(-30vw)";
        passRef.current.style.transition   = "border-radius 1s ease";
        passRef.current.style.borderRadius = mobile ? "1vw 1vw 20% 20%" : "1vw 20% 20% 1vw";
        shiftSignElements("out");
        shiftCreElements("reset");
    }

    // ── Slide back to Sign In ─────────────────────────────────────────────────

    function ToSi() {
        const mobile = isMobile();
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = mobile ? "translateY(0)" : "translateX(0)";
        passRef.current.style.transition   = "border-radius 1s ease";
        passRef.current.style.borderRadius = mobile ? "20% 20% 1vw 1vw" : "20% 1vw 1vw 20%";
        shiftSignElements("reset");
        shiftCreElements("out");
    }

    function Slide() {
        setError("");
        if (!hasSlid) { ToCre(); setHasSlid(true); }
        else           { ToSi(); setHasSlid(false); }
    }

    // ── Resize listener — fix transforms when crossing breakpoint ────────────

    useEffect(() => {
        function handleResize() {
            if (!sliderRef.current || !passRef.current) return;
            const mobile = isMobile();

            // Snap slider to correct position for new breakpoint
            sliderRef.current.style.transition = "none";
            if (hasSlid) {
                sliderRef.current.style.transform = mobile ? "translateY(-100%)" : "translateX(-30vw)";
                passRef.current.style.borderRadius = mobile ? "1vw 1vw 20% 20%" : "1vw 20% 20% 1vw";
            } else {
                sliderRef.current.style.transform = mobile ? "translateY(0)" : "translateX(0)";
                passRef.current.style.borderRadius = mobile ? "20% 20% 1vw 1vw" : "20% 1vw 1vw 20%";
            }

            // Snap element shifts too
            const signVal = hasSlid
                ? (mobile ? "translateY(-30vh)" : "translateX(30vw)")
                : "translate(0)";
            const creVal = hasSlid
                ? "translate(0)"
                : (mobile ? "translateY(30vh)" : "translateX(-30vw)");

            [signinHeaderRef, signinLinksRef, signinAltRef, signinForgotRef, signinInputRef, signinButtonRef].forEach(ref => {
                if (ref.current) { ref.current.style.transition = "none"; ref.current.style.transform = signVal; }
            });
            [creHeaderRef, creLinksRef, creAltRef, creForgotRef, creInputRef, creButtonRef].forEach(ref => {
                if (ref.current) { ref.current.style.transition = "none"; ref.current.style.transform = creVal; }
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [hasSlid]);

    // ── Auth handlers ─────────────────────────────────────────────────────────

    async function handleSignIn(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(signInEmail, signInPassword);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(regName, regEmail, regPassword);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="login-wrapper">
        <div className="overflow-cutoff">
            <div className="cont" id="slider" ref={sliderRef}>

                <div className="signin">
                    <h1 ref={signinHeaderRef}>Sign in</h1>
                    {error && !hasSlid && (
                        <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{error}</p>
                    )}
                    <div className="inputholder" ref={signinInputRef}>
                        <input
                            placeholder="Email"
                            type="email"
                            value={signInEmail}
                            onChange={e => setSignInEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={signInPassword}
                            onChange={e => setSignInPassword(e.target.value)}
                        />
                    </div>
                    <p className="forgot" ref={signinForgotRef}>Forgot your password?</p>
                    <button className="done" ref={signinButtonRef} onClick={handleSignIn} disabled={loading}>
                        <b>{loading ? "Signing in…" : "Sign In"}</b>
                    </button>
                </div>

                <div className="pass" ref={passRef}>
                    <div className="default" id="PD" style={{ display: hasSlid ? "none" : "flex" }}>
                        <h2>Hi, Friend</h2>
                        <p>first time together?</p>
                        <button className="switch" onClick={Slide}>Create Account</button>
                    </div>
                    <div className="pass-alt" id="PA" style={{ display: hasSlid ? "flex" : "none" }}>
                        <h2>Been Here Before?</h2>
                        <p>No problem, Let's sign in</p>
                        <button className="switch" onClick={Slide}>Log In</button>
                    </div>
                </div>

                <div className="CreateAcc">
                    <h1 ref={creHeaderRef}>Register</h1>
                    {error && hasSlid && (
                        <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{error}</p>
                    )}
                    <div className="inputholder" ref={creInputRef}>
                        <input
                            placeholder="Name"
                            type="text"
                            value={regName}
                            onChange={e => setRegName(e.target.value)}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            value={regEmail}
                            onChange={e => setRegEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={regPassword}
                            onChange={e => setRegPassword(e.target.value)}
                        />
                    </div>
                    <p className="forgot" ref={creForgotRef}>Already have an account?</p>
                    <button className="done" ref={creButtonRef} onClick={handleRegister} disabled={loading}>
                        {loading ? "Creating account…" : "Sign Up"}
                    </button>
                </div>

            </div>
        </div>
        </div>
    );
}
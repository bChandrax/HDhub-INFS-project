import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const MOBILE_BP = 768;
function isMobile() { return window.innerWidth <= MOBILE_BP; }

export default function LoginPage() {

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const sliderRef = useRef(null);
    const passRef   = useRef(null);
    const [hasSlid, setHasSlid] = useState(false);

    // signin refs
    const signinHeaderRef = useRef(null);
    const signinForgotRef = useRef(null);
    const signinInputRef  = useRef(null);
    const signinButtonRef = useRef(null);

    // createacc refs
    const creHeaderRef = useRef(null);
    const creForgotRef = useRef(null);
    const creInputRef  = useRef(null);
    const creButtonRef = useRef(null);

    const signinRefs = [signinHeaderRef, signinForgotRef, signinInputRef, signinButtonRef];
    const creRefs    = [creHeaderRef,    creForgotRef,    creInputRef,    creButtonRef];

    // form state
    const [signInEmail,    setSignInEmail]    = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [regName,        setRegName]        = useState("");
    const [regEmail,       setRegEmail]       = useState("");
    const [regPassword,    setRegPassword]    = useState("");
    const [error,          setError]          = useState("");
    const [loading,        setLoading]        = useState(false);

    // ── Helpers ───────────────────────────────────────────────────────────────

    function setRefs(refs, transform, transition) {
        refs.forEach(r => {
            if (!r.current) return;
            r.current.style.transition = transition;
            r.current.style.transform  = transform;
        });
    }

    // ── Desktop animation (horizontal) ───────────────────────────────────────

    function desktopToCre() {
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = "translateX(-30vw)";
        passRef.current.style.transition   = "border-radius 1s ease";
        passRef.current.style.borderRadius = "1vw 20% 20% 1vw";
        setRefs(signinRefs, "translateX(30vw)",  "transform 0.5s ease");
        setRefs(creRefs,    "translateX(0)",      "transform 0.5s ease 0.25s");
    }

    function desktopToSi() {
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = "translateX(0)";
        passRef.current.style.transition   = "border-radius 1s ease";
        passRef.current.style.borderRadius = "20% 1vw 1vw 20%";
        setRefs(signinRefs, "translateX(0)",      "transform 0.5s ease 0.25s");
        setRefs(creRefs,    "translateX(-30vw)",  "transform 0.5s ease");
    }

    // ── Mobile animation (vertical) ───────────────────────────────────────────
    //
    // On mobile the .pass is position:fixed so it moves independently.
    // The slider moves the signin/register panels (translateY).
    // The pass sweeps from bottom → off top → settles at top (and reverse).

    function mobileToCre() {
        // 1. Slide main track up so Register panel comes into view
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = "translateY(-100vh)";

        // 2. Pass: fly upward past the whole screen then settle at top
        //    Step A — shoot up off screen
        passRef.current.style.transition   = "transform 0.5s ease";
        passRef.current.style.transform    = "translateY(-120vh)";
        //    Step B — after it's gone, snap to top position (no transition), then slide down into top
        setTimeout(() => {
            passRef.current.style.transition   = "none";
            passRef.current.style.transform    = "translateY(-100vh)"; // above viewport (top anchor)
            passRef.current.style.top          = "0";
            passRef.current.style.bottom       = "auto";
            passRef.current.style.borderRadius = "0 0 40% 40%";
            // tiny delay then animate down into place
            requestAnimationFrame(() => requestAnimationFrame(() => {
                passRef.current.style.transition = "transform 0.5s ease";
                passRef.current.style.transform  = "translateY(0)";
            }));
        }, 520);

        // 3. Shift signin content up (out), register content stays centred
        setRefs(signinRefs, "translateY(-20vh)", "transform 0.5s ease");
        setRefs(creRefs,    "translateY(0)",     "transform 0.5s ease 0.25s");
    }

    function mobileToSi() {
        // 1. Slide main track back down
        sliderRef.current.style.transition = "transform 1s ease";
        sliderRef.current.style.transform  = "translateY(0)";

        // 2. Pass: fly downward off screen then settle at bottom
        passRef.current.style.transition   = "transform 0.5s ease";
        passRef.current.style.transform    = "translateY(120vh)";
        setTimeout(() => {
            passRef.current.style.transition   = "none";
            passRef.current.style.top          = "auto";
            passRef.current.style.bottom       = "0";
            passRef.current.style.borderRadius = "40% 40% 0 0";
            passRef.current.style.transform    = "translateY(100vh)";
            requestAnimationFrame(() => requestAnimationFrame(() => {
                passRef.current.style.transition = "transform 0.5s ease";
                passRef.current.style.transform  = "translateY(0)";
            }));
        }, 520);

        // 3. Restore signin content, shift register content down (out)
        setRefs(signinRefs, "translateY(0)",     "transform 0.5s ease 0.25s");
        setRefs(creRefs,    "translateY(20vh)",  "transform 0.5s ease");
    }

    // ── Slide dispatcher ──────────────────────────────────────────────────────

    function Slide() {
        setError("");
        if (!hasSlid) {
            isMobile() ? mobileToCre() : desktopToCre();
            setHasSlid(true);
        } else {
            isMobile() ? mobileToSi() : desktopToSi();
            setHasSlid(false);
        }
    }

    // ── Resize listener ───────────────────────────────────────────────────────

    useEffect(() => {
        function snapToState() {
            if (!sliderRef.current || !passRef.current) return;
            const mobile = isMobile();

            // Disable transitions during snap
            sliderRef.current.style.transition = "none";
            passRef.current.style.transition   = "none";
            [...signinRefs, ...creRefs].forEach(r => {
                if (r.current) r.current.style.transition = "none";
            });

            if (mobile) {
                // Reset pass to correct fixed position
                passRef.current.style.transform = "translateY(0)";
                if (hasSlid) {
                    sliderRef.current.style.transform  = "translateY(-100vh)";
                    passRef.current.style.top          = "0";
                    passRef.current.style.bottom       = "auto";
                    passRef.current.style.borderRadius = "0 0 40% 40%";
                    setRefs(signinRefs, "translateY(-20vh)", "none");
                    setRefs(creRefs,    "translateY(0)",     "none");
                } else {
                    sliderRef.current.style.transform  = "translateY(0)";
                    passRef.current.style.top          = "auto";
                    passRef.current.style.bottom       = "0";
                    passRef.current.style.borderRadius = "40% 40% 0 0";
                    setRefs(signinRefs, "translateY(0)",     "none");
                    setRefs(creRefs,    "translateY(20vh)",  "none");
                }
            } else {
                // Reset pass back to in-flow desktop styles
                passRef.current.style.top    = "";
                passRef.current.style.bottom = "";
                if (hasSlid) {
                    sliderRef.current.style.transform  = "translateX(-30vw)";
                    passRef.current.style.borderRadius = "1vw 20% 20% 1vw";
                    setRefs(signinRefs, "translateX(30vw)",  "none");
                    setRefs(creRefs,    "translateX(0)",     "none");
                } else {
                    sliderRef.current.style.transform  = "translateX(0)";
                    passRef.current.style.borderRadius = "20% 1vw 1vw 20%";
                    setRefs(signinRefs, "translateX(0)",     "none");
                    setRefs(creRefs,    "translateX(-30vw)", "none");
                }
            }
        }

        window.addEventListener("resize", snapToState);
        return () => window.removeEventListener("resize", snapToState);
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
                    <p className="forgot" ref={creForgotRef}>
                        Already have an account?
                    </p>
                    <button className="done" ref={creButtonRef} onClick={handleRegister} disabled={loading}>
                        {loading ? "Creating account…" : "Sign Up"}
                    </button>
                </div>

            </div>
        </div>
        </div>
    );
}
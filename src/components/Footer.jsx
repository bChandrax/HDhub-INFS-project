const FOOTER_LINKS = [
  'Privacy Policy',
  'Terms of Service',
  'Contact Us',
  'Impact Report',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo handwritten">Growth Beyond Books</span>
          <p className="footer__copy handwritten">
            © 2024 Growth Beyond Books. Rooted in Resilience.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          {FOOTER_LINKS.map((label) => (
            <a key={label} href="#" className="footer__link handwritten">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

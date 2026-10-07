import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import './Header.css'

const navigation = ['World', 'Politics', 'Business', 'Technology', 'Culture']
const emptySubscriber = { username: '', email: '', phone: '', role: '' }

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [subscriber, setSubscriber] = useState(emptySubscriber)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    if (!subscribeOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSubscribeOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [subscribeOpen])

  const handleSubscribe = (event) => {
    event.preventDefault()
    setSaveError(false)

    try {
      localStorage.setItem('newsSubscriber', JSON.stringify({
        ...subscriber,
        subscribedAt: new Date().toISOString(),
      }))
      setSubscriber(emptySubscriber)
      setSaved(true)
    } catch {
      setSaveError(true)
    }
  }

  const openSubscribe = () => {
    setMenuOpen(false)
    setSaved(false)
    setSubscribeOpen(true)
  }

  const updateField = (event) => {
    setSubscriber({ ...subscriber, [event.target.name]: event.target.value })
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" aria-label="Dinesh mailInfo home">
          <span className="brand-mark">D</span>
          <span>Dinesh mailInfo</span>
        </a>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search">
            <SearchIcon fontSize="small" />
          </button>
          <button className="subscribe-button" type="button" onClick={openSubscribe}>
            Subscribe
          </button>
          <button
            className="menu-button icon-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {subscribeOpen && (
        <div
          className="subscribe-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSubscribeOpen(false)
          }}
        >
          <section className="subscribe-dialog" role="dialog" aria-modal="true" aria-labelledby="subscribe-title">
            <button
              className="subscribe-close icon-button"
              type="button"
              aria-label="Close subscription form"
              onClick={() => setSubscribeOpen(false)}
            >
              <CloseIcon />
            </button>

            {saved ? (
              <div className="subscribe-success" role="status">
                <p className="subscribe-kicker">You're on the list</p>
                <h2 id="subscribe-title">Subscription saved.</h2>
                <p>Your details are stored in this browser.</p>
                <button className="subscribe-submit" type="button" onClick={() => setSubscribeOpen(false)}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="subscribe-kicker">Stay informed</p>
                <h2 id="subscribe-title">Subscribe to the news.</h2>
                <p className="subscribe-description">Create your reader profile to get started.</p>

                <form className="subscribe-form" onSubmit={handleSubscribe}>
                  <label>
                    Username
                    <input
                      autoComplete="username"
                      name="username"
                      type="text"
                      placeholder="yourname"
                      value={subscriber.username}
                      onChange={updateField}
                      required
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      autoComplete="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={subscriber.email}
                      onChange={updateField}
                      required
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      autoComplete="tel"
                      name="phone"
                      type="tel"
                      value={subscriber.phone}
                      onChange={updateField}
                      required
                    />
                  </label>
                  <label>
                    Role
                    <select name="role" value={subscriber.role} onChange={updateField} required>
                      <option value="" disabled>Select your role</option>
                      <option value="reader">Reader</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  {saveError && (
                    <p className="subscribe-error" role="alert">
                      Could not save your details in this browser. Please try again.
                    </p>
                  )}
                  <button className="subscribe-submit" type="submit">Create subscription</button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </header>
  )
}

export default Header
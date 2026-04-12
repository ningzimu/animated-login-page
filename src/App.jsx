import { useEffect, useMemo, useState } from 'react'
import './App.css'

function CharacterEye({ pupilOffset = { x: 0, y: 0 }, blink = false, dark = false }) {
  return (
    <div className={`eye ${dark ? 'eye-dark' : ''} ${blink ? 'eye-blink' : ''}`}>
      {!blink && <div className="pupil" style={{ transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))` }} />}
    </div>
  )
}

function DotEye() {
  return <div className="dot-eye" />
}

function useBlink() {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    let timeout
    const loop = () => {
      timeout = setTimeout(() => {
        setBlink(true)
        setTimeout(() => {
          setBlink(false)
          loop()
        }, 150)
      }, Math.random() * 4000 + 3000)
    }
    loop()
    return () => clearTimeout(timeout)
  }, [])

  return blink
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const purpleBlink = useBlink()
  const blackBlink = useBlink()

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const passwordMode = password.length > 0 && showPassword

  const look = useMemo(() => {
    const calc = (centerX, centerY, maxX, maxY) => {
      const dx = Math.max(-maxX, Math.min(maxX, (mouse.x - centerX) / 25))
      const dy = Math.max(-maxY, Math.min(maxY, (mouse.y - centerY) / 30))
      return { x: dx, y: dy }
    }

    return {
      purple: passwordMode ? { x: -4, y: -4 } : isTyping ? { x: 3, y: 4 } : calc(280, 260, 5, 5),
      black: passwordMode ? { x: -4, y: -4 } : isTyping ? { x: 0, y: -4 } : calc(380, 290, 4, 4),
      orange: passwordMode ? { x: -5, y: -4 } : calc(200, 390, 6, 5),
      yellow: passwordMode ? { x: -5, y: -4 } : calc(420, 360, 6, 5),
    }
  }, [isTyping, mouse.x, mouse.y, passwordMode])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-page">
      <section className="visual-panel">
        <div className="visual-panel__grid" />
        <div className="brand-chip">
          <div className="brand-chip__icon">✦</div>
          <span>Animated Login Page</span>
        </div>

        <div className="hero-copy">
          <p className="hero-copy__eyebrow">Reusable UI</p>
          <h1>Welcome back.</h1>
          <p>
            A reusable animated login page inspired by the original community component,
            adapted for desktop and mobile layouts.
          </p>
        </div>

        <div className="characters-stage">
          <div className="characters-canvas">
            <div
              className={`shape shape-purple ${isTyping || (password.length > 0 && !showPassword) ? 'shape-purple--active' : ''}`}
              style={{ transform: passwordMode ? 'skewX(0deg)' : isTyping ? 'skewX(-12deg) translateX(40px)' : 'skewX(0deg)' }}
            >
              <div className="shape-eyes shape-purple__eyes">
                <CharacterEye pupilOffset={look.purple} blink={purpleBlink} />
                <CharacterEye pupilOffset={look.purple} blink={purpleBlink} />
              </div>
            </div>

            <div
              className="shape shape-black"
              style={{ transform: passwordMode ? 'skewX(0deg)' : isTyping ? 'skewX(10deg) translateX(20px)' : 'skewX(0deg)' }}
            >
              <div className="shape-eyes shape-black__eyes">
                <CharacterEye pupilOffset={look.black} blink={blackBlink} dark />
                <CharacterEye pupilOffset={look.black} blink={blackBlink} dark />
              </div>
            </div>

            <div
              className="shape shape-orange"
              style={{ transform: passwordMode ? 'skewX(0deg)' : `skewX(${-look.orange.x / 2}deg)` }}
            >
              <div className="shape-eyes shape-orange__eyes">
                <DotEye />
                <DotEye />
              </div>
            </div>

            <div
              className="shape shape-yellow"
              style={{ transform: passwordMode ? 'skewX(0deg)' : `skewX(${-look.yellow.x / 2}deg)` }}
            >
              <div className="shape-eyes shape-yellow__eyes">
                <DotEye />
                <DotEye />
              </div>
              <div className="shape-yellow__mouth" />
            </div>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-card">
          <div className="mobile-brand">
            <div className="brand-chip__icon brand-chip__icon--light">✦</div>
            <span>Animated Login Page</span>
          </div>

          <div className="form-copy">
            <h2>Sign in</h2>
            <p>Drop this page into your own project and wire it to your auth logic.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                placeholder="anna@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </label>

            <button type="submit" className="submit-button">
              Enter dashboard
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default App

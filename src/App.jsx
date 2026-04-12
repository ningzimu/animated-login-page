import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function Pupil({ size = 12, maxDistance = 5, pupilColor = '#2D2D2D', forceLookX, forceLookY }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const position = useMemo(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY }
    }
    if (!ref.current) return { x: 0, y: 0 }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = mouse.x - cx
    const dy = mouse.y - cy
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }, [forceLookX, forceLookY, maxDistance, mouse.x, mouse.y])

  return (
    <div
      ref={ref}
      className="pupil-dot"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  )
}

function EyeBall({ size = 18, pupilSize = 7, maxDistance = 5, eyeColor = '#fff', pupilColor = '#2D2D2D', isBlinking = false, forceLookX, forceLookY }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const position = useMemo(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY }
    }
    if (!ref.current) return { x: 0, y: 0 }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = mouse.x - cx
    const dy = mouse.y - cy
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }, [forceLookX, forceLookY, maxDistance, mouse.x, mouse.y])

  return (
    <div
      ref={ref}
      className="eyeball"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
      }}
    >
      {!isBlinking && (
        <div
          className="eyeball-pupil"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      )}
    </div>
  )
}

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false)
  const [isBlackBlinking, setIsBlackBlinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isPurplePeeking, setIsPurplePeeking] = useState(false)

  const purpleRef = useRef(null)
  const blackRef = useRef(null)
  const yellowRef = useRef(null)
  const orangeRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    let timeout
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setIsPurpleBlinking(true)
        setTimeout(() => {
          setIsPurpleBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    let timeout
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setIsBlackBlinking(true)
        setTimeout(() => {
          setIsBlackBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
    }
    scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true)
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800)
      return () => clearTimeout(timer)
    }
    setIsLookingAtEachOther(false)
  }, [isTyping])

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const peekInterval = setTimeout(() => {
        setIsPurplePeeking(true)
        setTimeout(() => setIsPurplePeeking(false), 800)
      }, Math.random() * 3000 + 2000)
      return () => clearTimeout(peekInterval)
    }
    setIsPurplePeeking(false)
  }, [password, showPassword, isPurplePeeking])

  const calculatePosition = (ref) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 }
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 3
    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY
    const faceX = Math.max(-15, Math.min(15, deltaX / 20))
    const faceY = Math.max(-10, Math.min(10, deltaY / 30))
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120))
    return { faceX, faceY, bodySkew }
  }

  const purplePos = calculatePosition(purpleRef)
  const blackPos = calculatePosition(blackRef)
  const yellowPos = calculatePosition(yellowRef)
  const orangePos = calculatePosition(orangeRef)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (email === 'erik@gmail.com' && password === '1234') {
      setError('')
      alert('Login successful!')
    } else {
      setError('Invalid email or password. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="login-page">
      <section className="visual-panel">
        <div className="visual-panel__grid" />
        <div className="brand-chip">
          <div className="brand-chip__icon">✦</div>
          <span>YourBrand</span>
        </div>

        <div className="hero-copy">
          <p className="hero-copy__eyebrow">Reusable UI</p>
          <h1>Welcome back!</h1>
          <p>Please enter your details</p>
        </div>

        <div className="characters-stage">
          <div className="characters-canvas">
            <div
              ref={purpleRef}
              className="shape shape-purple"
              style={{
                height: (isTyping || (password.length > 0 && !showPassword)) ? 440 : 400,
                transform: (password.length > 0 && showPassword)
                  ? 'skewX(0deg)'
                  : (isTyping || (password.length > 0 && !showPassword))
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
              }}
            >
              <div
                className="shape-eyes shape-purple__eyes"
                style={{
                  left: (password.length > 0 && showPassword) ? 20 : isLookingAtEachOther ? 55 : 45 + purplePos.faceX,
                  top: (password.length > 0 && showPassword) ? 35 : isLookingAtEachOther ? 65 : 40 + purplePos.faceY,
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={(password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(password.length > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </div>

            <div
              ref={blackRef}
              className="shape shape-black"
              style={{
                transform: (password.length > 0 && showPassword)
                  ? 'skewX(0deg)'
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
              }}
            >
              <div
                className="shape-eyes shape-black__eyes"
                style={{
                  left: (password.length > 0 && showPassword) ? 10 : isLookingAtEachOther ? 32 : 26 + blackPos.faceX,
                  top: (password.length > 0 && showPassword) ? 28 : isLookingAtEachOther ? 12 : 32 + blackPos.faceY,
                }}
              >
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking} forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking} forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined} />
              </div>
            </div>

            <div
              ref={orangeRef}
              className="shape shape-orange"
              style={{
                transform: (password.length > 0 && showPassword) ? 'skewX(0deg)' : `skewX(${orangePos.bodySkew || 0}deg)`,
              }}
            >
              <div
                className="shape-eyes shape-orange__eyes"
                style={{
                  left: (password.length > 0 && showPassword) ? 50 : 82 + orangePos.faceX,
                  top: (password.length > 0 && showPassword) ? 85 : 90 + orangePos.faceY,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
            </div>

            <div
              ref={yellowRef}
              className="shape shape-yellow"
              style={{
                transform: (password.length > 0 && showPassword) ? 'skewX(0deg)' : `skewX(${yellowPos.bodySkew || 0}deg)`,
              }}
            >
              <div
                className="shape-eyes shape-yellow__eyes"
                style={{
                  left: (password.length > 0 && showPassword) ? 20 : 52 + yellowPos.faceX,
                  top: (password.length > 0 && showPassword) ? 35 : 40 + yellowPos.faceY,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
              <div
                className="shape-yellow__mouth"
                style={{
                  left: (password.length > 0 && showPassword) ? 10 : 40 + yellowPos.faceX,
                  top: (password.length > 0 && showPassword) ? 88 : 88 + yellowPos.faceY,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-card">
          <div className="mobile-brand">
            <div className="brand-chip__icon brand-chip__icon--light">✦</div>
            <span>YourBrand</span>
          </div>

          <div className="form-copy">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                placeholder="anna@gmail.com"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
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
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </label>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Log in'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default App

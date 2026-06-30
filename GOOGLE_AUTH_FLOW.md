# Google Auth Flow — Complete Documentation

## Project Structure

```
client/                         # React + Vite frontend
  src/
    main.jsx                    # App entry — wraps everything in AuthProvider
    contexts/AuthContext.jsx    # Global auth state
    hooks/useAuth.js            # Hook to consume AuthContext
    app/
      pages/Login.jsx           # Google login button
      pages/Home.jsx            # Protected page
      components/Navbar.jsx     # Shows user name or login link
      services/api.js           # Axios instance
  vite.config.js                # Proxy config

server/                         # Node.js + Express backend
  src/
    index.js                    # Server entry point
    app.js                      # Express app setup
    config/
      env.js                    # Loads all env variables
      google.js                 # Google OAuth2 client setup
    routes/
      auth.routes.js            # /google and /me routes
    controllers/
      auth.controller.js        # googleLoginController, meController
    services/
      auth.service.js           # verifyGoogleToken logic
    middlewares/
      auth.middleware.js        # JWT cookie verification
      errorHandler.js           # Global error handler
    utils/
      jwt.js                    # generateToken, verifyToken
```

---

## Environment Variables

### `server/.env`
```
PORT=8000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
MONGO_DB_URI=mongodb://localhost:27017/s-auth
JWT_SECRET=<your_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

### `client/.env`
```
VITE_GOOGLE_CLIENT_ID=<your_google_client_id>
```

---

## Complete Auth Flow — Step by Step

### Step 1 — App Loads

```
main.jsx
  └── AuthProvider wraps entire app
        └── useEffect runs fetchCurrentUser()
              └── GET /api/auth/me (with cookie)
                    ├── Cookie exists → user set in state
                    └── No cookie → user = null → redirect to /login
```

### Step 2 — Login Page

User `/login` pe jaata hai → `Login.jsx` render hota hai → `@react-oauth/google` ka `<GoogleLogin>` button dikhta hai.

```jsx
// Login.jsx
<GoogleLogin
  onSuccess={async (credentialResponse) => {
    const res = await api.post("/auth/google", {
      credential: credentialResponse.credential,  // Google JWT token
    });
    setUser(res.data.user);  // AuthContext update
    navigate("/");
  }}
/>
```

### Step 3 — Google Button Click

1. User Google button click karta hai
2. Google popup khulta hai
3. User apna account select karta hai
4. Google ek **credential token (JWT)** deta hai frontend ko
5. `onSuccess` callback fire hota hai

### Step 4 — Frontend → Backend Request

```
POST /api/auth/google
Body: { credential: "eyJhbGci..." }
```

`api.js` — Axios instance:
```js
baseURL: "/api"           // Vite proxy use karta hai
withCredentials: true     // Cookie send/receive ke liye zaroori
```

`vite.config.js` — Proxy:
```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
      secure: false,
    }
  }
}
```

> Proxy isliye hai taaki browser same-origin samjhe — cookie set ho sake

### Step 5 — Backend: Token Verify

```
auth.routes.js → POST /google → googleLoginController
```

`auth.controller.js`:
```js
const { credential } = req.body;
const { user, token } = await verifyGoogleToken(credential);
res.cookie("token", token, { httpOnly: true, ... });
return res.status(200).json({ success: true, user });
```

`auth.service.js`:
```js
// Google token verify karo
const ticket = await googleClient.verifyIdToken({
  idToken: credential,
  audience: env.GOOGLE_CLIENT_ID,
});
const payload = ticket.getPayload();

// User object banao
const user = {
  googleId: payload.sub,
  name: payload.name,
  email: payload.email,
  picture: payload.picture,
  emailVerified: payload.email_verified,
};

// JWT banao
const token = generateToken({ googleId, email, name });

return { user, token };
```

`jwt.js`:
```js
jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
```

### Step 6 — Cookie Set

Server response mein `Set-Cookie` header aata hai:
```
Set-Cookie: token=<jwt>; HttpOnly; SameSite=Lax; Max-Age=604800
```

Browser ye cookie store kar leta hai — automatically future requests mein bhejta hai.

### Step 7 — Frontend State Update

```js
setUser(res.data.user);   // AuthContext mein user set
navigate("/");             // Home page pe redirect
```

### Step 8 — Protected Route: /me

Jab bhi page refresh hota hai ya app load hota hai:

```
AuthContext useEffect
  └── GET /api/auth/me
        └── authMiddleware
              ├── req.cookies.token check karta hai
              ├── verifyToken(token) → decoded user
              ├── req.user = decoded
              └── next() → meController → res.json({ user })
```

`auth.middleware.js`:
```js
const token = req.cookies.token;
if (!token) return res.status(401).json({ message: "Unauthorized" });
const decoded = verifyToken(token);
req.user = decoded;
next();
```

### Step 9 — Logout

```js
// AuthContext logout()
await api.post("/auth/logout");  // server cookie clear karta hai
setUser(null);                   // frontend state clear
```

---

## Full Request/Response Cycle Diagram

```
[Browser]
    |
    | Click Google Button
    ↓
[Google Popup] → credential JWT token
    |
    | POST /api/auth/google { credential }
    ↓
[Vite Proxy :5173] → forwards to → [Express Server :8000]
    |
    | googleLoginController
    | └── verifyGoogleToken(credential)
    |       └── googleClient.verifyIdToken()  ← Google ke saath verify
    |       └── generateToken(user)           ← JWT banao
    |
    | res.cookie("token", jwt)               ← Cookie set
    | res.json({ success: true, user })       ← Response
    ↓
[Browser]
    | Cookie store ✓
    | setUser(res.data.user)
    | navigate("/")
    ↓
[Home Page]
    | useAuth() → user available
    | Welcome Chaitanya ✓
```

---

## Known Issues & Fixes Applied

| Issue | File | Fix |
|-------|------|-----|
| `env` import missing in jwt.js | `utils/jwt.js` | `import { env } from "../config/env.js"` added |
| Typo `MONOG_DB_URI` | `config/env.js` | Fixed to `MONGO_DB_URI` |
| Routes order galat | `app.js` | `/api/auth` pehle, `/api` baad mein |
| Cookie cross-origin nahi set hoti | `vite.config.js` | Proxy with `changeOrigin: true` added |
| `JWT_SECRET` placeholder tha | `server/.env` | Real value set ki |

---

## Pending

- `meController` — `auth.controller.js` mein implement karna hai
- `/auth/logout` route — cookie clear karne ke liye
- MongoDB — user ko database mein save karna (abhi sirf memory mein hai)

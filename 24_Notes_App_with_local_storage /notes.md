# teach me localStorage ...

==>

Alright Gourab, let’s do this **properly and from the ground up**, the way a developer should understand it — not just syntax, but **why it exists, how it behaves, and when to use it**.

---

## 1️⃣ What is `localStorage` (in simple terms)

`localStorage` is a **browser-provided storage** that lets you **store data permanently** in the user’s browser.

Think of it like:

> **A small key–value database inside the browser**

* Stored **per domain** (site-specific)
* Data **persists even after page reload or browser restart**
* Accessible via **JavaScript only (client-side)**

📌 Example:
If a user selects **dark mode**, you can store that preference and restore it next time they visit.

---

## 2️⃣ Why `localStorage` exists

Before `localStorage`, developers used:

* Cookies ❌ (small size, sent with every request → slow)
* Server sessions ❌ (needs backend)

`localStorage` solves:

* Client-side persistence
* Zero server dependency
* Simple API

---

## 3️⃣ How `localStorage` works internally (important)

* Data is stored as **string ONLY**
* Uses **key–value pairs**
* Synchronous API (blocking, so don’t store huge data)

```text
key   → string
value → string
```

Even numbers, arrays, objects → **converted to strings**

---

## 4️⃣ Core API (you must memorize this)

### ✅ Store data

```js
localStorage.setItem("username", "Gourab");
```

### ✅ Read data

```js
const name = localStorage.getItem("username");
console.log(name); // Gourab
```

### ✅ Remove one item

```js
localStorage.removeItem("username");
```

### ✅ Clear everything (dangerous)

```js
localStorage.clear();
```

---

## 5️⃣ Storing numbers (common mistake)

```js
localStorage.setItem("age", 22);

const age = localStorage.getItem("age");
console.log(typeof age); // "string"
```

✅ Fix:

```js
const age = Number(localStorage.getItem("age"));
```

---

## 6️⃣ Storing objects & arrays (MOST IMPORTANT PART)

You **cannot** store objects directly.

❌ Wrong:

```js
localStorage.setItem("user", { name: "Gourab" });
```

✔ Correct way → **JSON**

### Step 1: Convert object → string

```js
const user = {
  name: "Gourab",
  role: "Full Stack Developer"
};

localStorage.setItem("user", JSON.stringify(user));
```

### Step 2: Read & convert back

```js
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // Gourab
```

📌 Rule:

* **Store → `JSON.stringify()`**
* **Read → `JSON.parse()`**

---

## 7️⃣ Real-world example (Dark Mode Toggle)

```js
const toggleBtn = document.querySelector(".toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
```

### Restore theme on page load

```js
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}
```

This is **real production logic**, not toy code.

---

## 8️⃣ localStorage vs sessionStorage (very common interview topic)

| Feature                      | localStorage | sessionStorage |
| ---------------------------- | ------------ | -------------- |
| Persists after reload        | ✅            | ✅              |
| Persists after browser close | ✅            | ❌              |
| Tab-specific                 | ❌            | ✅              |
| Max size                     | ~5MB         | ~5MB           |

📌 Use case:

* `localStorage` → preferences, tokens (carefully), UI state
* `sessionStorage` → temporary form data

---

## 9️⃣ What NOT to store in localStorage ❌

Very important for **security**

❌ Do NOT store:

* Passwords
* Sensitive personal data
* JWT access tokens (in real apps)

Why?

* Vulnerable to **XSS attacks**
* Anyone with JS access can read it

---

## 🔟 When should YOU use localStorage (developer mindset)

Use it when:

* Data is **non-sensitive**
* Data must **persist**
* You don’t need server sync

Examples:

* Theme
* Language preference
* Cart items (small apps)
* UI filters

---

## 1️⃣1️⃣ DevTools tip (must know)

Open browser:

```
DevTools → Application → Local Storage
```

You can **inspect, edit, delete** values manually.

---

## 1️⃣2️⃣ Common beginner mistakes (learn from this)

❌ Forgetting `JSON.stringify`
❌ Expecting numbers instead of strings
❌ Clearing storage accidentally
❌ Storing huge data
❌ Treating it like a database

---

## Mental Model (remember this)

> `localStorage` = **persistent, string-only, client-side key–value store**

---

If you want, next we can:

* Build a **mini project using localStorage**
* Compare **cookies vs localStorage vs IndexedDB**
* Use `localStorage` inside **React**
* Implement a **cart system properly**

Just tell me what you want next 👍

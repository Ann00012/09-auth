# NoteHub — Notes Management Application

**NoteHub** is a modern web application built with Next.js for creating, viewing, and managing personal notes. This project demonstrates advanced React patterns, including asynchronous data fetching, Server-Side Rendering (SSR) with TanStack Query hydration, and a professional UI/UX approach.

## 🚀 Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
* **Styling:** CSS Modules
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast
* **Language:** TypeScript

---

## 🏗 Implementation Details

In this project, I implemented the following core logic and architectural patterns:

### 🔐 Authentication & Security
- **JWT-based Proxy Middleware:** Developed a custom `proxy.ts` middleware to handle session refreshing via `accessToken` and `refreshToken`.
- **Server-Side Cookie Management:** Integrated `next/headers` to securely manage cookies on the server, ensuring protected routes (like `/profile` and `/notes`) are inaccessible to unauthorized users.

### 📡 Data Synchronization & Performance
- **SSR Hydration Pattern:** Implemented prefetching on the server using `QueryClient`. This ensures that data is ready before the page hits the browser, improving SEO and UX.
- **Client-Server API Synchronization:** Built a robust API layer using Axios that synchronizes headers and cookies between client-side requests and Next.js Server Components.
- **Dynamic Filtering & Pagination:** Developed a synchronized filtering system where URL parameters (tags, search query, page number) drive the data fetching logic in both SSR and CSR modes.

### 🎨 Advanced UI/UX Patterns
- **Modal-Based Navigation:** Integrated a "Preview" mode for notes using a Modal system that supports "Back" navigation and deep linking.
- **Robust Error/Empty States:** Designed and implemented user-friendly "Not Found" and "Error" states within modals to prevent dead-ends in the user journey.
- **Debounced Search:** Optimized API calls by implementing a 500ms debounce on search inputs to reduce server load.

---

## 🛠 Features

- **Full CRUD Support:** Create, read, and delete notes with immediate UI feedback.
- **Dynamic Routing:** Individual pages for each note using `app/notes/[id]` structure.
- **Secure Sessions:** Http-only cookie management for safe authentication.


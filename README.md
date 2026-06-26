# Reset Password Feature

## Project Overview

This project implements the **Reset Password** user authentication flow for our healthcare web application. The feature was built using **React**, **TypeScript**, and reusable UI components to ensure consistency across all authentication screens.

The implementation follows the approved Figma design and emphasizes component reusability, maintainability, and ease of integration with backend APIs.

---

# Feature Branch

Development is being carried out on the following Git branch:

```bash
feat/resetpassword
```

This branch contains all components and pages related to the password reset flow.

---

# Technologies Used

- React
- TypeScript
- CSS
- React Icons
- Vite

---

# Project Structure

```
src
│
├── components
│   ├── BackLink
│   ├── Button
│   ├── Input
│   ├── PasswordInput
│   └── SuccessAlert
│
├── pages
│   ├── ForgotPassword
│   └── ResetPassword
│
├── App.tsx
└── main.tsx
```

---

# Reusable Components

## 1. Button Component

A reusable button component used throughout the authentication pages.

### Features

- Supports different button types
- Accepts child content
- Optional icon support
- Custom styling using CSS classes

### Example

```tsx
<Button type="submit">Reset Password</Button>
```

With icon support:

```tsx
<Button type="submit" icon={FaLock}>
  Reset Password
</Button>
```

---

## 2. Input Component

A reusable text input component.

### Features

- Label support
- Placeholder support
- Email input
- Custom CSS styling
- Optional icon support using React Icons

### Example

```tsx
<Input label="Email" type="email" placeholder="Enter your email" />
```

---

## 3. PasswordInput Component

A reusable password field.

### Features

- Show/Hide password
- Eye toggle icon
- Password strength indicator (optional)
- Remember Me checkbox (optional)
- Forgot Password link (optional)

### Example

```tsx
<PasswordInput label="New Password" placeholder="Enter your new password" />
```

---

## 4. BackLink Component

A reusable navigation component placed at the top of authentication pages.

### Features

- Back arrow icon
- Click handler support
- Hyperlink support

Example:

```tsx
<BackLink label="Reset Password" />
```

---

## 5. SuccessAlert Component

A reusable alert component created for displaying successful operations.

### Features

- Green success notification
- Custom message support
- Easily reusable across the application

Example:

```tsx
<SuccessAlert message="Password reset instructions have been sent." />
```

---

# Pages Implemented

## Forgot Password Page

### Purpose

Allows users to request password reset instructions by entering their registered email address.

### Components Used

- BackLink
- Input
- Button
- SuccessAlert (in progress)

### Features

- Email validation input
- Reset Password button
- Placeholder support
- Email icon
- Displays success notification after submission (currently being integrated)

---

## Reset Password Page

### Purpose

Allows users to create a new password after following the reset link.

### Components Used

- BackLink
- PasswordInput
- Button

### Features

- New Password field
- Confirm Password field
- Password visibility toggle
- Password confirmation validation
- Reset Password button with icon

---

# State Management

React's `useState` hook is currently used for local state management.

Example:

```tsx
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
```

The success notification also uses local state:

```tsx
const [showSuccess, setShowSuccess] = useState(false);
```

---

# Form Validation

Current validation includes:

- Preventing page refresh using `preventDefault()`
- Confirming both passwords match before submission

Example:

```tsx
if (password !== confirmPassword) {
  alert("Passwords do not match.");
  return;
}
```

---

# Icons

Icons are provided using the **react-icons** package.

Examples include:

- Email icon
- Lock icon
- Eye icon
- Back arrow

Installation:

```bash
npm install react-icons
```

---

# Styling

Each component maintains its own CSS file.

Example:

```
Button
├── Button.tsx
├── Button.css
├── Button.types.ts
└── index.ts
```

This structure improves maintainability and minimizes merge conflicts.

---

# Development Workflow

Development follows a component-first approach.

1. Create reusable components.
2. Build pages using reusable components.
3. Style according to the Figma design.
4. Add validation.
5. Integrate backend APIs.
6. Test and merge into the main branch.

---

# Current Progress

### Completed

- Project setup
- Reset Password page
- PasswordInput component
- Input component
- Button component
- BackLink component
- SuccessAlert component
- Password confirmation validation
- React Icons integration

### In Progress

- Forgot Password page success notification integration
- UI refinements to match the Figma design exactly
- Responsive design improvements

### Pending

- React Router integration
- Backend API integration
- Email validation
- Toast notifications
- Final UI polish
- Accessibility improvements
- Unit testing

---

# Testing

During development, individual pages are rendered directly in `App.tsx`.

Example:

```tsx
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return <ResetPassword />;
}

export default App;
```

After routing is introduced, navigation will be handled using React Router.

---

# Future Improvements

- API integration
- Authentication context
- Protected routes
- Form validation using React Hook Form
- Schema validation with Zod or Yup
- Responsive mobile optimization
- Dark mode support
- Loading states
- Error handling
- Success and error toast notifications

---

# Author

Frontend implementation completed as part of the Scrum Sprint Healthcare Web Application project.

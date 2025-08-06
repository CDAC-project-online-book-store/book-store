// Returns current user role from localStorage or session (mockup)
export function getUserRole() {
  // Example: localStorage.setItem('userRole', 'CUSTOMER')
  return localStorage.getItem('userRole') || 'UNREGISTERED';
}

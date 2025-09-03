// __mocks__/react-toastify.ts
export const toast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  loading: vi.fn(),
  update: vi.fn(),
  dismiss: vi.fn(),
  // Add other toast methods as needed
};

export const ToastContainer = vi.fn(() => null); // Mock ToastContainer as a component that renders nothing
export const Slide = vi.fn(); // Mock transitions if used
export const Bounce = vi.fn(); // Mock transitions if used
export const Flip = vi.fn(); // Mock transitions if used
export const Zoom = vi.fn(); // Mock transitions if used

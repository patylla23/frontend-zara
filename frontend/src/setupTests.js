import '@testing-library/jest-dom';
jest.mock("react-router-dom");

class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([]);
  }
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

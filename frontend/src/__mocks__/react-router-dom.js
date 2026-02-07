const React = require("react");

const mockNavigate = jest.fn();
const useNavigate = jest.fn(() => mockNavigate);
const useLocation = jest.fn(() => ({ pathname: "/" }));
const useParams = jest.fn(() => ({}));

function Link({ to, children, ...rest }) {
  const href = typeof to === "string" ? to : to?.pathname || "/";
  return React.createElement("a", { href, ...rest }, children);
}

function MemoryRouter({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function BrowserRouter({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function Routes({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function Route({ element }) {
  return element || null;
}

module.exports = {
  Link,
  MemoryRouter,
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
};

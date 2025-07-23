import UserRoutes from "./routes";
import ToastProvider from "./ContextAPI/ToastProvider";

function App() {
  return (
    <div>
      <ToastProvider>
        <UserRoutes />
      </ToastProvider>
    </div>
  );
}

export default App;

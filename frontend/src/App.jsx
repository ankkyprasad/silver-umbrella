import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from "./services/router";
import store from "./store";

const client = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            <RouterProvider router={router} />
          </div>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;

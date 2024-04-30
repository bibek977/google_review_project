import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }) {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return (
    <QueryClientProvider client={client}>
      {children}
       {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

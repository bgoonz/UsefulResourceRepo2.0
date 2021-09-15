import type { AppProps } from 'next/app';
import { ToastProvider } from "react-toast-notifications";
import "../styles/forms.css";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider placement="bottom-right">
      <div className="container m-auto">
        <Component {...pageProps} />
      </div>
    </ToastProvider>
  );
}

export default MyApp;

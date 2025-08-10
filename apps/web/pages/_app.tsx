import type { AppProps } from 'next/app';
import '../styles/global.css';
import { LayoutShell } from '../components/layout/LayoutShell';
import { ToastCenter } from '../components/feedback/ToastCenter';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutShell>
      <Component {...pageProps} />
      <ToastCenter />
    </LayoutShell>
  );
}

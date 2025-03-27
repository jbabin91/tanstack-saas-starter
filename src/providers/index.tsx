import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      attribute="class"
      defaultTheme="system"
      enableColorScheme={false}
      storageKey="theme"
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

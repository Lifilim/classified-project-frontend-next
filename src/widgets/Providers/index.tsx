"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { StoreProvider } from "@/app/store";
import { CommonWrapper } from "@/wrappers/CommonWrapper";
import { AuthWrapper } from "@/wrappers/AuthWrapper";

const theme = createTheme({});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <MantineProvider theme={theme}>
        <CommonWrapper>
          <AuthWrapper>{children}</AuthWrapper>
        </CommonWrapper>
      </MantineProvider>
    </StoreProvider>
  );
}

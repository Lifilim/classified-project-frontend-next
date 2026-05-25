"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { StoreProvider } from "@/shared/store";
import { AuthWrapper } from "@/widgets/AuthWrapper";
import { CommonWrapper } from "@/widgets/CommonWrapper";

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

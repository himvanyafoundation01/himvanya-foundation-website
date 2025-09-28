import type React from "react"
// Email template components for consistent styling
export const EmailTemplate = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    {children}
  </div>
)

export const EmailHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div
    style={{
      background: "#22c55e",
      color: "white",
      padding: "20px",
      textAlign: "center" as const,
      marginBottom: "20px",
    }}
  >
    <h1 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>{title}</h1>
    {subtitle && <p style={{ margin: "0", opacity: "0.9" }}>{subtitle}</p>}
  </div>
)

export const EmailContent = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "20px",
      background: "#f9f9f9",
    }}
  >
    {children}
  </div>
)

export const EmailFooter = () => (
  <div
    style={{
      textAlign: "center" as const,
      padding: "20px",
      color: "#666",
      fontSize: "14px",
      borderTop: "1px solid #eee",
      marginTop: "20px",
    }}
  >
    <p style={{ margin: "0 0 10px 0" }}>
      Vanya Foundation | 123 Foundation Street, New Delhi - 110001 | Reg. No: 12345678
    </p>
    <p style={{ margin: "0", fontSize: "12px" }}>This is an automated email. Please do not reply to this message.</p>
  </div>
)

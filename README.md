# 圖書借閱系統前端

此專案是圖書借閱系統的前端部分，使用 Vue 3 框架開發，並使用 Vite 進行開發與建置。此系統允許用戶註冊、登入、借閱和歸還書籍。

後端部分: https://github.com/kenwc-chen/library

## 功能

- **使用者註冊與登入**：用戶可以註冊新帳戶並登入系統。
- **JWT 驗證**：系統透過 JWT（JSON Web Token）進行身份驗證和授權。
- **借閱書籍**：用戶可以從庫存中選擇可用書籍進行借閱。
- **歸還書籍**：用戶可以歸還已借閱的書籍。
- **登出功能**：用戶可以登出並清除 JWT token。

## 使用技術

- **Vue 3**：用於搭建前端應用。
- **Vue Router**：實現應用內頁面導航。
- **Axios**：用於與後端 API 進行 HTTP 請求。
- **Vite**：用於開發環境和建置工具。

## 使用
啟動圖書館的後端與前端應用程式後訪問http://localhost:3000/register

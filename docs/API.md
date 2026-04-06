## 🛠 API Reference (Quick View)

This is a summary of available endpoints. For full request/response payloads, environment variables, and testing, please refer to our **[\[Postman Documentation Link Here\]](https://justme-7194.postman.co/workspace/Kallisto~022fc1cb-9014-4224-ad0c-12dabc4dcf3c/collection/40921893-f382134b-1663-4033-8296-ee03ed81b7d5?action=share&creator=40921893)**.

### 🔐 Authentication

| Method | Endpoint                                | Description                  | Auth Required |
| :----- | :-------------------------------------- | :--------------------------- | :------------ |
| `POST` | `/api/auth/v1/register`                 | Create a new account         | No            |
| `POST` | `/api/auth/v1/resend-verification-mail` | Resend verification mail     | No            |
| `POST` | `/api/auth/v1/verify-email`             | Verify email address         | No            |
| `POST` | `/api/auth/v1/login`                    | Exchange credentials for JWT | No            |
| `POST` | `/api/auth/v1/refresh`                  | Refresh the access token     | No            |

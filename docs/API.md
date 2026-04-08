## 🛠 API Reference (Quick View)

This is a summary of available endpoints. For full request/response payloads, environment variables, and testing, please refer to our **[\[Postman Documentation Link Here\]](https://documenter.getpostman.com/view/40921893/2sBXijKXQt)**.

## 🔐 Authentication

| Method | Endpoint                                | Description                  | Auth Required |
| :----- | :-------------------------------------- | :--------------------------- | :------------ |
| `POST` | `/api/auth/v1/register`                 | Create a new account         | No            |
| `POST` | `/api/auth/v1/resend-verification-mail` | Resend verification mail     | No            |
| `POST` | `/api/auth/v1/verify-email`             | Verify email address         | No            |
| `POST` | `/api/auth/v1/login`                    | Exchange credentials for JWT | No            |
| `POST` | `/api/auth/v1/refresh`                  | Refresh the access token     | No            |

## 🌉 Bridge

### Onboarding

| Method | Endpoint                                                  | Description                        | Auth Required |
| :----- | :-------------------------------------------------------- | :--------------------------------- | :------------ |
| `POST` | `/api/bridge/v1/onboarding/sp-org/identity`               | Add Organization SP Identity       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/identity`      | Add Professional SP Identity       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/identity`        | Add Contractor SP Identity         | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/address`                | Add Organization SP Address        | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/address`       | Add Professional SP Address        | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/address`         | Add Contractor SP Address          | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/services`               | Add Organization SP Services       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/services`      | Add Professional SP Services       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/services`        | Add Contractor SP Services         | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/service-areas`          | Add Organization SP Service Areas  | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/service-areas` | Add Professional SP Service Areas  | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/service-areas`   | Add Contractor SP Service Areas    | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/credentials`            | Add Organization SP Credentials    | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/credentials`   | Add Professional SP Credentials    | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/credentials`     | Add Contractor SP Credentials      | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/representative`         | Add Organization SP Representative | Yes           |

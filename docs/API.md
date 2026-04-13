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

### SP Organization Onboarding

| Method | Endpoint                                          | Description                        | Auth Required |
| :----- | :------------------------------------------------ | :--------------------------------- | :------------ |
| `POST` | `/api/bridge/v1/onboarding/sp-org/identity`       | Add Organization SP Identity       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/address`        | Add Organization SP Address        | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/services`       | Add Organization SP Services       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/service-areas`  | Add Organization SP Service Areas  | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/credentials`    | Add Organization SP Credentials    | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/representative` | Add Organization SP Representative | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-org/bank-details`   | Add Organization SP Bank Details   | Yes           |

### SP Professional Onboarding

| Method | Endpoint                                                  | Description                       | Auth Required |
| :----- | :-------------------------------------------------------- | :-------------------------------- | :------------ |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/identity`      | Add Professional SP Identity      | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/address`       | Add Professional SP Address       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/services`      | Add Professional SP Services      | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/service-areas` | Add Professional SP Service Areas | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/credentials`   | Add Professional SP Credentials   | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-professional/bank-details`  | Add Professional SP Bank Details  | Yes           |

### SP Contractor Onboarding

| Method | Endpoint                                                | Description                     | Auth Required |
| :----- | :------------------------------------------------------ | :------------------------------ | :------------ |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/identity`      | Add Contractor SP Identity      | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/address`       | Add Contractor SP Address       | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/services`      | Add Contractor SP Services      | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/service-areas` | Add Contractor SP Service Areas | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/credentials`   | Add Contractor SP Credentials   | Yes           |
| `POST` | `/api/bridge/v1/onboarding/sp-contractor/bank-details`  | Add Contractor SP Bank Details  | Yes           |

### Portfolio

| Method | Endpoint                           | Description                              | Auth Required |
| :----- | :--------------------------------- | :--------------------------------------- | :------------ |
| `POST` | `/api/bridge/v1/portfolio/create`  | Create Portfolio and Add Initial Project | Yes           |
| `POST` | `/api/bridge/v1/portfolio/project` | Add New Project to Existing Portfolio    | Yes           |

### Profile Management

| Method | Endpoint                    | Description                          | Auth Required |
| :----- | :-------------------------- | :----------------------------------- | :------------ |
| `GET`  | `/api/bridge/v1/profile/me` | Get currently logged in user profile | Yes           |

## 🏗 Hub

### Vendors

| Method | Endpoint                  | Description                          | Auth Required |
| :----- | :------------------------ | :----------------------------------- | :------------ |
| `POST` | `/api/hub/v1/vendors`     | Register a new vendor                | Yes           |
| `PUT`  | `/api/hub/v1/vendors/:id` | Update vendor profile                | Yes           |
| `GET`  | `/api/hub/v1/vendors/:id` | Get vendor details                   | Yes           |
| `GET`  | `/api/hub/v1/vendors`     | List vendors with pagination/search  | Yes           |

### Material Blueprints (Items)

| Method | Endpoint                | Description                         | Auth Required |
| :----- | :---------------------- | :---------------------------------- | :------------ |
| `POST` | `/api/hub/v1/items`     | Create a new material item          | Yes           |
| `PUT`  | `/api/hub/v1/items/:id` | Update material item blueprint      | Yes           |
| `GET`  | `/api/hub/v1/items`     | List material items                 | Yes           |

### Product Listings

| Method | Endpoint                            | Description                            | Auth Required |
| :----- | :---------------------------------- | :------------------------------------- | :------------ |
| `POST` | `/api/hub/v1/products`              | Add a new product listing for a vendor | Yes           |
| `PUT`  | `/api/hub/v1/products/:id`          | Update product listing details         | Yes           |
| `GET`  | `/api/hub/v1/products/vendor/:id`   | Get all products for a specific vendor | Yes           |
| `GET`  | `/api/hub/v1/products`              | Global list of products                | Yes           |
| `GET`  | `/api/hub/v1/products`              | Global list of products                | Yes           |

## 🤝 Hands

### SA Contractor Onboarding

| Method | Endpoint                                             | Description                       | Auth Required |
| :----- | :--------------------------------------------------- | :-------------------------------- | :------------ |
| `POST` | `/api/hands/v1/onboarding/identity/contractor`       | Add Contractor SA Identity        | Yes           |
| `POST` | `/api/hands/v1/onboarding/address/contractor`        | Add Contractor SA Address         | Yes           |
| `POST` | `/api/hands/v1/onboarding/skills/contractor`         | Add Contractor SA Skills/Services | Yes           |
| `POST` | `/api/hands/v1/onboarding/credentials/contractor`    | Add Contractor SA Credentials     | Yes           |
| `POST` | `/api/hands/v1/onboarding/bank-details/contractor`   | Add Contractor SA Bank Details    | Yes           |
| `POST` | `/api/hands/v1/onboarding/service-areas/contractor`  | Add Contractor SA Service Areas   | Yes           |

### SA Worker Onboarding

| Method | Endpoint                                           | Description                   | Auth Required |
| :----- | :------------------------------------------------- | :---------------------------- | :------------ |
| `POST` | `/api/hands/v1/onboarding/identity/worker`         | Add Worker SA Identity        | Yes           |
| `POST` | `/api/hands/v1/onboarding/address/worker`          | Add Worker SA Address         | Yes           |
| `POST` | `/api/hands/v1/onboarding/skills/worker`           | Add Worker SA Skills/Services | Yes           |
| `POST` | `/api/hands/v1/onboarding/credentials/worker`      | Add Worker SA Credentials     | Yes           |
| `POST` | `/api/hands/v1/onboarding/bank-details/worker`     | Add Worker SA Bank Details    | Yes           |
| `POST` | `/api/hands/v1/onboarding/service-areas/worker`    | Add Worker SA Service Areas   | Yes           |

### Profile Management

| Method | Endpoint                   | Description                          | Auth Required |
| :----- | :------------------------- | :----------------------------------- | :------------ |
| `GET`  | `/api/hands/v1/profile`    | Get currently logged in user profile | Yes           |


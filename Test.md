# Testing Onboarding Bank Details

Use the following sample data to test the new bank account details endpoints.

### 1. Bank Details Payload

This payload is common for all SP types (`sp-org`, `sp-professional`, `sp-contractor`).

**Endpoint**: `POST /api/bridge/v1/onboarding/{{sp-type}}/bank-details`

**Headers**:
- `Authorization`: `Bearer <token>`
- `Content-Type`: `application/json`

**Body**:
```json
{
  "serviceProviderId": "UUID-OF-THE-SERVICE-PROVIDER",
  "spType": "ORGANISATION",  // Should match the endpoint type
  "accountHolderName": "Nexus Construction Pvt Ltd",
  "bankName": "HDFC Bank",
  "bankBranch": "Indiranagar, Bangalore",
  "accountNumber": "50100234567890",
  "IFSCCode": "HDFC0001234",
  "UPIId": "nexus@hdfcbank"
}
```

### 2. cURL Example (Org SP)

```bash
curl -X POST http://localhost:3000/api/bridge/v1/onboarding/sp-org/bank-details \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "serviceProviderId": "efd7c2f0-1234-5678-90ab-cdef12345678",
  "spType": "ORGANISATION",
  "accountHolderName": "John Doe Org",
  "bankName": "Bank of India",
  "bankBranch": "Vashi",
  "accountNumber": "9876543210123",
  "IFSCCode": "BKID0001234",
  "UPIId": "john@boi"
}'
```

### 3. Response Structure

**Success (200 OK)**:
```json
{
  "success": true,
  "message": "Bank details added successfully",
  "data": {
    "serviceProviderId": "efd7c2f0-1234-5678-90ab-cdef12345678"
  }
}
```

**Error (400 Bad Request - Validation)**:
```json
{
  "success": false,
  "message": "Invalid IFSC code",
  "errors": [
    {
      "code": "invalid_string",
      "path": ["IFSCCode"],
      "message": "Invalid IFSC code"
    }
  ]
}
```

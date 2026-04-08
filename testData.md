# Kallisto Nexus Bridge API Mock Data

Here are copy-pastable JSON payloads for testing all the `OnboardingRouter` endpoints via Postman or Curl.

**Note on IDs**:

- Replace `USER_ID_MOCK` with a real `userId` string (usually an ID from the User table if required by the body).
- The identity creation endpoints expect a `serviceProviderId` according to the base schema requirements. You can supply a generated UUID like `"123e4567-e89b-12d3-a456-426614174000"`.
- For subsequent steps (address, services, credentials, representative), reuse the exact same `serviceProviderId` that you used/received during the identity step (`SP_ID_MOCK`).

---

#### `POST /api/bridge/v1/onboarding/sp-professional/identity`

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174001",
  "displayName": "John Doe Architecture",
  "profilePicture": "https://example.com/john.png",
  "serviceProviderId": "prof-sp-mock-uuid-8888",
  "spType": "professional",
  "workingSince": 2015
}
```

#### `POST /api/bridge/v1/onboarding/sp-contractor/identity`

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174002",
  "displayName": "Doe Construction Contractors",
  "profilePicture": "https://example.com/contractor_logo.png",
  "serviceProviderId": "cont-sp-mock-uuid-7777",
  "spType": "contractor",
  "workingSince": 2010
}
```

---

### 2. Address Endpoints

Use the `serviceProviderId` from the Identity step. Ensure you hit the corresponding endpoint (`sp-org`, `sp-professional`, `sp-contractor`).

#### `POST /api/bridge/v1/onboarding/sp-org/address` (Or `sp-professional/address` / `sp-contractor/address`)

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "organisation",
  "officeAddress": "123 Main Street, Suite 400, New Delhi 110001",
  "officeEmail": "contact@nexusarchitecture.com",
  "officePhone": "+91-9876543210"
}
```

_(For Professional or Contractor, simply change `"spType"` to `"professional"` or `"contractor"` respectively)._

---

### 3. Services Endpoints

#### `POST /api/bridge/v1/onboarding/sp-org/services` (Or `sp-professional/services` / `sp-contractor/services`)

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "organisation",
  "primaryServices": ["architecture", "interior_design"],
  "subServices": ["construction_contracting"],
  "typicalProjectValue": 5000000
}
```

---

### 4. Service Areas Endpoints

#### `POST /api/bridge/v1/onboarding/sp-org/service-areas` (Or `sp-professional/service-areas` / `sp-contractor/service-areas`)

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "serviceAreas": [
    {
      "city": "Mumbai",
      "isPrimary": true,
      "centerPoint": {
        "lat": 19.076,
        "lng": 72.8777
      },
      "radiusKm": 50
    },
    {
      "city": "Pune",
      "isPrimary": false,
      "centerPoint": {
        "lat": 18.5204,
        "lng": 73.8567
      },
      "radiusKm": 20
    }
  ]
}
```

---

### 5. Credentials Endpoints

#### `POST /api/bridge/v1/onboarding/sp-org/credentials`

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "organisation",
  "PAN": "ABCDE1234F",
  "GSTIN": "22AAAAA0000A1Z5",
  "businessProofType": "cin_certificate",
  "businessProofImage": "https://example.com/cin-proof.pdf",
  "governmentIdType": "aadhaar",
  "governmentIdNumber": "123456789012",
  "insurance": {
    "provider": "HDFC Ergo",
    "policyNumber": "POL-998877"
  },
  "tradeLicense": "TL-445566"
}
```

#### `POST /api/bridge/v1/onboarding/sp-professional/credentials`

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "professional",
  "PAN": "ABCDE1234F",
  "GSTIN": "22AAAAA0000A1Z5",
  "governmentIdType": "passport",
  "governmentIdNumber": "Z1234567",
  "professionalLicenseType": "coa_license",
  "professionalLicenseNumber": "CA/2010/88990"
}
```

#### `POST /api/bridge/v1/onboarding/sp-contractor/credentials`

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "contractor",
  "PAN": "ABCDE1234F",
  "GSTIN": "22AAAAA0000A1Z5",
  "governmentIdType": "voter_id",
  "governmentIdNumber": "XYZ1234567",
  "professionalLicenseType": "pwd_contractor",
  "professionalLicenseNumber": "PWD/MAH/2021/Z-123"
}
```

---

### 6. Representative Endpoint (Organisation ONLY)

#### `POST /api/bridge/v1/onboarding/sp-org/representative`

```json
{
  "serviceProviderId": "SP_ID_MOCK",
  "spType": "organisation",
  "representativeName": "Jane Doe",
  "representativeDesignation": "Managing Director",
  "representativeGovtIDType": "aadhaar",
  "representativeGovtIDNumber": "987654321098",
  "representativeGovtIDProof": "https://example.com/aadhaar-jane.png",
  "representativeMobile": "+91-9988776655"
}
```

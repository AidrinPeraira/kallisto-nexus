# Kallisto Hands API - Testing Guide

Use these curl commands to test the Hands module onboarding flow. You can import these directly into Postman using the "Import" button.

> [!NOTE]
> All endpoints require a valid JWT. Replace `{{JWT_TOKEN}}` with your actual token.
> Replace `{{USER_ID}}` with your user UUID.
> Replace `{{SA_ID}}` with the `serviceAssociateId` returned from the identity step.

## 1. SA Identity

### Contractor
```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/identity/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "userId": "{{USER_ID}}",
    "displayName": "John Contractor Services",
    "saType": "CONTRACTOR",
    "profilePicture": "https://example.com/profiles/john.jpg"
}'
```

### Worker
```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/identity/worker' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "userId": "{{USER_ID}}",
    "displayName": "Mike Worker",
    "saType": "WORKER"
}'
```

## 2. SA Address

### Contractor
```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/address/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "saType": "CONTRACTOR",
    "address": "123 Business St, Industrial Hub, City",
    "email": "contact@johncontractor.com",
    "phone": "+919876543210"
}'
```

## 3. Skills & Services

### Contractor
```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/skills/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "saType": "CONTRACTOR",
    "primarySkill": "PLUMBING",
    "subSkills": ["REPAIR", "INSTALLATION"],
    "workerCount": 15,
    "workingSince": 2018
}'
```

### Worker
```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/skills/worker' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "saType": "WORKER",
    "primarySkill": "ELECTRICAL",
    "subSkills": ["WIRING"],
    "workingSince": 2021,
    "wagePerDay": 800
}'
```

## 4. Credentials

```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/credentials/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "saType": "CONTRACTOR",
     "PAN": "ABCDE1234F",
     "governmentIdType": "AADHAAR",
     "governmentIdNumber": "123456789012"
}'
```

## 5. Bank Details

```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/bank-details/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "saType": "CONTRACTOR",
    "accountHolderName": "John Contractor",
    "bankName": "HDFC Bank",
    "bankBranch": "Downtown",
    "accountNumber": "50100123456789",
    "IFSCCode": "HDFC0001234"
}'
```

## 6. Service Areas

```bash
curl --location 'http://localhost:3000/api/hands/v1/onboarding/service-areas/contractor' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{JWT_TOKEN}}' \
--data '{
    "serviceAssociateId": "{{SA_ID}}",
    "serviceAreas": [
        {
            "city": "Mumbai",
            "isPrimary": true,
            "centerPoint": {
                "lat": 19.0760,
                "lng": 72.8777
            },
            "radiusKm": 25
        }
    ]
}'
```

## 7. Profile Retrieval

```bash
curl --location 'http://localhost:3000/api/hands/v1/profile' \
--header 'Authorization: Bearer {{JWT_TOKEN}}'
```

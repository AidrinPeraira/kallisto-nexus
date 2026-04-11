# Portfolio API Test Data

## 1. Create Portfolio
**Endpoint:** `POST /api/bridge/v1/portfolio/create`

### Sample Request Body
```json
{
  "serviceProviderId": "ba7e7a8e-...",
  "portfolioWebsite": "https://www.abcstudios.com",
  "isPublic": true,
  "projectName": "Modern Villa Interior",
  "location": "Bandra, Mumbai",
  "projectType": "residential",
  "scope": ["interior", "structure"],
  "completionYear": 2023,
  "budgetValue": 5000000,
  "budgetCurrency": "INR",
  "thumbnailUrl": "https://cdn.example.com/projects/villa-1/thumb.jpg",
  "photos": [
    "https://cdn.example.com/projects/villa-1/img1.jpg",
    "https://cdn.example.com/projects/villa-1/img2.jpg"
  ],
  "testimonialClientName": "John Doe",
  "testimonialText": "Great work on our villa!"
}
```

## 2. Add Portfolio Project
**Endpoint:** `POST /api/bridge/v1/portfolio/project`

### Sample Request Body
```json
{
  "portfolioId": "...",
  "projectName": "Commercial Hub MEP",
  "location": "Whitefield, Bangalore",
  "projectType": "commercial",
  "scope": ["mep", "facade"],
  "completionYear": 2024,
  "budgetValue": 12000000,
  "budgetCurrency": "INR",
  "thumbnailUrl": "https://cdn.example.com/projects/hub-1/thumb.jpg",
  "photos": [
    "https://cdn.example.com/projects/hub-1/img1.jpg"
  ],
  "isKallistoVerified": false
}

```

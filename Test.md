# Kallisto Hub - Postman Test Data

## 1. Register Vendor

**POST** `/api/hub/v1/vendors`

```json
{
  "vendorType": "AUTHORIZED_DEALER",
  "companyName": "Kallisto Steel Mills",
  "GSTIN": "32AAAAA0000A1Z5",
  "brandName": "Kallisto Prime",
  "email": "sales@kallistosteel.com",
  "phone": "9876543210",
  "officeAddress": "Industrial Area, Phase 2",
  "city": "Kochi",
  "state": "Kerala",
  "country": "India",
  "pincode": "682001",
  "representativeName": "John Doe",
  "representativePhone": "9876543211",
  "bankName": "HDFC Bank",
  "accountNumber": "50100123456789",
  "IFSCCode": "HDFC0001234"
}
```

## 2. Create Material Item (Blueprint)

**POST** `/api/hub/v1/items`

```json
{
  "name": "TMT Steel Bar",
  "category": "STEEL",
  "hsnCode": "7214",
  "unitOfMeasure": "KG",
  "description": "High-strength reinforcement steel bars for construction.",
  "specifications": [
    {
      "specName": "Grade",
      "specValues": ["Fe500", "Fe550D", "Fe600"]
    },
    {
      "specName": "Diameter",
      "specValues": ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm"]
    }
  ]
}
```

## 3. Add Product Listing

**POST** `/api/hub/v1/products`

> [!NOTE]
> Replace `vendorId` and `itemId` with actual IDs from previous steps.

```json
{
  "vendorId": "PASTE_VENDOR_ID_HERE",
  "itemId": "PASTE_ITEM_ID_HERE",
  "productName": "Kallisto Steel Bar - High Tensile",
  "brandName": "Kallisto Force",
  "description": "Premium quality TMT bars with superior bond strength.",
  "status": "ACTIVE",
  "variants": [
    {
      "price": 65.5,
      "stockQuantity": 5000,
      "selectedSpecs": [
        {
          "specId": "PASTE_GRADE_SPEC_ID",
          "selectedValue": "Fe550D"
        },
        {
          "specId": "PASTE_DIAMETER_SPEC_ID",
          "selectedValue": "12mm"
        }
      ]
    },
    {
      "price": 68.0,
      "stockQuantity": 3000,
      "selectedSpecs": [
        {
          "specId": "PASTE_GRADE_SPEC_ID",
          "selectedValue": "Fe550D"
        },
        {
          "specId": "PASTE_DIAMETER_SPEC_ID",
          "selectedValue": "16mm"
        }
      ]
    }
  ]
}
```

## 4. Update Vendor Profile

**PUT** `/api/hub/v1/vendors/:id`

```json
{
  "brandName": "Kallisto Steel & Infra",
  "whatsappNumber": "9876543210",
  "isActive": true
}
```

## 5. Update Product Listing

**PUT** `/api/hub/v1/products/:id`

```json
{
  "status": "ACTIVE",
  "productName": "Kallisto Force - Reinforcement Bar",
  "variants": [
    {
      "price": 67.25,
      "stockQuantity": 4500,
      "selectedSpecs": [
        {
          "specId": "PASTE_GRADE_SPEC_ID",
          "selectedValue": "Fe550D"
        },
        {
          "specId": "PASTE_DIAMETER_SPEC_ID",
          "selectedValue": "12mm"
        }
      ]
    }
  ]
}
```

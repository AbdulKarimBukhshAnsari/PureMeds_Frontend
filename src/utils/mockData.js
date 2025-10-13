// utils/mockData.js

export const products = [
  {
    id: "1",
    productName: "Paracetamol 500mg",
    chemicalName: "Acetaminophen",
    manufacturer: "ABC Pharma Ltd.",
    price: 150,
    purpose: "Used to reduce fever and relieve mild to moderate pain.",
    sideEffects: ["Nausea", "Stomach upset", "Allergic reaction"],
    availableStock: 500,
    category: "pain-fever",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    productName: "Amoxicillin 250mg",
    chemicalName: "Amoxicillin Trihydrate",
    manufacturer: "HealthCare Pharma",
    price: 320,
    purpose: "An antibiotic used to treat bacterial infections.",
    sideEffects: ["Diarrhea", "Skin rash", "Headache"],
    availableStock: 300,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  }
];

export const SupplyChain = [{
  batchId: "PMD-12345",
  medicineName: "Paracetamol 500mg",
  manufacturer: "XYZ Pharma",
  productionDate: "2025-01-01",
  expiryDate: "2026-12-12",
  events: [
    {
      stage: "Raw Materials Sourced",
      timestamp: "2024-12-20",
      actor: "XYZ Pharma",
      verified: true
    },
    {
      stage: "Material Testing",
      timestamp: "2024-12-28",
      actor: "XYZ Pharma QA Dept",
      verified: true
    },
    {
      stage: "Manufactured",
      timestamp: "2025-01-01",
      actor: "XYZ Pharma",
      verified: true
    },
    {
      stage: "Quality Testing",
      timestamp: "2025-01-01",
      actor: "XYZ Pharma QA Dept",
      verified: true
    },
    {
      stage: "Packaging and Labeling",
      timestamp: "2025-01-03",
      actor: "XYZ Pharma",
      verified: true
    },
    {
      stage: "Released for Distribution",
      timestamp: "2025-01-05",
      actor: "XYZ Pharma Compliance",
      verified: true
    }
  ]
}]

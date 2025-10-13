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
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
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
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
  },
  {
  id: "3",
  productName: "Paracetamol 500mg",
  chemicalName: "Acetaminophen",
  manufacturer: "MedLife Laboratories",
  price: 180,
  purpose: "Used to relieve pain and reduce fever.",
  sideEffects: ["Nausea", "Allergic reactions", "Liver damage (in overdose)"],
  availableStock: 450,
  category: "pain relief",
  productImage:
    "https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
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

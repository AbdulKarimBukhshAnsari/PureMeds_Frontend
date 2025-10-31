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
  productName: "Panadol 300mg",
  chemicalName: "Acetaminophen",
  manufacturer: "MedLife Laboratories",
  price: 180,
  purpose: "Used to reduce fever and relieve mild to moderate pain.",
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

export const orders = [
  {
    id: 'ORD-001',
    customerID: 'CUST-123',
    customerName: 'Ali Khan',
    date: '2025-10-15',
    orderDetails: [
      { productName: 'Vitamin C Tablets', price: 5.99, qty: 2 },
      { productName: 'Face Mask Pack', price: 3.49, qty: 1 },
    ],
    totalAmount: 15.47,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    address: 'House 45, Street 9, DHA Phase 5, Karachi',
  },
  {
    id: 'ORD-002',
    customerID: 'CUST-123',
    customerName: 'Ali Khan',
    date: '2025-10-15',
    orderDetails: [
      { productName: 'Paracetamol 500mg', price: 2.99, qty: 3 },
    ],
    totalAmount: 8.97,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    deliveryStatus: 'Shipped',
    address: 'House 45, Street 9, DHA Phase 5, Karachi',
  },
  {
    id: 'ORD-003',
    customerID: 'CUST-123',
    customerName: 'Ali Khan',
    date: '2025-10-15',
    orderDetails: [
      { productName: 'Hand Sanitizer 250ml', price: 4.99, qty: 2 },
      { productName: 'Digital Thermometer', price: 8.49, qty: 1 },
    ],
    totalAmount: 18.47,
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    deliveryStatus: 'Pending',
    address: 'House 45, Street 9, DHA Phase 5, Karachi',
  },
]

export const complaints = [
  {
    id: "ALT-001",
    medicineName: "Paracetamol 500mg",
    medicineDose: "500mg",
    manufacturer: "ABC Pharmaceuticals Pvt. Ltd.",
    batchId: "PMD-12345",
    manufacturerDate: "2025-01-01",
    expiryDate: "2026-12-12",
    qrCode: "qr_paracetamol_001.png",
    customerId: "cus_789xyz",
    store: "City Medical Store",
    city: "Lahore",
  },
  {
    id: "ALT-002",
    medicineName: "Amoxicillin 250mg",
    medicineDose: "250mg",
    manufacturer: "MedCare Laboratories",
    batchId: "AMC-45678",
    manufacturerDate: "2024-10-15",
    expiryDate: "2026-04-15",
    qrCode: "qr_amoxicillin_002.png",
    customerId: "cus_234abc",
    store: "HealthPlus Pharmacy",
    city: "Karachi",
  },
  {
    id: "ALT-003",
    medicineName: "Ibuprofen 200mg",
    medicineDose: "200mg",
    manufacturer: "WellLife Pharma",
    batchId: "IBU-78901",
    manufacturerDate: "2024-12-20",
    expiryDate: "2026-06-20",
    qrCode: "qr_ibuprofen_003.png",
    customerId: "cus_567ghi",
    store: "CareZone Pharmacy",
    city: "Islamabad",
  },
  {
    id: "ALT-004",
    medicineName: "Cetrizine 10mg",
    medicineDose: "10mg",
    manufacturer: "PureMed Pvt. Ltd.",
    batchId: "CTR-98765",
    manufacturerDate: "2025-02-10",
    expiryDate: "2027-02-10",
    qrCode: "qr_cetrizine_004.png",
    customerId: "cus_901jkl",
    store: "GreenLeaf Pharmacy",
    city: "Faisalabad",
  },
  {
    id: "ALT-005",
    medicineName: "Metformin 500mg",
    medicineDose: "500mg",
    manufacturer: "NovaCure Labs",
    batchId: "MTF-11223",
    manufacturerDate: "2024-11-05",
    expiryDate: "2026-11-05",
    qrCode: "qr_metformin_005.png",
    customerId: "cus_654mno",
    store: "MediCare Plus",
    city: "Multan",
  },
];

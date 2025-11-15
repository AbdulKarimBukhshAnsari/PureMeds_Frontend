/**
 * Category mapping utility
 * Maps category IDs to display names
 */
export const categoryMapping = {
  "pain-fever": "Pain & Fever",
  "infections": "Infections",
  "heart-bp": "Heart & BP",
  "lungs-allergy": "Lungs & Allergy",
  "stomach-digestion": "Stomach & Digestion",
  "hormones-diabetes": "Hormones & Diabetes",
  "brain-mental": "Brain & Mental Health",
  "vitamins-others": "Vitamins & Others",
};

/**
 * Get category display name from category ID
 * @param {string} categoryId - Category ID
 * @returns {string} - Category display name or the original ID if not found
 */
export const getCategoryName = (categoryId) => {
  if (!categoryId) return "";
  return categoryMapping[categoryId] || categoryId;
};


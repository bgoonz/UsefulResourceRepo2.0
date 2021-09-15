SELECT
  users.full_name,
  merchant_types.type,
  countries.name,
  merchants.merchant_name
FROM users
JOIN merchants ON (users.id = merchants.admin_id)
JOIN countries ON (merchants.country_id = countries.id)
JOIN merchant_types ON (merchants.merchant_type_id = merchant_types.id)
ORDER BY merchant_name

export const domain = "http://192.168.18.214:2000";
// export const domain ="https://sonashutra.onrender.com";

export const endpoint = {

  login: `${domain}/api/v1/login-user`,
  //admin
  login_super_user: `${domain}/api/v1/login-super-user`,
  //store
  create_store: `${domain}/api/v1/create-store`,
  get_store: `${domain}/api/v1/get-store`,
  update_store: `${domain}/api/v1/update-store`,
  delete_store: `${domain}/api/v1/delete-store`,
  //role
  create_role: `${domain}/api/v1/create-role`,
  get_role: `${domain}/api/v1/get-role`,
  get_role_by_id: `${domain}/api/v1/get-role-by-id`,
  update_role: `${domain}/api/v1/update-role`,
  delete_role: `${domain}/api/v1/delete-role`,
  // user
  create_user: `${domain}/api/v1/create-user`,
  get_user: `${domain}/api/v1/get-user`,
  get_user_by_id: `${domain}/api/v1/get-user-by-id`,
  update_user: `${domain}/api/v1/update-user-by-id`,
  delete_user: `${domain}/api/v1/delete-user`,
  //permission
  get_role_permission: `${domain}/api/v1/get-role-permission`,
  assign_role_permission: `${domain}/api/v1/assign-permission-to-role`,
  get_type_role_permission: `${domain}/api/v1/get-type-of-permission`,
  remove_permission: `${domain}/api/v1/remove-permission-from-role`,

  //category user
  category_product: `${domain}/api/v1/create-product-category`,
  get_product_categroy: `${domain}/api/v1/get-product-category`,
  get_product_categroy_by_id: `${domain}/api/v1/get-product-category-by-id`,
  upddate_product: `${domain}/api/v1/update-product-category`,
  delete_product_category: `${domain}/api/v1/delete-product-category`,

  // subcategory
  sub_category_product: `${domain}/api/v1/create-product-subcategory`,
  get_product_subcategory: `${domain}/api/v1/get-product-subcategory`,
  get_product_subcategory_by_id: `${domain}/api/v1/get-product-subcategory-by-id`,
  update_product_subcategory: `${domain}/api/v1/update-product-subcategory`,
  delete_product_subcategory: `${domain}/api/v1/delete-product-subcategory`,

  //product
  create_product: `${domain}/api/v1/create-product`,
  get_product_all: `${domain}/api/v1/get-all-products`,
  get_product_by_id: `${domain}/api/v1/get-product-by-id`,
  update_product: `${domain}/api/v1/update-product`,
  delete_product: `${domain}/api/v1/delete-product`,

  //productimage
  upload_product_image: `${domain}/api/v1/upload-product-image`,
  get_product_image: `${domain}/api/v1/get-product-image`,
  update_product_image: `${domain}/api/v1/update-product-image`,
  delete_product_image: `${domain}/api/v1/delete-product-image`,

  //variant
  create_product_variant: `${domain}/api/v1/create-product-varients-with-attributes`,
  get_product_variant: `${domain}/api/v1/get-product-varients`,
  update_product_variant: `${domain}/api/v1/update-product-varients`,
  delete_product_variant: `${domain}/api/v1/delete-product-varients`,

  //unit
  create_product_unitt: `${domain}/api/v1/create-units`,
  get_product_unitt: `${domain}/api/v1/get-all-units`,
  update_product_unitt: `${domain}/api/v1/update-units`,
  delete_product_unitt: `${domain}/api/v1/delete-units`,

  //pending

  // attribute
  create_product_attributes: `${domain}/api/v1/create-product-attributes`,
  get_product_attributes: `${domain}/api/v1/get-product-attributes`,
  update_product_attributes: `${domain}/api/v1/update-product-attributes`,
  delete_product_attributes: `${domain}/api/v1/delete-product-attributes`,

  // product attribute values
  // create_product_attributes_value: `${domain}/api/v1/create-product-attribute-value`,
  // get_product_attributes_value: `${domain}/api/v1/get-product-attribute-value`,
  // update_product_attributes_value: `${domain}/api/v1/update-attribute-value`,
  // delete_product_attributes_value: `${domain}/api/v1/delete-attribute-value`,

  //material
  create_material: `${domain}/api/v1/create-materials`,
  get_material: `${domain}/api/v1/get-materials`,
  update_material: `${domain}/api/v1/update-materials`,
  delete_material: `${domain}/api/v1/delete-materials`,

  //variant material
  create_variant_material: `${domain}/api/v1/create-variant-material`,
  get_variant_material: `${domain}/api/v1/get-variant-material`,
  update_variant_material: `${domain}/api/v1/update-variant-material`,
  delete_variant_material: `${domain}/api/v1/delete-variant-material`,

  // inventory
  create_product_inventory: `${domain}/api/v1/create-product-inventory`,
  get_product_inventory: `${domain}/api/v1/get-product-inventory`,
  update_product_inventory: `${domain}/api/v1/update-product-inventory`,

  // discount
  create_discount: `${domain}/api/v1/create-discount`,
  get_discount: `${domain}/api/v1/get-discount`,
  update_discount: `${domain}/api/v1/update-discount`,
  delete_discount: `${domain}/api/v1/delete-discount`,

  //product discount
  create_product_discount: `${domain}/api/v1/create-product-discount`,
  get_product_discount: `${domain}/api/v1/get-product-discount`,
  update_product_discount: `${domain}/api/v1/update-product-discount`,
  delete_product_discount: `${domain}/api/v1/delete-product-discount`,

  //tax
  create_tax: `${domain}/api/v1/create-tax`,
  get_tax: `${domain}/api/v1/get-tax`,
  update_tax: `${domain}/api/v1/update-tax`,
  delete_tax: `${domain}/api/v1/delete-tax`,

  // product_tax
  create_product_tax: `${domain}/api/v1/create-product-tax`,
  get_product_tax: `${domain}/api/v1/get-product-tax`,
  update_product_tax: `${domain}/api/v1/update-product-tax`,
  delete_product_tax: `${domain}/api/v1/delete-product-tax`,

  //payment
  create_payment_method: `${domain}/api/v1/create-payment-method`,
  get_payment_method: `${domain}/api/v1/get-payment-method`,

  //customer
  create_customer: `${domain}/api/v1/create-customer`,
  get_login_customer: `${domain}/api/v1/login-customer`,
  get_all_customer: `${domain}/api/v1/get-all-customer`,
  get_customer_profile: `${domain}/api/v1/get-customer-profile`,
  update_customer_profile: `${domain}/api/v1/update-customer-profile`,

  // user 

  //auth
  login_customer: `${domain}/api/v1/login-customer`,

  //prduct 
  get_categroy_user: `${domain}/api/v1/u-get-category`,
  get_sub_categroy_user: `${domain}/api/v1/u-get-sub-category`,
  get_product_user: `${domain}/api/v1/u-get-product`,
  u_get_variant: `${domain}/api/v1/u-get-varients`,


  //wishlist 
  create_wishlist: `${domain}/api/v1/create-wish-list-items`,
  get_wishlist: `${domain}/api/v1/get-wish-list-items`,
  remove_wishlist: `${domain}/api/v1/remove-wish-list-items`,

//cart 
create_cart: `${domain}/api/v1/create-cart-items`,
get_cart: `${domain}/api/v1/get-cart-items`,

};

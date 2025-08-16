export const domain = "http://192.168.190.250:2000";
// export const domain ="https://sonashutra-backend-code.onrender.com";221

export const endpoint ={
    login : `${domain}/api/v1/login-user`,
   

    //admin
    login_super_user : `${domain}/api/v1/login-super-user`,
    //store
    create_store : `${domain}/api/v1/create-store`,
    get_store : `${domain}/api/v1/get-store`,
    update_store : `${domain}/api/v1/update-store`,
    delete_store : `${domain}/api/v1/delete-store`,
    //role
    create_role : `${domain}/api/v1/create-role`,
    get_role : `${domain}/api/v1/get-role`,
    get_role_by_id : `${domain}/api/v1/get-role-by-id`,
    update_role : `${domain}/api/v1/update-role`,
    delete_role : `${domain}/api/v1/delete-role`,
    // user
    create_user : `${domain}/api/v1/create-user`,
    get_user : `${domain}/api/v1/get-user`,
    get_user_by_id : `${domain}/api/v1/get-user-by-id`,
    update_user : `${domain}/api/v1/update-user-by-id`,
    delete_user : `${domain}/api/v1/delete-user`,
    //permission
    get_role_permission : `${domain}/api/v1/get-role-permission`,
    assign_role_permission : `${domain}/api/v1/assign-permission-to-role`,
    get_type_role_permission : `${domain}/api/v1/get-type-of-permission`,
    remove_permission : `${domain}/api/v1/remove-permission-from-role`,

    //category user
    category_product : `${domain}/api/v1/create-product-category`,
    get_product_categroy : `${domain}/api/v1/get-product-category`,
    get_product_categroy_by_id : `${domain}/api/v1/get-product-category-by-id`,
    upddate_product : `${domain}/api/v1/update-product-category`,
    delete_product_category : `${domain}/api/v1/delete-product-category`,
   
    // subcategory
    sub_category_product : `${domain}/api/v1/create-product-subcategory`,
    get_product_subcategory : `${domain}/api/v1/get-product-subcategory`,
    get_product_subcategory_by_id : `${domain}/api/v1/get-product-subcategory-by-id`,
    update_product_subcategory : `${domain}/api/v1/update-product-subcategory`,
    delete_product_subcategory : `${domain}/api/v1/delete-product-subcategory`,

    //product
    create_product : `${domain}/api/v1/create-product`,
    get_product_all : `${domain}/api/v1/get-all-products`,
    get_product_by_id : `${domain}/api/v1/get-product-by-id`,
    update_product : `${domain}/api/v1/update-product`,
    delete_product : `${domain}/api/v1/delete-product`,

    //productimage
    upload_product_image : `${domain}/api/v1/upload-product-image`,
    get_product_image : `${domain}/api/v1/get-product-image`,
    update_product_image : `${domain}/api/v1/update-product-image`,
    delete_product_image : `${domain}/api/v1/delete-product-image`,
}
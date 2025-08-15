export const domain = "http://192.168.190.250:2000";
// export const domain ="https://sonashutra-backend-code.onrender.com";

export const endpoint ={
    login : `${domain}/api/v1/login-user`,
    get_role : `${domain}/api/v1/get-role`,
    remove_permission : `${domain}/api/v1/remove-permission-from-role`,
    get_role_permission : `${domain}/api/v1/get-role-permission`,
    assign_role_permission : `${domain}/api/v1/assign-permission-to-role`,
    get_type_role_permission : `${domain}/api/v1/get-type-of-permission`,

    //admin
    login_super_user : `${domain}/api/v1/login-super-user
`,
    
    
    
}
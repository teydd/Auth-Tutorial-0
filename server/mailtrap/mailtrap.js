const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./templates");
const { sender, client } = require("./mailtrapConfig");


const verificationEmail = async(email,verificationToken)=>{
    const recipient = [{email}]
    try {
        const response = await client.send({
            from:sender,
            to:recipient,
            subject:"Verify Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , verificationToken),
            category: "Email verification"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log("Error sending verification email", error)
        throw new Error("Error sending verification email");
                
    }
}

const welcomeEmail = async(email,name)=>{
    const recipient = [{email}]

    try {
        const response = await client.send({
            from:sender,
            to:recipient,
            template_uuid: "43fd8c96-7127-475c-8d0e-e7ed0371f080",
    template_variables: {
      "company_info_name": "Auth Company",
      "name": name
    }
        })
        console.log("Welcome email sent successfully", response)
    } catch (error) {
        console.log("Error sending weolcome email", error)
        
    }
}

const resetEmail = async (email,resetURL)=>{
    const recipient = [{email}]

    try {
        const response = await client.send({
            from:sender,
            to:recipient,
            subject:"Reset password email",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
            category:"Reset password"
        })
        console.log("Password reset Link sent successfully",response)
    } catch (error) {
        console.log("Error sending reset password link", error)
    }
}

const resetPass = async(email)=>{
    const recipient = [{email}]

    try {
        const response = await client.send({
            from:sender,
            to:recipient,
            subject:"Successful password reset",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Reset Password"
        })
        console.log("Password Reset Successful", response)
    } catch (error) {
        console.log("Error resetting password",error)        
    }
}

module.exports = {verificationEmail,welcomeEmail,resetEmail,resetPass}